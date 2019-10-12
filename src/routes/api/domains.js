const puppeteer = require('puppeteer');
const puppet    = require('./../../logic/puppet');
const router = require('express').Router();
const errorHandler = require('../../logic/error-handler.controller');

router.get('', (req, res, next) => {
    const source = req.body.source;
    const target = req.body.target;

    puppet.compareTwoDomains(source, target)
    .catch((err) => {
        const error = errorHandler().handleError(err);
        res.json(error);
    })
    .then((data) => {
        res.json({'_data': data});
    });

});

module.exports = router;