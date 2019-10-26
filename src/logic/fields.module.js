const puppeteer = require('puppeteer');

let export_module = (function() {

    async function get_specific_attributes_from_webpage(source, attributes, browserExt, pageExt) {

        let browser = browserExt;
        let page = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }

        await page.goto(source);

        return await page.evaluate((attributes) => {
            const elements = document.body.getElementsByTagName("*");
            return [...elements].map(element => {
                
                element.focus();
                let result = {
                    'id': element.id,
                    'tag': element.tagName,
                };
                
                attributes.forEach(attribute => {
                    result[attribute] = window.getComputedStyle(element).getPropertyValue(attribute);
                });
                return result;
            });
        }, attributes);
  
    }

    async function get_specific_attributes_from_specific_tags(source, attributes, tags, browserExt, pageExt) {
        
        let browser = browserExt;
        let page    = pageExt;


        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }
        await page.goto(source);
        return await page.evaluate((attributes, tags) => {
            let elements = [];
            tags.forEach(tag => { elements = elements.concat(Array.from(document.body.getElementsByTagName(tag))); });
            return [...elements].map(element => {
                element.focus();
                let result = {
                    'id': element.id,
                    'tag': element.tagName,
                }
                
                attributes.forEach(attribute => {
                    result[attribute] = window.getComputedStyle(element).getPropertyValue(attribute);
                });
    
                return result;
            });
    
        }, attributes, tags);    
    }

    async function get_specific_attributes_by_class(source, attributes, className, browserExt, pageExt) {

        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page = await browser.newPage();
        }
        console.log('className');
        console.log(className);
        await page.goto(source);
        return await page.evaluate((attributes, className) => {
            let elements = [];
            elements = elements.concat(Array.from(document.body.getElementsByClassName(className)));
            return [...elements].map(element => {
                element.focus();
                let result = {
                    'id': element.id,
                    'tag': element.tagName,
                }

                attributes.forEach(attribute => {
                    result[attribute] = window.getComputedStyle(element).getPropertyValue(attribute);
                });

                return result;
            });
        }, attributes, className);
    }

    // FACADE
    return {
        get_attributes: async function(source, attributes) {
            return get_specific_attributes_from_webpage(source, attributes);
        },

        get_tags: async function(source, attributes, tags) {
            return get_specific_attributes_from_specific_tags(source, attributes, tags);
        },

        get_class: async function(source, attributes, className) {
            return get_specific_attributes_by_class(source, attributes, className);
        },

    }

});

module.exports = export_module;