const router = require('express').Router();
const puppet = require('../../logic/puppet');


router.get('/domain', (req, res, next) => {
    const source = req.body.source;
    const promise = puppet.getScreenshot(source);
    promise
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
        res.json({'_data': 'Screenshot Saved Successfully!'});
    });
});

module.exports = router;