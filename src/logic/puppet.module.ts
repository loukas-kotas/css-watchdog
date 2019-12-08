import * as puppeteer from 'puppeteer';

// const puppeteer = require('puppeteer');


export class PuppetModule {
    
    async init_new_page() {
        const browser = await puppeteer.launch(); // careful!!! Weird behaviours.
        return browser.newPage();
    }

    async close_browser() {
        // return browser.close();
    }

    async go_to_website(page: any, source: string) {
        return page.goto(source);
    }

}

