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
          
          console.error('get Attributes');
          console.log(elements);
          console.log(fields);
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

            console.log(result);
            return result;
        });

    }, fields, tags);
  }
  
  puppetController.getAll = async function(page) {
      return await page.evaluate(() => {
        const elements = document.body.getElementsByTagName('*');
        return [...elements].map(element => {
            element.focus();
            return window.getComputedStyle(element);
        });
      });
  }

  puppetController.compareArrays = function(array1, array2) {
    const result = [];
    let keys = [];
    if (Object.keys(array1).length !== Object.keys(array2).length) { 
        // return `Computed Styles Length are different  array1-length:${Object.keys(array1).length} array2-length: ${Object.keys(array2).length}`; 
        keys = (Object.keys(array1).length < Object.keys(array2).length)? Object.keys(array1): Object.keys(array2);
    } else {
        keys = Object.keys(array1);
    }
    keys.forEach(key => {
        console.log(`key: ${key}`);
        if ( array1[key] !== array2[key] ) {
            const obj = { 'field': key, 'source': array1[key], 'target': array2[key] }
            result.push(obj);
        }
    });
    // array1 = Object(array1);
    // array2 = Object(array2);
    // console.log(array1.color);
    // console.log('array1');
    // for(key in array1) {
    //     console.log(`key: ${key}`);
    //     const obj = { 'field': key, 'source': array1[key], 'target': array2[key] }
    //     result.push(obj);
    // }
    return result;
  }


  module.exports = puppetController;