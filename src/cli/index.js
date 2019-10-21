#!/usr/bin/env node

const program = require('commander');
const path = require("path");
const { 
    get_attribute_of_element,
    screenshot_whole_page,
    screenshot_part_page,
    configuration_execution
} = require('./commands');
const fs = require("fs");

const contents = fs.readFileSync(path.resolve(__dirname, "./package.json"));
var packageJson = JSON.parse(contents);

program
    .option('-d, --debug', 'output extra debugging')


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
    .command("screenshot-page <source> <pathToSave>")
    .alias('sp')
    .description('Screenshot the whole webpage')
    .action((source, pathToSave) => screenshot_whole_page(source, pathToSave));

program
    .command("screenshot-part-page <source> <path-to-save> <x0> <y0> <x1> <y1>")
    .alias('spp')
    .description('Screenshot part of the webpage')
    .action((source, pathToSave, cx0, cy0, x0, y0) => screenshot_part_page(source, pathToSave, cx0, cy0, x0, y0));

program
    .command("configuration <configuration-path>")
    .alias('con')
    .description('Execute tests found in configuration file')
    .action((configPath) => configuration_execution(configPath));


program
    .command("config")
    .alias('n')
    .description('see the current weather in the specified city')
    .action(() => run_through_configuration());


program.parse(process.argv)