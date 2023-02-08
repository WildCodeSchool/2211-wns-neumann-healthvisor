import { Resolver, Query, Mutation, Arg } from "type-graphql";
import datasource from "../db";
import User, { hashPassword, UserInput, LoginInput, verifyPassword } from "../entity/User";
import { ApolloError } from "apollo-server-errors";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await datasource.getRepository(User).find();

    return users;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") { email, password, premium }: UserInput): Promise<User> {

    const passwordHashed = await hashPassword(password);
    console.log({ email, passwordHashed });
    
    return await datasource.getRepository(User).save({ email, password: passwordHashed, premium });
  }

  @Mutation(() => Boolean)
  async loginUser(@Arg("data") { email, password }: LoginInput): Promise<boolean> {

    const user = await datasource.getRepository(User).findOneBy({ email });
    

    if(user === null || !(await verifyPassword(user.password, password))) throw new ApolloError('Données incorrectes', "DONNEES_INCORRECT");
    
    return true;
  }
}
