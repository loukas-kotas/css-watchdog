// source: https://github.com/GoogleChrome/puppeteer/issues/4331

const puppeteer = require('puppeteer');
const fs = require('fs');
const puppetController = require('./puppet.controller');
const mediator = require('./mediator');

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
  const keys = await puppetController.getKeys(page);
  return puppetController.compareArrays(computedStylesDomain1, computedStylesDomain2, keys);
}



puppet.closeBrowser = async function() {
    await browser.close();
}


puppet.saveFonts = function (fonts) {
  const result = { fonts: [fonts]};
  let fontsObj = JSON.stringify(result);
  fs.writeFile("fonts.json", fontsObj, 'utf8', (err) => {
    if (err) { console.log('Error occured while writing JSON Data!'); return err; }
  })

  fs.readFile("fonts.json", (err, data) => {
    if (err) { console.error('Error while reading the ' + "fonts.json"); return err; }
  });
}

puppet.getScreenshot = async function(source) {
  const browser = await puppeteer.launch();
  const page    = await browser.newPage();
  await page.goto(source);
  return puppetController.getScreenshot(page);
}


puppet.getScreenshotOfElement = async function(source, elementId) {
  const browser = await puppeteer.launch();
  const page    = await browser.newPage();
  await page.goto(source);
  return puppetController.getScreenshotOfElement(page, elementId);
}

puppet.login = async function(source, username, password, usernameId, passwordId, buttonLoginId) {
  const browser = await puppeteer.launch();
  const page    = await browser.newPage();
  await page.goto(source);
  return puppetController.login(page, username, password, usernameId, passwordId, buttonLoginId);

}

puppet.redirect = async function(source) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(source);
  return page.url();
}

puppet.compareScreenshots = async function() {
  const sourceImageLocation = './assets/image_1.png';
  const targetImageLocation = './assets/image_2.png';
  return puppetController.compareScreenshots(sourceImageLocation, targetImageLocation);
}


puppet.window = function() {
  mediator.window('https://loukaskotas.com');
}


module.exports = puppet;