const facade = require('../logic/facade');
const errorHandler = require('../logic/error-handler.controller');

const get_attribute_of_element = async (source, elementId, attribute) => {

    facade().get_attribute_of_element(source, elementId, attribute)
    .catch((err) =>{
        errorHandler().handleError(err)
    })
    .then(response => {
        const result = {attribute: attribute, value: response, element_id: elementId, source: source};
        console.info('\n');
        console.info(result);
        console.info('\n');
        process.exit(0);  
    })
};

const screenshot_whole_page = async (source, pathToSave) => {
    console.info('Screenshot whole page');
    facade().screenshot_whole_page(source, pathToSave)
    .catch((err) => {
        console.info(`Error Occured while saving ${source}`);
        console.error(err.message);
        errorHandler().handleError(err);
        process.exit(1);
    })
    .then(response => {
        console.info('\n');
        console.info(`Screenshot of ${source} saved successfully!`);
        console.info('\n');
        process.exit(0);        
    })
}

const screenshot_part_page = async (source, pathToSave, cx0, cy0, x0, y0) => {
    facade().screenshot_part_page(source, pathToSave, cx0, cy0, x0, y0)
    .catch((err) => {
        const error = errorHandler().handleError(err)
        console.info(error);
    })
    .then(() => {
        console.info('\n');
        console.info(`Screenshot of ${source} saved successfully!`);
        console.info('\n');
        process.exit(0);
    });
}


module.exports = {
    get_attribute_of_element:get_attribute_of_element,
    screenshot_whole_page: screenshot_whole_page,
    screenshot_part_page: screenshot_part_page
}
