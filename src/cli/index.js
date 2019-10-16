const program = require('commander');
const { get_attribute_of_element } = require('./commands');


program
    .version('0.0.1')
    .description('Command line Weather Application')

program
    .command("attribute <source> <elementId> <attribute>")
    .alias('n')
    .description('see the current weather in the specified city')
    .action((source, elementId, attribute) => get_attribute_of_element( source, elementId, attribute));


program.parse(process.argv)