const puppeteer = require('puppeteer');


let export_module = (function() {

    puppeteer_     = puppeteer;
    
    // facade 
    return {
        puppeteer_: puppeteer_,
    }
});

module.exports = export_module;