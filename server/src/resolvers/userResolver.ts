import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  Authorized,
  Int,
} from "type-graphql";
import datasource from "../db";
import User, {
  hashPassword,
  SignUpInput,
  LoginInput,
  verifyPassword,
  NotificationInput,
  UpdateUserInput,
} from "../entity/User";
import { ApolloError } from "apollo-server-errors";
import { ContextType } from "../index";
import { env } from "../env";
import jwt from "jsonwebtoken";

import Page from "../entity/Page";
import { roles } from "../utilities/enum";
import { Expo } from "expo-server-sdk";

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await datasource.getRepository(User).find({
      relations: {
        pages: {
          histories: true,
        },
      },
    });

    return users;
  }

  @Query(() => User)
  async fetchUserById(@Arg("id", () => Int) id: number): Promise<User> {
    const existingUser = await datasource.getRepository(User).findOneBy({ id });

    if (existingUser == null)
      throw new ApolloError("User does not exist", "USER_NOT_EXIST");

    return existingUser;
  }

  @Query(() => [Page])
  async getUserPages(@Arg("id", () => Int) id: number): Promise<Page[]> {
    return await datasource.getRepository(Page).findBy({ id });
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data") { name, email, password }: SignUpInput
  ): Promise<User> {
    const existingUser = await datasource
      .getRepository(User)
      .findOneBy({ email });

    if (existingUser !== null)
      throw new ApolloError("User exist", "USER_EXIST");

    const passwordHashed = await hashPassword(password);

    return await datasource
      .getRepository(User)
      .save({ name, email, password: passwordHashed });
  }

  @Mutation(() => String)
  async loginUser(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { res }: ContextType
  ): Promise<string> {
    const user = await datasource.getRepository(User).findOneBy({ email });

    if (user === null || !(await verifyPassword(user.password, password)))
      throw new ApolloError("Données incorrectes", "DONNEES_INCORRECT");

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
    });

    return token;
  }

  @Mutation(() => Boolean)
  async logoutUser(@Ctx() { res }: ContextType): Promise<boolean> {
    res.clearCookie("token");
    return true;
  }

  @Authorized()
  @Query(() => User)
  async profile(@Ctx() { currentUser }: ContextType): Promise<User> {
    return currentUser as User;
  }

  @Authorized()
  @Mutation(() => User)
  async updateProfile(
    @Ctx() { currentUser }: ContextType,
    @Arg("data", { validate: false }) { expoNotificationToken }: UpdateUserInput
  ): Promise<User> {
    return await datasource
      .getRepository(User)
      .save({ ...currentUser, expoNotificationToken });
  }

  @Authorized<roles[]>([roles.ROLE_ADMIN])
  @Mutation(() => Boolean)
  async sendNotification(
    @Arg("data") data: NotificationInput,
    @Arg("userId") userId: number
  ) {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { id: userId } });
    // console.log(user);

    if (user === null) throw new Error("User not found");
    if (user && !user.expoNotificationToken)
      throw new Error("Expo token not found for this user");

    try {
      await expo.sendPushNotificationsAsync([
        {
          to: user.expoNotificationToken,
          title: data.title,
          body: data.body,
          data:
            typeof data.JSONPayload === "string"
              ? JSON.parse(data.JSONPayload)
              : undefined,
        },
      ]);
      return true;
    } catch (error) {
      console.log(error);

      return false;
    }
  }
}

export default UserResolver;
