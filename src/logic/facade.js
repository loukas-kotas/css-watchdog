const puppetModule = require('./puppet');
const fontsModule = require('./fonts.module');
const fieldsModule = require('./fields.module');
const screenshotModule = require('./screenshot.module');
const commonModule = require('./common.module');
const loginModule = require('./login.module');
const errorHandler = require('./error-handler.controller');
const puppeteerModule = require('./puppeteer.module');

class Facade {
    constructor(beforeAllFun, beforeEachFun) {
        this.beforeAllFun = beforeAllFun;
        this.beforeEachFun = beforeEachFun;
        // this.beforeAll();
    }

    beforeAll() {
        return this.beforeAllFun();
    }

    beforeEach(browser) {
        return this.beforeEachFun(browser);
    }


    // puppet
    puppet_newpage() {
        try {
            const result = puppetModule().new_page();
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    puppet_go_to(page, source) {
        try {
            const result = puppetModule().go_to(page, source);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    puppet_close_browser() {
        try { 
            const result = puppetModule().close_browser();
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // fonts
    get_fonts(source) {
        try {
            const result = fontsModule().get_fonts(source);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    get_attribute_of_element(source, elementId, attribute) {
        try {
            const result = fontsModule().get_attribute_of_element(source, elementId, attribute);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // fields
    get_attributes(source, attributes) {
        try {
            const result = fieldsModule().get_attributes(source, attributes);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    get_tags(source, fields, tags) {
        try {
            const result = fieldsModule().get_tags(source, fields, tags);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    get_class(source, fields, className) {
        try {
            const result = fieldsModule().get_class(source, fields, className);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // screenshots
    screenshot_whole_page(source, pathToSave) {
        try {
            const result = screenshotModule().domain(source, pathToSave);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    screenshot_part_page(source, pathToSave, cx0, cy0, x0, y0) {
        try {
            const result = screenshotModule().part(source, pathToSave, cx0, cy0, x0, y0);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    screenshot_element(source, elementId) {
        try {
            const result = screenshotModule().element(source, elementId);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    compare_images(sourceImagePath, targetImagePath) {
        try {
            const result = screenshotModule().compare(sourceImagePath, targetImagePath);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    compare_domains(sourceImagePath, targetImagePath, pathToSave) {
        try {
            const result = screenshotModule().compareDomains(sourceImagePath, targetImagePath, pathToSave);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // common
    get_element_position(page, elementID) {
        try {
            const result = commonModule().get_element_position(page, elementID);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // login
    login(source, username, password, usernameId, passwordId, buttonLoginId) {

        try {
            const result = loginModule().login(source, username, password, usernameId, passwordId, buttonLoginId);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // puppeteer
    puppeteer() {
        return puppeteerModule().puppeteer_;
    }


}

// TODO: remove export_module
const export_module = (function() {


    // puppet
    function puppet_newpage() {
        try {
            const result = puppetModule().new_page();
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function puppet_go_to(page, source) {
        try {
            const result = puppetModule().go_to(page, source);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function puppet_close_browser() {
        try { 
            const result = puppetModule().close_browser();
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // fonts
    function get_fonts(source) {
        try {
            const result = fontsModule().get_fonts(source);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function get_attribute_of_element(source, elementId, attribute) {
        try {
            const result = fontsModule().get_attribute_of_element(source, elementId, attribute);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // fields
    function get_attributes(source, attributes) {
        try {
            const result = fieldsModule().get_attributes(source, attributes);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function get_tags(source, fields, tags) {
        try {
            const result = fieldsModule().get_tags(source, fields, tags);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function get_class(source, fields, className) {
        try {
            const result = fieldsModule().get_class(source, fields, className);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // screenshots
    function screenshot_whole_page(source, pathToSave) {
        try {
            const result = screenshotModule().domain(source, pathToSave);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function screenshot_part_page(source, pathToSave, cx0, cy0, x0, y0) {
        try {
            const result = screenshotModule().part(source, pathToSave, cx0, cy0, x0, y0);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function screenshot_element(source, elementId) {
        try {
            const result = screenshotModule().element(source, elementId);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function compare_images(sourceImagePath, targetImagePath) {
        try {
            const result = screenshotModule().compare(sourceImagePath, targetImagePath);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    function compare_domains(sourceImagePath, targetImagePath, pathToSave) {
        try {
            const result = screenshotModule().compareDomains(sourceImagePath, targetImagePath, pathToSave);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // common
    function get_element_position(page, elementID) {
        try {
            const result = commonModule().get_element_position(page, elementID);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // login
    function login(source, username, password, usernameId, passwordId, buttonLoginId) {

        try {
            const result = loginModule().login(source, username, password, usernameId, passwordId, buttonLoginId);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    }

    // puppeteer
    function puppeteer() {
        return puppeteerModule().puppeteer_;
    }


    // FACADE
    return {
        puppet_newpage: puppet_newpage,
        puppet_go_to: puppet_go_to,
        puppet_close_browser: puppet_close_browser,
        get_fonts: get_fonts,
        get_attributes: get_attributes,
        get_tags: get_tags,
        get_class: get_class,
        screenshot_whole_page: screenshot_whole_page,
        screenshot_part_page: screenshot_part_page,
        screenshot_element: screenshot_element,
        compare_images: compare_images,
        get_element_position: get_element_position,
        login: login,
        puppeteer: puppeteer,
        get_attribute_of_element: get_attribute_of_element,
        compare_domains: compare_domains
    }

});

module.exports = Facade;


