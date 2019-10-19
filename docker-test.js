const facade = require('./src/logic/facade');
const errorHandler = require('./src/logic/error-handler.controller');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  

const source = 'https://loukaskotas.com';

facade().screenshot_whole_page(source)
.catch(err => {
    errorHandler(err);
})
.then(data => {
    console.log(`Screenshot of ${source} has been saved!`);
});


readline.question(`What's your name?`, (name) => {
    console.log(`Hi ${name}!`)
    readline.close()
  })
  
setTimeout(() => {
    
}, 100000);