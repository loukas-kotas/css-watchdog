#!/usr/bin/env node

const program = require('commander');
const path = require("path");
const { 
    get_attribute_of_element,
    screenshot_whole_page,
    screenshot_part_page,
    get_attributes
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
    console.log('  $ screenshot-page https://loukaskotas.com');
    console.log('  $ screenshot-part-page https://loukaskotas.com 0 0 300 300');
    console.log('  $ attributes https://loukaskotas.com ["font-size"]');
});
    

program
    .version('0.0.1')
    .description(`CSS-Watchdog CLI - v${packageJson.version}`)

program
    .command("attribute <source> <elementId> <attribute>")
    .alias('attr')
    .description('get specific attribute of a specific element')
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
    .command("attributes <source> <attributes>")
    .alias('attrs')
    .description('Get specific attributes of every element')
    .action((source, attributes) => get_attributes(source, attributes));


program.parse(process.argv)