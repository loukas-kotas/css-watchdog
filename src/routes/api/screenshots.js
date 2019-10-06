const router = require('express').Router();
const puppet = require('../../logic/puppet');
const facade = require('../../logic/facade');


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


router.get('/element', (req, res, next) => {
    const source = req.body.source;
    const elementId = req.body.elementId;
    const promise = puppet.getScreenshotOfElement(source, elementId);
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
        res.json({'_data': `Screenshot of element '${elementId}' saved successfully!`})
    });
})

router.get('/compare', (req, res, next) => {
    const promise = puppet.compareScreenshots();
    promise
    .catch((err) => {
        const error = Error(err);
        const errResponse = {
            'message': error.message,
            'name': error.name,
            'stack': error.stack
        };
        res.json(errResponse);
    })
    .then((data) => {
        let diff_message = '';
        (data > 0)? diff_message = 'Pages differ!' : diff_message = 'Pages are the same!';  
        res.json({'_data': {'message': 'Screenshots compared successfully!', 'diff_message': diff_message, 'different_pixels': data.different_pixels, 'threshold': data.threshold }});
    });
});


router.get('/domain/facade', (req, res, next) => {
    const source = req.body.source;
    const promise = facade().screenshot_whole_page(source);
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


router.get('/element/facade', (req, res, next) => {
    const source = req.body.source;
    const elementId = req.body.elementId;
    console.log(typeof(facade));
    console.log(facade);
    const promise = facade().screenshot_element(source, elementId);
    // const promise = facade().get_fonts(source);
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
        res.json({'_data': `Screenshot of element '${elementId}' saved successfully!`})
    });
})

router.get('/compare/facade', (req, res, next) => {
    const promise = facade().compare_images();
    promise
    .catch((err) => {
        const error = Error(err);
        const errResponse = {
            'message': error.message,
            'name': error.name,
            'stack': error.stack
        };
        res.json(errResponse);
    })
    .then((data) => {
        let diff_message = '';
        (data > 0)? diff_message = 'Pages differ!' : diff_message = 'Pages are the same!';  
        res.json({'_data': {'message': 'Screenshots compared successfully!', 'diff_message': diff_message, 'different_pixels': data.different_pixels, 'threshold': data.threshold }});
    });
});


module.exports = router;