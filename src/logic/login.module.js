const puppeteer = require('puppeteer');

const export_module = (function() {
    
    async function login(source, username, password, usernameId, passwordId, buttonLoginId) {
        
        
        const browser = await puppeteer.launch();
        const page    = await browser.newPage();
        await page.goto(source);
        await page.type(usernameId, username);
        await page.type(passwordId, password);
        await page.click(buttonLoginId);
        await page.waitForNavigation({ waitUntil: 'networkidle0' }); // what is networkidle0?
        const cookies = await page.cookies();
        return await page.evaluate((cookies) => {
            const result = {message: 'Your automatic login succeeded!', current_location: location, cookies: cookies};
            return result;

        }, cookies);

    }


    return {
        // login: async function(source, username, password, usernameId, passwordId) {
        //     return login(source, username,password, usernameId, passwordId);
        // }
        login: login
    }

});


module.exports = export_module;