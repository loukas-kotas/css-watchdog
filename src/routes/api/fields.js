const puppeteer = require('puppeteer');
const puppet    = require('./../../logic/puppet');
const router = require('express').Router();


router.get('', async (req, res, next) => {
    const source = req.body.source;
    const fields = req.body.fields;
    console.log(`source ${source}`);
    console.log('fields');
    console.log(fields);
    const promise = puppet.getFields(source, fields);
    promise
    .catch((err) => {
        res.send(err);
    })
    .then((data) => {
        res.json({ '_data': data})
        // puppet.closeBrowser();
    });
    
})

router.get('/tags', async (req, res, next) => {
    const source = req.body.source;
    const fields = req.body.fields;
    const tags = req.body.tags;
    const promise = puppet.getFieldsOfTags(source, fields, tags);
    promise
    .catch((err) => {
        const error = Error(err);
        const errResponse = {
            'message': error.message,
            'name': error.name,
            'stack': error.stack
        }

        res
        .json(errResponse);
    })
    .then((data) => {
        res.json({'_data': data});
    });
});



module.exports = router;