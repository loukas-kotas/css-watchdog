import * as puppeteer from 'puppeteer';


export class FontsModule {

     async get_all_fonts_from_website(source: string, browserExt?: any, pageExt?: any) {

        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }

        await page.goto(source);

        return  await page.evaluate(() => {

            const elements = document.body.getElementsByTagName("*") as HTMLCollectionOf<HTMLElement>;        
                return [...elements].map(element => {
                    element.focus();
                    return window.getComputedStyle(element).getPropertyValue("font-family");
                });
        });
    }

    async get_attribute_of_element(source: string, elementId: string, attribute: string, browserExt?: any, pageExt?: any) {
        
        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }
        
        await page.goto(source);

        return await page.evaluate((elementId: string, attribute: any) => {
            const element = document.getElementById(elementId) as HTMLElement;
            
            return window.getComputedStyle(element).getPropertyValue(attribute);

        }, elementId, attribute);
    }

}