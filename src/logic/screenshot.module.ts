import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as PNG from 'pngjs';
import * as pixelmatch from 'pixelmatch';
// import * as jsonfile from 'jsonfile';
import { Facade } from './facade';

export class ScreenshotModule {

    async take_screenshot_of_website(source: any, pathToSave: string, browserExt?: any, pageExt?: any) {
        
        let browser = browserExt;
        let page = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page    = await browser.newPage();      
        } 

        await page.goto(source);
        let date = new Date().getTime().toString();
        await page.screenshot({path: `./${pathToSave}/${date}.png`});
        const result = {title: `${date}.png`};
        await page.waitFor(10000);
        return result;
    }

    async take_screeenshot_of_part_of_website(source: any, pathToSave: any, cx0: number, cy0: number, x0: number, y0: number, browserExt?: any, pageExt?: any) {

        let browser = browserExt;
        let page    = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page    = await browser.newPage();      
        } 

        await page.goto(source);
        let date = new Date().toString();
        cx0 = Number(cx0);
        cy0 = Number(cy0);
        x0 = Number(x0);
        y0 = Number(y0);
        return await page.screenshot({path: `./${pathToSave}/${date}.png`, clip: {x: cx0, y:cy0, width:x0-cx0, height:y0-cx0}});
    }

    async take_screenshot_of_specific_element_of_website(source: any, elementId: string, browserExt?: any, pageExt?: any) {

        let browser = browserExt;
        let page = pageExt;

        if ( !browser || !page ) {
            browser = await puppeteer.launch();
            page    = await browser.newPage();      
        } 

        await page.goto(source);
        let date = new Date().toString();
        const [elementX, elementY, elementWidth, elementHeight] = await new Facade().get_element_position(page, elementId);
        return await page.screenshot({path: `./assets/${date}.png`, fullPage: false, omitBackground: false , clip: {x: elementX, y: elementY, width: elementWidth, height: elementHeight}});
    }

    async compare_two_images(sourceImagePath: string, targetImagePath: string) {
        const sourceImage = fs.readFileSync(sourceImagePath);
        const targetImage = fs.readFileSync(targetImagePath);
        return new Promise((resolve, reject) => {
            const img1 = fs.createReadStream(sourceImagePath).pipe(new PNG.PNG()).on('parsed', doneReading);
            const img2 = fs.createReadStream(targetImagePath).pipe(new PNG.PNG()).on('parsed', doneReading);
            
            let filesRead = 0;

            function doneReading() {

              try {
              // Wait until both files are read.
              if (++filesRead < 2) return;
            
              // The files should be the same size.
        
                // Do the visual diff.
                const diff = new PNG.PNG({width: img1.width, height: img2.height});
                    const numDiffPixels = pixelmatch(
                        img1.data, img2.data, diff.data, img1.width, img1.height,
                        {threshold: 0.1});
                // The files should look the same.
                // TODO: comment in the next line when resolve the library issue
                // fs.writeFileSync('./assets/diff.png', PNG.sync.write(diff)); 
                
                const result = {threshold: 0.1, different_pixels: numDiffPixels, error_ratio: (numDiffPixels / (img1.height * img1.width))*100 };
                resolve(result);

              } catch (err) {
                const error = new Error(err);
                reject (error);
              }
                          
            }
          });    
    } 

    async compare_screenshot_of_two_domains(sourceDomain: string, targetDomain: string, pathToSave: string, browserExt?: any, pageExt?: any) {
        
        let sourceSS = await this.take_screenshot_of_website(sourceDomain, pathToSave, browserExt, pageExt);
        let targetSS = await this.take_screenshot_of_website(targetDomain, pathToSave, browserExt, pageExt);
        sourceSS.title = `./${pathToSave}/${sourceSS.title}`;
        targetSS.title = `./${pathToSave}/${targetSS.title}`;
        
        return this.compare_two_images(sourceSS.title, targetSS.title);
    }

}
