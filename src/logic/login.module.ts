import * as puppeteer from 'puppeteer';

export class LoginModule {

    async login(source: string, username: string, password: string, usernameId: string, passwordId: string, buttonLoginId: string) {
        
        
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);
        await page.type(usernameId, username);
        await page.type(passwordId, password);
        await page.click(buttonLoginId);
        await page.waitForNavigation({ waitUntil: 'networkidle0' }); // what is networkidle0?
        const cookies = await page.cookies();
        return await page.evaluate((cookies) => {
            const result = {message: 'Your automatic login succeeded!', current_location: location, cookies: cookies};
            return result;

        }, Object(cookies));

    }
}
