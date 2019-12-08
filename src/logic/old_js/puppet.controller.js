const puppetService = require('./puppet.service');

function puppetController() {}

puppetController.getFonts = async function(page) {
    return  await page.evaluate(() => {
      const elements = document.body.getElementsByTagName("*");
  
      return [...elements].map(element => {
        element.focus();
        return window.getComputedStyle(element).getPropertyValue("font-family");
      });
    });
  }
  
 puppetController.getAttributes = async function(page, fields) {
      return await page.evaluate((fields) => {
          const elements = document.body.getElementsByTagName("*");
          
          return [...elements].map(element => {
              
              element.focus();
              let result = {
                  'id': element.id,
                  'tag': element.tagName,
              };
              
              
              fields.forEach(field => {
                  result[field] = window.getComputedStyle(element).getPropertyValue(field);
              });
              return result;
          });
      }, fields);
  }
  
puppetController.getAttributesOfTags = async function(page, fields, tags) {
    return await page.evaluate((fields, tags) => {
        let elements = [];
        tags.forEach(tag => { elements = elements.concat(Array.from(document.body.getElementsByTagName(tag))); });
        return [...elements].map(element => {
            element.focus();
            let result = {
                'id': element.id,
                'tag': element.tagName,
            }
            
            fields.forEach(field => {
                result[field] = window.getComputedStyle(element).getPropertyValue(field);
            });

            return result;
        });

    }, fields, tags);
  }
  
  /**
   * get every attribute of every tag in the page
   */
  puppetController.getAll = async function(page) {
      return await page.evaluate(() => {

        function filterNumbers (value) {
            if ( !Number(value) ) return true; else return false;
        }

        const elements = document.body.getElementsByTagName('*');
        let properties = Array.from(window.getComputedStyle(elements[0]));
        properties = properties.filter(filterNumbers);
        
        return [...elements].map(element => {
            element.focus();
            const result = {
                '_id': element.id,
                '_tag': element.tagName,
            };
            properties.forEach(property => {
                result[property] = window.getComputedStyle(element).getPropertyValue(property);
            });
            return result;
        });
      });
  }


  puppetController.compareArrays = function(array1, array2, keys) {
    const result = [];

    array1.forEach(element1 => {
        // Check only elements that have ID
        if (element1._id && element1._id.length > 0) {
            const attr2Index = array2.findIndex(item2 => item2._id === element1._id);

            // Compare fields of elements with same ID
            if (attr2Index  > -1) {
                keys.forEach(key => {
                    if ( element1[key] !== array2[attr2Index][key] ) {
                        const obj = { '_id': element1._id, 'field': key, 'source': element1[key], 'target': array2[attr2Index][key] };
                        result.push( obj );
                    }
                });            
            }
        } 

    });
    
    return result;
  }


    puppetController.getKeys = async function(page) {
        return await page.evaluate(() => {
            let keys = [];
            const elements = document.getElementsByTagName('*');
            keys = window.getComputedStyle(document.getElementsByTagName('*')[0]);
            keys = Array.from(keys);
            return keys;
        });
    }

    puppetController.getScreenshot = async function(page) {
        let date = new Date();
        date = date.toString();
        const url = page._target.url();
        return await page.screenshot({path: `./assets/${date}.png`});
    }


    puppetController.getScreenshotOfElement = async function(page, elementId) {
        let date = new Date();
        date = date.toString();        
        [elementX, elementY, elementWidth, elementHeight] = await puppetController.getElementPosition(page, elementId);
        return await page.screenshot({path: `./assets/${date}.png`, fullPage: false, omitBackground: false , clip: {x: elementX, y: elementY, width: elementWidth, height: elementHeight}});
    }

    puppetController.getElementPosition = async function(page, elementID) {
        return await page.evaluate((elementID) => {
            const el = document.getElementById(elementID);
            const roundedRect = el.getBoundingClientRect();
            const [x, y, width, height] = [ roundedRect.left + window.scrollX, roundedRect.top + window.scrollY, roundedRect.width, roundedRect.height];
            const result = [x, y, width, height];
            return result;
        }, elementID);
    }

    puppetController.login = async function(page, username, password, usernameId, passwordId, buttonLoginId) {
        await page.type(usernameId, username);
        await page.type(passwordId, password);
        await page.click(buttonLoginId);
        await page.waitForNavigation({ waitUntil: 'networkidle0' }); // what is networkidle0?
        const cookies = await page.cookies();
        return await page.evaluate((cookies) => {
            const result = {message: 'Your automatic login succeeded!', current_location: location, cookies: cookies};
            return result;
        }, cookies)
    }

    puppetController.compareScreenshots = async function(sourceImageLocation, targetImageLocation) {
        return puppetService.compareScreenshots(sourceImageLocation, targetImageLocation);
    }

  module.exports = puppetController;