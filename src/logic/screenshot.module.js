const puppeteer    = require('puppeteer');
const fs           = require('fs');
PNG                = require('pngjs').PNG;
const pixelmatch   = require('pixelmatch');
process.nextTick(()=>facade=require("./facade")); //Circular reference!

const exports_module = (function() {

    async function take_screenshot_of_website(source, pathToSave) {
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);
        let date = new Date();
        date = date.toString();
        return await page.screenshot({path: `./${pathToSave}/${date}.png`});
    }

    async function take_screeenshot_of_part_of_website(source, pathToSave, cx0, cy0, x0, y0) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(source);
        let date = new Date();
        date = date.toString();
        cx0 = Number(cx0);
        cy0 = Number(cy0);
        x0 = Number(x0);
        y0 = Number(y0);
        return await page.screenshot({path: `./${pathToSave}/${date}.png`, clip: {x: cx0, y:cy0, width:x0-cx0, height:y0-cx0}});
    }

    async function take_screenshot_of_specific_element_of_website(source, elementId) {
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);
        let date = new Date();
        date = date.toString();
        [elementX, elementY, elementWidth, elementHeight] = await facade().get_element_position(page, elementId);
        return await page.screenshot({path: `./assets/${date}.png`, fullPage: false, omitBackground: false , clip: {x: elementX, y: elementY, width: elementWidth, height: elementHeight}});
    }

    async function compare_two_images(sourceImagePath, targetImagePath) {
        const sourceImage = fs.readFileSync(sourceImagePath);
        const targetImage = fs.readFileSync(targetImagePath);
        console.log('sourceIMAGE');
        console.log(sourceImage);
        return new Promise((resolve, reject) => {
            const img1 = fs.createReadStream(sourceImagePath).pipe(new PNG()).on('parsed', doneReading);
            const img2 = fs.createReadStream(targetImagePath).pipe(new PNG()).on('parsed', doneReading);
            console.log('img1');
            console.log(img1);
            
            let filesRead = 0;
            function doneReading() {

              try {
              // Wait until both files are read.
              if (++filesRead < 2) return;
            
              // The files should be the same size.
              console.log(`img1.width -> ${img1.width} img2.width -> ${img2.width}`)
              console.log(`img1.height -> ${img1.height} img2.height -> ${img2.height}`)
        
                // Do the visual diff.
                const diff = new PNG({width: img1.width, height: img2.height});
                    const numDiffPixels = pixelmatch(
                        img1.data, img2.data, diff.data, img1.width, img1.height,
                        {threshold: 0.1});
                // The files should look the same.
                fs.writeFileSync('./assets/diff/diff.png', PNG.sync.write(diff));
        
                console.log(`number of different pixels should be 0  --> number: ${numDiffPixels} `);
        
                const result = {threshold: 0.1, different_pixels: numDiffPixels}
                resolve(result);

              } catch (err) {
                const error = new Error(err);
                reject (error);
              }
                          
            }
          });    
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
        }
    }

});

module.exports = exports_module;