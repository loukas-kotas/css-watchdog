const router = require('express').Router();
const puppet = require('../../logic/puppet');
const errorHandler = require('./error-handler.controller');

let module = (function() {

    function getScreenshotOfDomain(source) {
        const promise = puppet.getScreenshot(source);
        promise
        .catch((err) => {
            const error = errorHandler().handleError(err);
            res.json(error);
        })
        .then((data) => {
            res.json({'_data': 'Screenshot Saved Successfully!'});
        });
    
    }

    function getScreenshotOfElementOfSpecificDomain(source, elementId) {
        const promise = puppet.getScreenshotOfElement(source, elementId);
        promise
        .catch((err) => {
            const error = errorHandler().handleError(err);
            res.json(error);
        })
        .then((data) => {
            res.json({'_data': `Screenshot of element '${elementId}' saved successfully!`})
        });    
    }

    function compareTwoImages(sourceImagePath, targetImagePath) {
        const promise = puppet.compareScreenshots();
        promise
        .catch((err) => {
            const error = errorHandler().handleError(err);
            res.json(error);
        })
        .then((data) => {
            (data > 0)? diff_message = 'Pages differ!' : diff_message = 'Pages are the same!';  
            const promise = new Promise(resolve(data));
            const promise = new Promise(resolve({'diff_message': diff_message, 'different_pixels': data.different_pixels, 'threshold': data.threshold}));
            return promise;
        });    
    }


    // facade
    return {

        domain: function(source) {
            const promise = getScreenshotOfDomain(source); 
            return promise;
        },

        element: function(source, elementId) {
            const promise = getScreenshotOfElementOfSpecificDomain(source, elementId);
            return promise;
        },

        compare: function(sourceImagePath, targetImagePath) {
            const promise = compareTwoImages(sourceImagePath, targetImagePath);
            return promise;
        }

    } 
});


module.exports = module;