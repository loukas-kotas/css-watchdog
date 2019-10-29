const puppeteer = require('puppeteer');
const puppet    = require('./../../logic/puppet');
const facade    = require('./../../logic/facade');
const router = require('express').Router();
const errorHandler = require('../../logic/error-handler.controller');


router.get('', async (req, res, next) => {
    const source = req.body.source;
    const fields = req.body.fields;
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
        const error = errorHandler().handleError(err);
        res.json(error);
    })
    .then((data) => {
        res.json({'_data': data});
    });
});


router.get('/facade', async (req, res, next) => {
    const source = req.body.source;
    const fields = req.body.fields;
    const promise = new Facade().get_attributes(source, fields);
    promise
    .catch((err) => {
        const error = errorHandler().handleError(err);
        res.send(error);
    })
    .then((data) => {
        res.json({ '_data': data})
    });
    
});


router.get('/tags/facade', async (req, res, next) => {
    const source = req.body.source;
    const fields = req.body.fields;
    const tags = req.body.tags;
    const promise = new Facade().get_tags(source, fields, tags);
    promise
    .catch((err) => {
        const error = errorHandler().handleError(err);
        res
        .json(error);
    })
    .then((data) => {
        res.json({'_data': data});
    });
});




module.exports = router;