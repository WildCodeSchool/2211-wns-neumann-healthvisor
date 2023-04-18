import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import datasource from "../db";
import History, { HistoryInput } from "../entity/History";
import { ApolloError } from "apollo-server-errors";
import { join } from "path";
import Page from "../entity/Page";

@Resolver(History)
export class HistoryResolver {
  @Query(() => [History])
  async History(): Promise<History[]> {
    const pages = await datasource.getRepository(History).find();

    return pages;
  }

  @Query(() => History)
  async fetchHistoryById(@Arg("id", () => Int) id: number): Promise<History> {
    const existingHistory = await datasource
      .getRepository(History)
      .findOneBy({ id });

    if (existingHistory == null)
      throw new ApolloError("History does not exist", "HISTORY_NOT_EXIST");

    return existingHistory;
  }

  @Query(() => History)
  async fetchLastHistoryPageById(
    @Arg("id", () => Int) id: number
  ): Promise<History> {
    const page = await datasource.getRepository(Page).findOneBy({ id });

    if (page) {
      console.log(page);

      const existingHistory = await datasource
        .getRepository(History)
        .find({ where: { page: page } });

      console.log(existingHistory);

      if (existingHistory.length !== 0) {
        const latestHistory = existingHistory.reduce((prev, current) =>
          prev.date > current.date ? prev : current
        );
        console.log(latestHistory);
        return latestHistory;
      } else {
        throw new ApolloError("History does not exist", "HISTORY_NOT_EXIST");
      }

      // if (existingHistory == null)
    } else {
      throw new ApolloError("History does not exist", "HISTORY_NOT_EXIST");
    }
  }
}
