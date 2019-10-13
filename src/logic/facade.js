const puppetModule = require('./puppet');
const fontsModule = require('./fonts.module');
const fieldsModule = require('./fields.module');
const screenshotModule = require('./screenshot.module');
const commonModule = require('./common.module');
const loginModule = require('./login.module');
const errorHandler = require('./error-handler.controller');
const puppeteerModule = require('./puppeteer.module');

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

    // screenshots
    function screenshot_whole_page(source) {
        try {
            const result = screenshotModule().domain(source);
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
        screenshot_whole_page: screenshot_whole_page,
        screenshot_element: screenshot_element,
        compare_images: compare_images,
        get_element_position: get_element_position,
        login: login,
        puppeteer: puppeteer
    }

});

module.exports = export_module;


