
const export_module = (function() {

    function get_element_position(page, elementID) {
        console.log('facade is a function?');
        const facade_ = facade();
        console.log(facade().get_element_position(page, elementID));
        return facade().get_element_position(page, elementID);
    }

    return {
        // get_element_position: facade().get_element_position(page, elementID)
        get_element_position: get_element_position
    };
 
});

module.exports = export_module;

const facade = require('./facade');
