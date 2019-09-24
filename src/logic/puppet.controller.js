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
    // let keys = [];

    // if (Object.keys(array1[0]).length !== Object.keys(array2[0]).length) { 
    //     [keys, len] = (Object.keys(array1[0]).length < Object.keys(array2[0]).length)? [Object.keys(array1[0]), array1.length]: [Object.keys(array2[0]), array2.length];
    //     keys = Object.keys(array1[0]);
    // } else {
    //     [keys, len] = [Object.keys(array1[0]), array1[0].length];
    // }


    array1.forEach(element1 => {
        // Check only elements that have ID
        if (element1._id && element1._id.length > 0) {
            const attr2Index = array2.findIndex(item2 => item2._id === element1._id);

            // Compare fields of elements with same ID
            if (attr2Index  > -1) {
                keys.forEach(key => {
                    console.log(`element1[${key}]: ${element1[key]} || element2[${key}]: ${array2[attr2Index][key]} \n`);
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


  module.exports = puppetController;