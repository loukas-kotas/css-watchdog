import * as puppeteer from 'puppeteer';




// const puppeteer = require('puppeteer');

export class FieldsModule {

    async  get_specific_attributes_from_webpage(source: any, attributes: any, browserExt?: any, pageExt?: any) {

        let browser = browserExt;
        let page = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }

        await page.goto(source);

        return await page.evaluate((attributes: { forEach: (arg0: (attribute: any) => void) => void; }) => {
            const elements = document.body.getElementsByTagName("*") as HTMLCollectionOf<HTMLElement>;
            return [...elements].map(element => {
                
                element.focus();
                let result: any = {
                    'id': element.id,
                    'tag': element.tagName,
                };
                
                attributes.forEach((attribute: string) => {
                    result[attribute] = window.getComputedStyle(element).getPropertyValue(attribute);
                });
                return result;
            });
        }, attributes);
  
    }

    async  get_specific_attributes_from_specific_tags(source: any, attributes: any, tags: any, browserExt?: any, pageExt?: any) {
        
        let browser = browserExt;
        let page    = pageExt;


        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }
        await page.goto(source);
        return await page.evaluate((attributes: any, tags: any) => {
            let elements: any = [];
            tags.forEach((tag: any) => { elements = elements.concat(Array.from(document.body.getElementsByTagName(tag))); });
            return [...elements].map(element => {
                element.focus();
                let result: any = {
                    'id': element.id,
                    'tag': element.tagName,
                }
                
                attributes.forEach((attribute: string) => {
                    result[attribute] = window.getComputedStyle(element).getPropertyValue(attribute);
                });
    
                return result;
            });
    
        }, attributes, tags);    
    }

    async  get_specific_attributes_by_class(source: any, attributes: any, className: any, browserExt?: any, pageExt?: any) {

        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }
        await page.goto(source);
        return await page.evaluate((attributes: any, className: any) => {
            let elements: any = [];
            elements = elements.concat(Array.from(document.body.getElementsByClassName(className)));
            return [...elements].map(element => {
                element.focus();
                let result: any = {
                    'id': element.id,
                    'tag': element.tagName,
                }

                attributes.forEach((attribute: string) => {
                    result[attribute] = window.getComputedStyle(element).getPropertyValue(attribute);
                });

                return result;
            });
        }, attributes, className);
    }


}