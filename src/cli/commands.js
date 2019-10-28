const Facade = require('../logic/facade');
const configuration = require('../configuration/index');
const errorHandler = require('../logic/error-handler.controller');

const get_attribute_of_element = async (source, elementId, attribute) => {

    new Facade().get_attribute_of_element(source, elementId, attribute)
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
    new Facade().screenshot_whole_page(source, pathToSave)
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
    new Facade().screenshot_part_page(source, pathToSave, cx0, cy0, x0, y0)
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

const get_attributes = async  (source, attributes) => {
    new Facade().get_attributes(source, attributes)
    .catch((err) => {
        const error = errorHandler().handleError(err);
        console.error(error);
    })
    .then((data) => {
        console.info('\n');
        console.info(`Get attributes ${attributes} of ${source}:`);
        console.info('\n');
        console.log(data);
        process.exit(0);

    });
}

const configuration_execution = async (configPath) => {

    // configuration().execute_configuration(`./${configPath}`)
    configuration().execute_configuration(configPath)
    .catch((err) => {
        const error = errorHandler().handleError(err);
        // console.info(error);
        process.exit(-1);
    })
    .then(() => {
        console.info('\n');
        console.info(`Run tests from configuration file`);
        console.info('\n');
        process.exit(0);
    });
    
}


module.exports = {
    get_attribute_of_element:get_attribute_of_element,
    screenshot_whole_page: screenshot_whole_page,
    screenshot_part_page: screenshot_part_page,
    configuration_execution: configuration_execution,
    get_attributes: get_attributes
}
