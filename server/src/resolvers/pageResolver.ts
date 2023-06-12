import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import datasource from "../db";
import Page, { PageInput } from "../entity/Page";
import History from "../entity/History";
import axios from "axios";
import { ApolloError } from "apollo-server-errors";
import puppeteer from "puppeteer";
import { join } from "path";
import { uuid } from "uuidv4";
import fs from 'fs';
import { ContextType } from '../index';
import User from "../entity/User";

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

  @Mutation(() => History)
  async getPage(@Arg("data") { url }: PageInput): Promise<History> {

    const regexHTTP =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (!url || !regexHTTP.test(url)) throw new ApolloError("URL not valid", "URL_NOT_VALID");

    if (url.endsWith('/')) {
      url = url.substring(0, url.length - 1);
    }

    const startTime = Date.now();
    const axiosResult = await axios
      .get(url)
      .then((res) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        return {
          status: res.status,
          responseUrl: res.request.res.responseUrl,
          redirectCount: res.request._redirectable._redirectCount,
          responseTime,
        };
      })
      .catch((err) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        console.log(err.message);
        return {
          status: err.response.status,
          responseUrl: err.request.res.responseUrl,
          redirectCount: err.request._redirectable._redirectCount,
          responseTime,
        };
      });

    let screenshotName = "none";
    const directoryName = join(__dirname, `../screenshot/`);

    if (!fs.existsSync(directoryName)) {
      fs.mkdir(directoryName, (err) => {
        if (err) return console.log(err);
        console.log('Le dossier à été crée avec succès');
      })
    }

    try {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: "/usr/bin/chromium-browser",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });

      await page.setViewport({
        width: 500,
        height: 500,
      });
      screenshotName = uuid();
      await page.screenshot({
        path: join(__dirname, `../screenshot/${screenshotName}.png`),
      });

      await browser.close();
      console.log("screenshot effectué");
    } catch (err) {
      console.error(err);
    }

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
      screenshot: screenshotName !== "none" ? `${screenshotName}.png` : "none",
    });

    return history;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addPageToUser(@Ctx() { currentUser }: ContextType, @Arg("historyId") id: number): Promise<boolean> {

    if (typeof currentUser === "undefined") throw new ApolloError("User error", "USER_ERROR");

    const userDB = await datasource.getRepository(User).findOne({
      where: { id: currentUser.id },
      relations: { pages: { histories: true } },
    });

    if (userDB === null) throw new ApolloError("User error", "USER_ERROR");

    const history = await datasource.getRepository(History).findOne({ relations: { page: true, user: true }, where: { id } });

    if (history === null) throw new ApolloError("History error", "HISTORY_ERROR");

    const pageDB = await datasource.getRepository(Page).findOne({ relations: { histories: true, users: true }, where: { histories: { page: history.page } } });

    if (pageDB === null) throw new ApolloError("Page error", "PAGE_ERROR");

    const pageAlreadyOwned = userDB.pages?.some(page => page.url === pageDB.url);

    if (!pageAlreadyOwned) userDB.pages?.push(pageDB);

    userDB.histories?.push(history);

    history.user = userDB;

    await datasource.getRepository(History).save(history);

    await datasource.getRepository(Page).save(pageDB);

    await datasource.getRepository(User).save(userDB);

    return true;
  }
}
