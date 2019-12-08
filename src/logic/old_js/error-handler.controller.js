
const export_module = (function() {

    function handleError(err) {
        return formatError(err);    
    }

    function formatError(err) {
        let error = Error(err);
        error =  {
            'message': error.message,
            'name': error.name,
            'stack': error.stack
        }
        return error;
    }

    return {
        handleError: handleError
    }
});


module.exports = export_module;