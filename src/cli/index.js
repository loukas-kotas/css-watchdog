const program = require('commander');
const { 
    get_attribute_of_element,
    screenshot_whole_page
} = require('./commands');
const { run_through_configuration } = require("./configuration");
const fs = require("fs");

var contents = fs.readFileSync("./package.json");
var packageJson = JSON.parse(contents);

program
    .option('-d, --debug', 'output extra debugging')
    .option('-a, --amend', 'output extra debugging')


program.on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ attribute https://loukaskotas.com experience font-size');
});
    

program
    .version('0.0.1')
    .description(`CSS-Watchdog CLI - v${packageJson.version}`)

program
    .command("attribute <source> <elementId> <attribute>")
    .alias('n')
    .description('see the current weather in the specified city')
    .action((source, elementId, attribute) => get_attribute_of_element( source, elementId, attribute));

program
    .command("screenshot-page <source>")
    .alias('n')
    .description('see the current weather in the specified city')
    .action((source) => screenshot_whole_page(source));

    program
    .command("config")
    .alias('n')
    .description('see the current weather in the specified city')
    .action(() => run_through_configuration());


program.parse(process.argv)