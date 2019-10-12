const puppeteer = require('puppeteer');


const export_module = (function() {

     async function get_all_fonts_from_website(source) {

        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);

        return  await page.evaluate(() => {

            const elements = document.body.getElementsByTagName("*");        
                return [...elements].map(element => {
                    element.focus();
                    return window.getComputedStyle(element).getPropertyValue("font-family");
                });
        });
    }


    // FACADE
    return  {
        get_fonts: async function(source) {
            return get_all_fonts_from_website(source)
        }
    }
});


module.exports = export_module;