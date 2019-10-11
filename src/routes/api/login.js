const puppet = require('./../../logic/puppet');
// const facade = require('./../../logic/facade');
// const facade = require('../../logic/facade');
const facade = require('../../logic/facade');

const router = require('express').Router();
const fs     = require('fs');

router.post('', async (req, res, next) => {
    const source = req.body.source;
    const username = req.body.username;
    const password = req.body.password;
    const usernameId = req.body.usernameId;
    const passwordId = req.body.passwordId;
    const buttonLoginId = req.body.buttonLoginId;
    const promise = puppet().login(source, username, password, usernameId, passwordId, buttonLoginId);
    promise
    .catch((err) => {
        const error = new Error(err);
        res.json(error);
    })
    .then((data) => {
        let now = new Date();
        now = now.toString();
        const cookies= data.cookies;

        fs.writeFile(`./assets/sessions/${now}.json`, JSON.stringify(cookies),(err) => {
            if (err) { throw(err); }
        });

        res.json({ '_data': data})
    });
    
});

router.get('/redirect', async (req, res, next) => {
    const source = req.body.source;
    const promise = puppet.redirect(source);
    promise
    .catch((err) => {
        res.send(err);
    })
    .then((data) => {
        res.json({'_data': {'current_url': data}});
    });
});



router.post('/facade', async (req, res, next) => {
    const source = req.body.source;
    const username = req.body.username;
    const password = req.body.password;
    const usernameId = req.body.usernameId;
    const passwordId = req.body.passwordId;
    const buttonLoginId = req.body.buttonLoginId;
    try {
        const promise = facade().login(source, username, password, usernameId, passwordId, buttonLoginId);
        promise
        .catch((err) => {
            const error = new Error(err);
            res.json(error);
        })
        .then((data) => {
            console.log('/login/facade');
            let now = new Date();
            now = now.toString();
            console.log('cookies');
            console.log(data);
            const cookies= data.cookies;    
            fs.writeFile(`./assets/sessions/${now}.json`, JSON.stringify(cookies),(err) => {
                if (err) { throw(err); }
            });
    
            res.json({ '_data': data})
        });
    } catch(err) {
        console.log('fucked!!!!');
        console.log(err.message);
        throw new Error('Oops! 404');
    }
    
});

router.get('/redirect/facade', async (req, res, next) => {
    const source = req.body.source;
    const promise = puppet.redirect(source);
    promise
    .catch((err) => {
        res.send(err);
    })
    .then((data) => {
        res.json({'_data': {'current_url': data}});
    });
});


module.exports = router;