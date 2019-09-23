const router = require('express').Router();
const puppet = require('../../logic/puppet');

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



module.exports = router;