const fs = require('fs');
PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

function puppetService() {
    
}


/**
 * @source_article https://meowni.ca/posts/2017-puppeteer-tests/
 */
puppetService.compareScreenshots = function(sourceImageLocation, targetImageLocation) {
    // const sourceImage = new PNG(fs.readFileSync(sourceImageLocation));
    // const targetImage = new PNG(fs.readFileSync(targetImageLocation));
    const sourceImage = fs.readFileSync(sourceImageLocation);
    const targetImage = fs.readFileSync(targetImageLocation);

    return new Promise((resolve, reject) => {
        const img1 = fs.createReadStream(sourceImageLocation).pipe(new PNG()).on('parsed', doneReading);
        const img2 = fs.createReadStream(targetImageLocation).pipe(new PNG()).on('parsed', doneReading);
        
        let filesRead = 0;
        function doneReading() {
          // Wait until both files are read.
          if (++filesRead < 2) return;
        
          // Do the visual diff.
          const diff = new PNG({width: img1.width, height: img2.height});
          const numDiffPixels = pixelmatch(
              img1.data, img2.data, diff.data, img1.width, img1.height,
              {threshold: 0.1});
    
          // The files should look the same.
          fs.writeFileSync('./assets/diff/diff.png', PNG.sync.write(diff));
          
          const result = {threshold: 0.1, different_pixels: numDiffPixels}
          resolve(result);
        }
      });
}

module.exports = puppetService;