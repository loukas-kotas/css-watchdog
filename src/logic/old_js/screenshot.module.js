const puppeteer    = require('puppeteer');
const fs           = require('fs');
PNG                = require('pngjs').PNG;
const pixelmatch   = require('pixelmatch');
const jsonfile = require('jsonfile')
process.nextTick(()=>facade=require("./facade")); //Circular reference!

const export_module = (function() {

    async function take_screenshot_of_website(source, pathToSave, browserExt, pageExt) {
        
        let browser = browserExt;
        let page = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page    = await browser.newPage();      
        } 

        await page.goto(source);
        let date = new Date().getTime();
        date = date.toString();
        await page.screenshot({path: `./${pathToSave}/${date}.png`});
        const result = {title: `${date}.png`};
        await page.waitFor(10000);
        return result;
    }

    async function take_screeenshot_of_part_of_website(source, pathToSave, cx0, cy0, x0, y0, browserExt, pageExt) {

        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page    = await browser.newPage();      
        } 

        await page.goto(source);
        let date = new Date();
        date = date.toString();
        cx0 = Number(cx0);
        cy0 = Number(cy0);
        x0 = Number(x0);
        y0 = Number(y0);
        return await page.screenshot({path: `./${pathToSave}/${date}.png`, clip: {x: cx0, y:cy0, width:x0-cx0, height:y0-cx0}});
    }

    async function take_screenshot_of_specific_element_of_website(source, elementId, browserExt, pageExt) {

        let browser = browserExt;
        let page = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page    = await browser.newPage();      
        } 

        await page.goto(source);
        let date = new Date();
        date = date.toString();
        [elementX, elementY, elementWidth, elementHeight] = await facade().get_element_position(page, elementId);
        return await page.screenshot({path: `./assets/${date}.png`, fullPage: false, omitBackground: false , clip: {x: elementX, y: elementY, width: elementWidth, height: elementHeight}});
    }

    async function compare_two_images(sourceImagePath, targetImagePath) {
        const sourceImage = fs.readFileSync(sourceImagePath);
        const targetImage = fs.readFileSync(targetImagePath);
        return new Promise((resolve, reject) => {
            const img1 = fs.createReadStream(sourceImagePath).pipe(new PNG()).on('parsed', doneReading);
            const img2 = fs.createReadStream(targetImagePath).pipe(new PNG()).on('parsed', doneReading);
            
            let filesRead = 0;
            function doneReading() {

              try {
              // Wait until both files are read.
              if (++filesRead < 2) return;
            
              // The files should be the same size.
        
                // Do the visual diff.
                const diff = new PNG({width: img1.width, height: img2.height});
                    const numDiffPixels = pixelmatch(
                        img1.data, img2.data, diff.data, img1.width, img1.height,
                        {threshold: 0.1});
                // The files should look the same.
                fs.writeFileSync('./assets/diff.png', PNG.sync.write(diff));
                
                const result = {threshold: 0.1, different_pixels: numDiffPixels, error_ratio: (numDiffPixels / (img1.height * img1.width))*100 };
                resolve(result);

              } catch (err) {
                const error = new Error(err);
                reject (error);
              }
                          
            }
          });    
    } 

    async function compare_screenshot_of_two_domains(sourceDomain, targetDomain, pathToSave, browserExt, pageExt) {
        
        let sourceSS = await take_screenshot_of_website(sourceDomain, pathToSave, browserExt, pageExt);
        let targetSS = await take_screenshot_of_website(targetDomain, pathToSave, browserExt, pageExt);
        sourceSS = `./${pathToSave}/${sourceSS.title}`;
        targetSS = `./${pathToSave}/${targetSS.title}`;
        
        return compare_two_images(sourceSS, targetSS);
    }

    // TODO: Replace the following functions as in common.module.js
    return {
        domain: async function(source, pathToSave) {
            return take_screenshot_of_website(source, pathToSave);
        },

        part: async function(source, pathToSave, cx0, cy0, x0, y0) {
            return take_screeenshot_of_part_of_website(source, pathToSave, cx0, cy0, x0, y0);
        },

        element: async function(source, elementId) {
            return take_screenshot_of_specific_element_of_website(source, elementId);
        },

        compare: async function(sourceImagePath, targetImagePath) {
            return compare_two_images(sourceImagePath, targetImagePath);
        },

        compareDomains: async function(sourceDomain, targetDomain, pathToSave) {
            return compare_screenshot_of_two_domains(sourceDomain, targetDomain, pathToSave);
        }
    }

});

module.exports = export_module;