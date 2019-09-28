const puppet    = require('./../../logic/puppet');
const router = require('express').Router();

router.post('', async (req, res, next) => {
    const source = req.body.source;
    const username = req.body.username;
    const password = req.body.password;
    const promise = puppet.login(source, username, password);
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