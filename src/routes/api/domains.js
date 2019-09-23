const puppeteer = require('puppeteer');
const puppet    = require('./../../logic/puppet');
const router = require('express').Router();

router.get('', (req, res, next) => {
    const source = req.body.source;
    const target = req.body.target;

    puppet.compareTwoDomains(source, target)
    .catch((err) => {
        const error = Error(err);
        const errResponse = {
            'message': error.message,
            'name': error.name,
            'stack': error.stack
        }
        res.json(errResponse);
    })
    .then((data) => {
        res.json({'_data': data});
    });

});

module.exports = router;