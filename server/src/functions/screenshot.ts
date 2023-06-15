import { join } from "path";
import puppeteer from "puppeteer";
import { uuid } from "uuidv4";
import fs from 'fs';

export const screenshot = async (url: string) => {

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
            width: 1200,
            height: 750,
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

    return screenshotName;
}