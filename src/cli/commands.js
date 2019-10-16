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


module.exports = {
    get_attribute_of_element:get_attribute_of_element
}
