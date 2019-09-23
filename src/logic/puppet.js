// source: https://github.com/GoogleChrome/puppeteer/issues/4331

const puppeteer = require('puppeteer');
const fs = require('fs');
const puppetController = require('./puppet.controller');

function puppet() {}

puppet.getFonts = async function(source) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(source);
  return puppetController.getFonts(page);
};

puppet.getFields = async function(source, fields) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(source);
    return  puppetController.getAttributes(page, fields);
}

puppet.getFieldsOfTags = async function(source, fields, tags) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(source);
    return puppetController.getAttributesOfTags(page, fields, tags);
}

puppet.compareTwoDomains = async function(source, target) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(source);
  const computedStylesDomain1 = await puppetController.getAll(page);
  // const page2 = await browser.newPage();
  await page.goto(target);
  const computedStylesDomain2 = await puppetController.getAll(page);
  // console.log('computedStylesDomain1');
  // console.log(computedStylesDomain1);
  console.log(computedStylesDomain2);
  console.log('computedStylesDomain2');
  return puppetController.compareArrays(computedStylesDomain1, computedStylesDomain2);
}



puppet.closeBrowser = async function() {
    await browser.close();
}


puppet.saveFonts = function (fonts) {
  console.log('saveFonts');
  const result = { fonts: [fonts]};
  let fontsObj = JSON.stringify(result);
  fs.writeFile("fonts.json", fontsObj, 'utf8', (err) => {
    if (err) { console.log('Error occured while writing JSON Data!'); return err; }
    console.log('JSON file saved successfully!');
  })

  fs.readFile("fonts.json", (err, data) => {
    if (err) { console.error('Error while reading the ' + "fonts.json"); return err; }
    console.log(JSON.parse(data));
  });
}



module.exports = puppet;