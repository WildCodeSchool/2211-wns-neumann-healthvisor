import { Resolver, Query, Mutation, Arg } from "type-graphql";
import datasource from "../db";
import User, { UserInput } from "../entity/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const users = await datasource.getRepository(User).find();

    return users;
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: UserInput): Promise<User> {
    return await datasource.getRepository(User).save(data);
  }
}
