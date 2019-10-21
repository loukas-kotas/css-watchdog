const  exec_config = require('./exec_config');

const export_module = (function() {

    const execute_configuration = function(configurationPath) {
        try {
            const result = exec_config().execute_configuration(configurationPath);
            return result;
        } catch (err) {
            const error = errorHandler().handleError(err);
            return error;
        }
    } 

    return {
        execute_configuration: execute_configuration
    }
});


module.exports = export_module;
