const puppeteer = require('puppeteer');

let export_module = (function() {

    async function get_element_position(page, elementID) {
        return await page.evaluate((elementID) => {
            const el = document.getElementById(elementID);
            const roundedRect = el.getBoundingClientRect();
            const [x, y, width, height] = [ roundedRect.left + window.scrollX, roundedRect.top + window.scrollY, roundedRect.width, roundedRect.height];
            const result = [x, y, width, height];
            return result;
        }, elementID);
    }

    // FACADE
    return {
        get_element_position: get_element_position
    }

});


module.exports = export_module;