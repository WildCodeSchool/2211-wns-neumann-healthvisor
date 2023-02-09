import { Resolver, Query, Arg, Mutation } from "type-graphql";
import datasource from "../db";
import Page, {PageInput} from "../entity/Page";
import axios from 'axios';
import { ApolloError } from "apollo-server-errors";
import puppeteer from "puppeteer";
import { join } from "path";

@Resolver(Page)
export class PageResolver {
    @Query (() => [Page])
    async Page(): Promise<Page[]> {
        const pages = await datasource.getRepository(Page).find();

        return pages
    }

    @Mutation(()=> Page)
    async createPage(@Arg("data") data: PageInput): Promise<Page> {
        return await datasource.getRepository(Page).save(data)
    }

    @Mutation(() => Page)
    async getPage(@Arg("data") { url }: PageInput): Promise<Page> {
        
        await axios.get(url).then((res) => {
            return [res.status, res.request.res.responseUrl, res.request._redirectable._redirectCount]
            
        }).catch((err) => {
            return [err.status, err.request.res.responseUrl, err.request._redirectable._redirectCount]
        })
        
        
        try {
            const browser = await puppeteer.launch({
                headless: true,
                executablePath: '/usr/bin/chromium-browser',
                args: ["--no-sandbox", "--disabled-setupid-sandbox"],
            });
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: 'networkidle2' });

            await page.setViewport({
                width: 1200,
                height: 750
            });
            const name = url.replace(/[:/]/g, "-").replace('---', '-');
            await page.screenshot({ path: join(__dirname, `../screenshot/${name}.png`)});

            await browser.close();
            console.log("screenshot effectué");

        } catch (err) {
            console.error(err);
        }
        
        const test = await datasource.getRepository(Page).findOneBy({ url });

        if(test === null) throw new ApolloError('error');

        return test;
    }
}