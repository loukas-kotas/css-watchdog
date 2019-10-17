const facade = require('../logic/facade');
const errorHandler = require('../logic/error-handler.controller');

const get_attribute_of_element = async (source, elementId, attribute) => {

    facade().get_attribute_of_element(source, elementId, attribute)
    .catch((err) =>{
        errorHandler().handleError(err)
    })
    .then(response => {
        const result = {attribute: attribute, value: response, element_id: elementId, source: source};
        return result;     
    })
};

const screenshot_whole_page = async (source) => {
    const result = await facade().screenshot_whole_page(source);
    process.exit(result);
}


module.exports = {
    get_attribute_of_element:get_attribute_of_element,
    screenshot_whole_page: screenshot_whole_page

}
