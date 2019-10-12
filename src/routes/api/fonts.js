const router = require('express').Router();
const puppet = require('../../logic/puppet');
const facade = require('../../logic/facade');
const errorHandler = require('../../logic/error-handler.controller');

 router.get('', async (req, res, next) => {
    const source = req.body.source;
    const promise = puppet.getFonts(source);
    promise
    .catch((err) => {
        res.send(err);
    })
    .then((data) => {
        res.json({ '_data': data})
        // puppet.closeBrowser();
    });
    
})

router.get('/facade', async (req, res, next) => {
    const source = req.body.source;
    const promise = facade().get_fonts(source);
    console.log('promise');
    console.log(promise);
    promise
    .catch((err) => {
        const error = errorHandler().handleError(err);
        res.send(error);        
    })
    .then((data) => {
        console.log('data');
        console.log(data);
        if(!data) {
            res.json({'_data': 'undefined data'})
        } else {
            res.json({'_data': data});
        }

    });
})



module.exports = router;