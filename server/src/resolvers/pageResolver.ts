import { Resolver, Query, Arg, Mutation } from "type-graphql";
import datasource from "../db";
import Page, { PageInput } from "../entity/Page";
import History from "../entity/History";
import axios from "axios";
import { ApolloError } from "apollo-server-errors";
import puppeteer from "puppeteer";
import { join } from "path";
import { uuid } from "uuidv4";

@Resolver(Page)
export class PageResolver {
  @Query(() => [Page])
  async Page(): Promise<Page[]> {
    const pages = await datasource.getRepository(Page).find();

    return pages;
  }

  @Mutation(() => Page)
  async createPage(@Arg("data") data: PageInput): Promise<Page> {
    return await datasource.getRepository(Page).save(data);
  }

  @Mutation(() => Page)
  async getPage(@Arg("data") { url }: PageInput): Promise<Page> {
    const regexHTTP =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    if (!url || !regexHTTP.test(url))
      throw new ApolloError("URL not valid", "URL_NOT_VALID");

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
        return {
          status: err.status,
          responseUrl: err.request.res.responseUrl,
          redirectCount: err.request._redirectable._redirectCount,
          responseTime,
        };
      });

    let screenshotName = "none";
    try {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: "/usr/bin/chromium-browser",
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "networkidle2" });

      await page.setViewport({
        width: 1200,
        height: 750,
      });
      //   const name = url.replace(/[:/]/g, "-").replace("---", "-");
      screenshotName = uuid();
      await page.screenshot({
        path: join(__dirname, `../screenshot/${screenshotName}.png`),
      });

      await browser.close();
      console.log("screenshot effectué");
    } catch (err) {
      console.error(err);
    }

    const newPage = await datasource.getRepository(Page).save({ url: url });
    console.log(axiosResult);

    const history = await datasource.getRepository(History).save({
      status: axiosResult.status,
      date: new Date(),
      responseTime: axiosResult.responseTime,
      page: newPage,
      screenshot: screenshotName !== "none" ? screenshotName : "none",
    });

    return newPage;
    // const test = await datasource.getRepository(Page).findOneBy({ url });
    // if (test === null) throw new ApolloError("error");
    // return test;
  }
}
