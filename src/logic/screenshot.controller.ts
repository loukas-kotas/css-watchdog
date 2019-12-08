import { Router } from 'express';
import { PuppetModule } from './puppet.module';
import { ErrorHandler } from './error-handler.controller';

// const router = require('express').Router();
// const puppet = require('../../logic/puppet');
// const errorHandler = require('./error-handler.controller');

export class ScreenshotController {

    getScreenshotOfDomain(source: string) {
        // const promise = puppet.getScreenshot(source);
        // promise
        // .catch((err: any) => {
        //     const error = new ErrorHandler().handleError(err);
        //     res.json(error);
        // })
        // .then((data: any) => {
        //     res.json({'_data': 'Screenshot Saved Successfully!'});
        // });
    
    }

    getScreenshotOfElementOfSpecificDomain(source: string, elementId: string) {
        // const promise = puppet.getScreenshotOfElement(source, elementId);
        // promise
        // .catch((err: any) => {
        //     const error = new ErrorHandler().handleError(err);
        //     res.json(error);
        // })
        // .then((data) => {
        //     res.json({'_data': `Screenshot of element '${elementId}' saved successfully!`})
        // });    
    }

    compareTwoImages(sourceImagePath: string, targetImagePath: string) {
        // const promise = puppet.compareScreenshots();
        // promise
        // .catch((err) => {
        //     const error = new ErrorHandler().handleError(err);
        //     res.json(error);
        // })
        // .then((data) => {
        //     (data > 0)? diff_message = 'Pages differ!' : diff_message = 'Pages are the same!';  
        //     const promise = new Promise(resolve(data));
        //     const promise = new Promise(resolve({'diff_message': diff_message, 'different_pixels': data.different_pixels, 'threshold': data.threshold}));
        //     return promise;
        // });    
    }


}