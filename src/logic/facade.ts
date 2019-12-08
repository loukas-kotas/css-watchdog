import { CommonModule } from './common.module';
import { ErrorHandler } from './error-handler.controller';
import { FieldsModule } from './fields.module';
import { ScreenshotModule } from './screenshot.module';
import { PuppetModule } from './puppet.module';
import { LoginModule } from './login.module';
import { FontsModule } from './fonts.module';

export class Facade {

    beforeAllFun: any;
    beforeEachFun: any;

    constructor(beforeAllFun?: any, beforeEachFun?: any) {
        this.beforeAllFun = beforeAllFun;
        this.beforeEachFun = beforeEachFun;
        // this.beforeAll();
    }

    beforeAll() {
        return this.beforeAllFun();
    }

    beforeEach(browser: any) {
        return this.beforeEachFun(browser);
    }


    // puppet
    puppet_newpage() {
        try {
            const result = new PuppetModule().init_new_page();
            return result;
        } catch (err) {
            const error = new ErrorHandler() .handleError(err);
            return error;
        }
    }

    puppet_go_to(page: any, source: any) {
        try {
            const result = new PuppetModule().go_to_website(page, source);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    puppet_close_browser() {
        try { 
            const result = new PuppetModule().close_browser();
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    // fonts
    get_fonts(source: any) {
        try {
            const result = new FontsModule().get_all_fonts_from_website(source);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    get_attribute_of_element(source: any, elementId: string, attribute: string) {
        try {
            const result = new FontsModule().get_attribute_of_element(source, elementId, attribute);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    // fields
    get_attributes(source: any, attributes: any) {
        try {
            const result = new FieldsModule().get_specific_attributes_from_webpage(source, attributes);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    get_tags(source: any, fields: any, tags: any) {
        try {
            const result = new FieldsModule().get_specific_attributes_from_specific_tags(source, fields, tags);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    get_class(source: any, fields: any[], className: string) {
        try {
            const result = new FieldsModule().get_specific_attributes_by_class(source, fields, className);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    // screenshots
    screenshot_whole_page(source: any, pathToSave: string) {
        try {
            const result = new ScreenshotModule().take_screenshot_of_website(source, pathToSave);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    screenshot_part_page(source: any, pathToSave: string, cx0: number, cy0: number, x0: number, y0: number) {
        try {
            const result = new ScreenshotModule().take_screeenshot_of_part_of_website(source, pathToSave, cx0, cy0, x0, y0);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    screenshot_element(source: any, elementId: string) {
        try {
            const result = new ScreenshotModule().take_screenshot_of_specific_element_of_website(source, elementId);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    compare_images(sourceImagePath: string, targetImagePath: string) {
        try {
            const result = new ScreenshotModule().compare_two_images(sourceImagePath, targetImagePath);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    compare_domains(sourceImagePath: string, targetImagePath: string, pathToSave: string) {
        try {
            const result = new ScreenshotModule().compare_screenshot_of_two_domains(sourceImagePath, targetImagePath, pathToSave);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    // common
    get_element_position(page: any, elementID: string) {
        try {
            const result = new CommonModule().get_element_position(page, elementID);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

    // login
    login(source: any, username: string, password: string, usernameId: string, passwordId: string, buttonLoginId: string) {

        try {
            const result = new LoginModule().login(source, username, password, usernameId, passwordId, buttonLoginId);
            return result;
        } catch (err) {
            const error = new ErrorHandler().handleError(err);
            return error;
        }
    }

}

