import { Resolver, Query, Arg, Mutation, Ctx, Authorized } from "type-graphql";
import datasource from "../db";
import boss from "../db-boss";
import Page, { PageInput, UpdatePageInput } from "../entity/Page";
import History, { HistoryAnonymous } from "../entity/History";
import { ApolloError } from "apollo-server-errors";
import { ContextType } from "../index";
import User from "../entity/User";
import { RequestPage } from "../functions/axiosRequestPage";
import { screenshot } from "../functions/screenshot";
import { Job } from "pg-boss";
import getCron from "../functions/getCron";

const options = { teamSize: 5, teamConcurrency: 5 };

async function requestJob(job: Job) {
  // console.log("job en cours", job);
  const page = (job.data as any).page as Page;
  const user = (job.data as any).user as User;
  const result = await RequestPage(page.url);
  console.log(
    `ID Page: ${page.id} 
    \n Date: ${new Date()}`,
    result
  );

  //screenshot:
  let screenshotPage: string = "none";

  if (result.status !== "inaccessible") {
    screenshotPage = await screenshot(page.url);
  }

  // enregistrement db :
  const history = await datasource.getRepository(History).save({
    status: result.status,
    date: new Date(),
    responseTime: result.responseTime,
    page,
    screenshot: screenshotPage !== "none" ? `${screenshotPage}.png` : "none",
    user,
  });

  //assignement à l'utilisateur :
  const pageAlreadyOwned = user.pages?.some((p) => p.url === page.url);

  if (!pageAlreadyOwned) user.pages?.push(page);
  await datasource.getRepository(User).save(user);
}

async function assignScheduledRequestTasks() {
  try {
    await boss.start();

    // Récupérer toutes les tâches planifiées
    const schedules = await boss.getSchedules();
    // on récupére seulements les schedules qui commences par r-
    const filteredSchedules = schedules.filter((schedule) =>
      schedule.name.startsWith("r-")
    );
    // Parcourir les tâches planifiées et assigner des travaux avec le handler approprié
    for (const schedule of filteredSchedules) {
      const { name } = schedule;
      console.log(`Name: ${name} \n`, schedule);
      // Assigner un work
      await boss.work(name, options, requestJob);
    }

    console.log(
      "Toutes les tâches planifiées ont été assignées en tant que travaux."
    );
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
  }
}

async function startPgBoss() {
  console.log("Starting pg-boss ...");
  boss.on("error", (error: any) => console.error(error));
  await boss.start();
  console.log("Starting pg-boss terminé");
  await assignScheduledRequestTasks();
  console.log("Re-assignement des schedules d'historique : OK");
}

startPgBoss();
@Resolver(Page)
export class PageResolver {
  @Query(() => [Page])
  async Page(): Promise<Page[]> {
    const pages = await datasource.getRepository(Page).find({
      relations: {
        histories: true,
        users: true,
      },
    });

    return pages;
  }

  @Mutation(() => Page)
  async createPage(@Arg("data") data: PageInput): Promise<Page> {
    return await datasource.getRepository(Page).save(data);
  }

  @Authorized()
  @Mutation(() => Page)
  async updatePage(
    @Ctx() { currentUser }: ContextType,
    @Arg("data") data: UpdatePageInput
  ): Promise<Page> {
    const page = await datasource.getRepository(Page).findOne({
      where: { id: data.id },
      relations: ["users"],
    });

    if(page){
      const intervale = getCron(page.intervale);
      if (intervale) {
        await boss.schedule(
          `r-${page?.id}`,
          intervale,
          { page, user: currentUser },
          { tz: "Europe/Paris" }
        );
      } else {
        throw new ApolloError(
          "Intervale invalid",
          "INTERVALE_ERROR"
        );
      }
    } else {
      throw new ApolloError(
        "Page not found",
        "PAGE_ERROR"
      );
    }

    if (page?.users.find((u) => u.id === currentUser?.id)) {
      return await datasource.getRepository(Page).save({ ...data });
    } else {
      throw new ApolloError(
        "User can't access to this ressource",
        "USER_ERROR"
      );
    }
  }

  @Mutation(() => HistoryAnonymous)
  async getPage(@Arg("data") { url }: PageInput): Promise<HistoryAnonymous> {
    const axiosResult = await RequestPage(url);

    let screenshotPage: string = "none";

    if (axiosResult.status !== "inaccessible") {
      screenshotPage = await screenshot(url);
    }

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
  async addPageToUser(
    @Ctx() { currentUser }: ContextType,
    @Arg("url") { url }: PageInput
  ): Promise<History> {
    if (typeof currentUser === "undefined")
      throw new ApolloError("User error", "USER_ERROR");

    const userDB = await datasource.getRepository(User).findOne({
      where: { id: currentUser.id },
      relations: { pages: { histories: true, users: false } },
    });

    if (userDB === null) throw new ApolloError("User error", "USER_ERROR");

    const axiosResult = await RequestPage(url);

    let screenshotPage: string = "none";

    if (axiosResult.status !== "inaccessible") {
      screenshotPage = await screenshot(url);
    }

    let page: Page;
    const existingPage = await datasource
      .getRepository(Page)
      .findOneBy({ url });

    if (existingPage === null) {
      page = await datasource.getRepository(Page).save({ url });
    } else {
      page = existingPage;
    }

    const intervale = getCron(page.intervale);
    if (!intervale) throw new ApolloError("Interval error", "PARAM_ERROR");

    //pgboss
    const idString = page.id.toString();
    await boss.work(`r-${idString}`, options, requestJob);
    await boss.schedule(
      `r-${idString}`,
      intervale,
      { page, user: userDB },
      { tz: "Europe/Paris" }
    );
    //fin pgboss

    const history = await datasource.getRepository(History).save({
      status: axiosResult.status,
      date: new Date(),
      responseTime: axiosResult.responseTime,
      page: page,
      screenshot: screenshotPage !== "none" ? `${screenshotPage}.png` : "none",
      user: userDB,
    });

    const pageAlreadyOwned = userDB.pages?.some((p) => p.url === page.url);

    if (!pageAlreadyOwned) userDB.pages?.push(page);
    await datasource.getRepository(User).save(userDB);

    return history;
  }
}
