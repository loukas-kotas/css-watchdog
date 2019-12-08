// const puppeteer = require('puppeteer');
import * as puppeteer from 'puppeteer';


export class CommonModule {
    

    async get_element_position(source: string, elementID: string, browserExt?: any, pageExt?: any): Promise<void> {

        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }

        await page.goto(source);

        return await page.evaluate((elementID: any) => {
            const el = document.getElementById(elementID) ;

            if (el) {
                const roundedRect = el.getBoundingClientRect();
                const [x, y, width, height] = [ roundedRect.left + window.scrollX, roundedRect.top + window.scrollY, roundedRect.width, roundedRect.height];
                const result = [x, y, width, height];
                return result;
            }

        }, elementID);
    }

}

