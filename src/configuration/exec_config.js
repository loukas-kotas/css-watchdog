const fs = require('fs');
const facade = require('../logic/facade');

const export_module = (function() {

    const availCommands = {
        screenshot_page: 'screenshot-page'
    }; 

    const execute_configuration = function(configurationPath) {

        let rawdata = fs.readFileSync(configurationPath);
        let configuration = JSON.parse(rawdata);

        console.log('configuration data');
        console.log(Object.keys(configuration));
        console.log(configuration);
        const commands = Object.keys(configuration);
    
        commands.forEach(command => {
    
            let response = null;
            switch (command) {
                case availCommands.screenshot_page:
                    response = screenshot_page(configuration[command]);
                    console.log('~~~ RESPONSE ~~~');
                    console.log(response);
                    break;
                default:
                    break;
            }
        });
        
    }
    
    

    const screenshot_page = async function(command) {
        const source = command.source;
        const pathToSave = command.pathToSave;
        console.log('~~~~~~~');
        console.log(command);
        for (const viewport in command.viewports ) {
            const x0 = 0;
            const y0 = 0;
            const [x1, y1] = Object.values(command.viewports[viewport]);
            await facade().screenshot_part_page(source, pathToSave, Number(x0), Number(y0), Number(x1), Number(y1) );
        }
        // return new Promise((resolve, reject) => { resolve({message: `Screenshot saved successfully!`, path: `/${pathToSave}/`}) });
    }

    return {
        execute_configuration: execute_configuration
    }
});


module.exports = export_module;
