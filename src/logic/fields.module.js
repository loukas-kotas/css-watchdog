const puppeteer = require('puppeteer');

let export_module = (function() {

    async function get_specific_attributes_from_webpage(source, attributes) {

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
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

    async function get_specific_attributes_from_specific_tags(source, attributes, tags) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
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

    // FACADE
    return {
        get_attributes: async function(source, attributes) {
            return get_specific_attributes_from_webpage(source, attributes);
        },

        get_tags: async function(source, attributes, tags) {
            return get_specific_attributes_from_specific_tags(source, attributes, tags);
        }


    }

});

module.exports = export_module;