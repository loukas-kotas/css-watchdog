var express = require('express')
const bodyParser = require('body-parser');
var app = express()

app.use("/static", express.static(__dirname + "/src"));
app.use(bodyParser.json())
app.use(require('./src/routes'));

const port = 3000;
app.listen(port, () => { console.log(`I am running at ${port}`)});