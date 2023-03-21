import { Resolver, Query, Mutation, Arg, Ctx, Authorized, Int } from "type-graphql";
import datasource from "../db";
import User, { hashPassword, SigninInput, LoginInput, verifyPassword } from "../entity/User";
import { ApolloError } from "apollo-server-errors";
import { ContextType } from '../index';
import { env } from "../env";
import jwt from 'jsonwebtoken';

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await datasource.getRepository(User).find();

    return users;
  }

  @Query(() => User)
  async fetchUserById(@Arg("id",()=>Int) id : number): Promise<User> {

    const existingUser = await datasource.getRepository(User).findOneBy({ id });
   
    if(existingUser == null) throw new ApolloError('User does not exist', 'USER_NOT_EXIST');
    
    return existingUser;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") { email, password }: SigninInput): Promise<User> {

    const existingUser = await datasource.getRepository(User).findOneBy({ email });
   
    if(existingUser !== null) throw new ApolloError('User exist', 'USER_EXIST');

    const passwordHashed = await hashPassword(password);
    
    return await datasource.getRepository(User).save({ email, password: passwordHashed });
  }

  @Mutation(() => String)
  async loginUser(@Arg("data") { email, password }: LoginInput, @Ctx() { res }: ContextType): Promise<string> {

    const user = await datasource.getRepository(User).findOneBy({ email });
    
    if(user === null || !(await verifyPassword(user.password, password))) throw new ApolloError('Données incorrectes', "DONNEES_INCORRECT");
    
    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
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
}
