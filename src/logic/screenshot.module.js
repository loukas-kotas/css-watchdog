const puppeteer    = require('puppeteer');
const fs           = require('fs');
PNG                = require('pngjs').PNG;
const pixelmatch   = require('pixelmatch');
const facade       = require('./facade');

const exports_module = function() {

    async function take_screenshot_of_website(source) {
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);
        let date = new Date();
        date = date.toString();
        const url = page._target.url();
        return await page.screenshot({path: `./assets/${date}.png`});
    }

    async function take_screenshot_of_specific_element_of_website(source, elementId) {
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);
        let date = new Date();
        date = date.toString();
        console.log('page!!!');
        console.log(facade);

        // facade().get_element_position(page, elementId)
        // .catch(err => {console.log('i am an error!'); console.log(err); throw(err)})
        // .then(data => { 
        //     console.log('data');
        //     console.log(data);
        //     const [elementX, elementY, elementWidth, elementHeight] = data; 
        // })
        return await page.screenshot({path: `./assets/${date}.png`, fullPage: false, omitBackground: false , clip: {x: elementX, y: elementY, width: elementWidth, height: elementHeight}});
        // try {
        //     [elementX, elementY, elementWidth, elementHeight] = await facade().get_element_position(page, elementId);
        // } catch(err) {
        //     console.log(err);
        //     throw(err); // TypeError: failed to fetch
        // }
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
            }
          });    
    } 

    return {
        domain: async function(source) {
            return take_screenshot_of_website(source);
        },

        element: async function(source, elementId) {
            return take_screenshot_of_specific_element_of_website(source, elementId);
        },

        compare: async function(sourceImagePath, targetImagePath) {
            return compare_two_images(sourceImagePath, targetImagePath);
        }
    }

};

module.exports = exports_module;