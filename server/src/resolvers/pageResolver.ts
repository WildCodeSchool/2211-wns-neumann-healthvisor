import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import datasource from "../db";
import Page, { PageInput } from "../entity/Page";
import History, { HistoryAnonymous } from "../entity/History";
import axios from "axios";
import { ApolloError } from "apollo-server-errors";
import puppeteer from "puppeteer";
import { join } from "path";
import { uuid } from "uuidv4";
import fs from 'fs';
import { ContextType } from '../index';
import User from "../entity/User";
import { RequestPage } from "../functions/axiosRequestPage";
import { screenshot } from "../functions/screenshot";

@Resolver(Page)
export class PageResolver {
  @Query(() => [Page])
  async Page(): Promise<Page[]> {
    const pages = await datasource.getRepository(Page).find({
      relations: {
        histories: true,
        users: true
      }
    });

    return pages;
  }

  @Mutation(() => Page)
  async createPage(@Arg("data") data: PageInput): Promise<Page> {
    return await datasource.getRepository(Page).save(data);
  }

  @Mutation(() => HistoryAnonymous)
  async getPage(@Arg("data") { url }: PageInput): Promise<HistoryAnonymous> {

    const axiosResult = await RequestPage(url);

    const screenshotPage = await screenshot(url);

    const history = {
      status: axiosResult.status,
      date: new Date(),
      responseTime: axiosResult.responseTime,
      url: url,
      screenshot: screenshotPage !== "none" ? `${screenshotPage}.png` : "none",
    };

    return history;
  }

  @Authorized()
  @Mutation(() => History)
  async addPageToUser(@Ctx() { currentUser }: ContextType, @Arg("url") { url }: PageInput): Promise<History> {

    if (typeof currentUser === "undefined") throw new ApolloError("User error", "USER_ERROR");

    const userDB = await datasource.getRepository(User).findOne({
      where: { id: currentUser.id },
      relations: { pages: { histories: true, users: false } },
    });

    if (userDB === null) throw new ApolloError("User error", "USER_ERROR");

    const axiosResult = await RequestPage(url);

    const screenshotPage = await screenshot(url);

    let page: Page;
    const existingPage = await datasource.getRepository(Page).findOneBy({ url });

    if (existingPage === null) {
      page = await datasource.getRepository(Page).save({ url });
    } else {
      page = existingPage
    }

    const history = await datasource.getRepository(History).save({
      status: axiosResult.status,
      date: new Date(),
      responseTime: axiosResult.responseTime,
      page: page,
      screenshot: screenshotPage !== "none" ? `${screenshotPage}.png` : "none",
      user: userDB
    });

    const pageAlreadyOwned = userDB.pages?.some(p => p.url === page.url);

    if (!pageAlreadyOwned) userDB.pages?.push(page);
    await datasource.getRepository(User).save(userDB);

    return history;
  }
}
