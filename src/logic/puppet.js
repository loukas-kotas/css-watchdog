const puppeteer = require('puppeteer');

const export_module = (function() {
    
    
    async function init_new_page() {
        const browser = await puppeteer.launch(); // careful!!! Weird behaviours.
        return browser.newPage();
    }

    async function close_browser() {
        return browser.close();
    }

    async function go_to_website(page, source) {
        return page.goto(source);
    }

    // FACADE
    return {
        new_page: async function() {
            return init_new_page();
        },

        close_browser: async function() {
            return close_browser();
        },

        go_to: async function(page, source) {
            return go_to_website(page, source);
        }
    }

});

module.exports = export_module;