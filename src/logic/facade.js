const puppetModule = require('./puppet');
const fontsModule = require('./fonts.module');
const fieldsModule = require('./fields.module');
const screenshotModule = require('./screenshot.module');
const commonModule = require('./common.module');
const loginModule = require('./login.module');

const export_module = (function() {


    // puppet
    function puppet_newpage() {
        const result = puppetModule().new_page();
        return result;
    }

    function puppet_go_to(page, source) {
        const result = puppetModule().go_to(page, source);
        return result;
    }

    function puppet_close_browser() {
        const result = puppetModule().close_browser();
        return result;
    }

    // fonts
    function get_fonts(source) {
        const result = fontsModule().get_fonts(source);
        return result;
    }

    // fields
    function get_attributes(source, attributes) {
        const result = fieldsModule().get_attributes(source, attributes);
        return result;
    }

    function get_tags(source, fields, tags) {
        const result = fieldsModule().get_tags(source, fields, tags);
        return result;
    }

    // screenshots
    function screenshot_whole_page(source) {
        const result = screenshotModule().domain(source);
        return result;
    }

    function screenshot_element(source, elementId) {
        const result = screenshotModule().element(source, elementId);
        return result;
    }

    function compare_images(sourceImagePath, targetImagePath) {
        const result = screenshotModule().compare(sourceImagePath, targetImagePath);
        return result;
    }

    // common
    function get_element_position(page, elementID) {
        const result = commonModule().get_element_position(page, elementID);
        return result;
    }

    // login
    function login(source, username, password, usernameId, passwordId, buttonLoginId) {

        try {
            const result = loginModule().login(source, username, password, usernameId, passwordId, buttonLoginId);
            return result;
        } catch (err) {
            console.log('oops error occured!');            
        }
    }


    function foo() {
        return 'my foo function';
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
        foo: foo,

        login: login,
    }

});

module.exports = export_module;


