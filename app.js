var express = require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
var app = express();
dotenv.config();

app.use("/static", express.static(__dirname + "/src"));
app.use(bodyParser.json())
app.use(require('./src/routes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {    (`I am running at ${port}!`)});