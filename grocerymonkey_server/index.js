'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');

process.env.ROOT = path.join(__dirname, "/");

const dbfile = path.join(process.env.ROOT + 'data/grocerymonkey.db');
const app = express();

app.use(helmet());
app.use(express.static('./build', { index: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const keys = {
    shared_key: 13371,
    private_key: 17771,
};

const http = require('http').Server(app);
const https = require('https');
const fs = require('fs');
const db = require('./source/database.js');
const createUser = require('./source/userendpoints').createUser;
const updateUser = require('./source/userendpoints').updateUser;
const authenticateUser = require('./source/userendpoints').authenticateUser;
const deleteUser = require('./source/userendpoints').deleteUser;
const getUsers = require('./source/userendpoints').getUsers;
const createGroceryListItem = require('./source/grocerylistendpoints').createGroceryListItem;
const updateGroceryListItem = require('./source/grocerylistendpoints').updateGroceryListItem;
const updateGroceryItem = require('./source/grocerylistendpoints').updateGroceryItem;
const deleteGroceryItem = require('./source/grocerylistendpoints').deleteGroceryItem;
const deleteGroceryListItem = require('./source/grocerylistendpoints').deleteGroceryListItem;
const getEmojiLookup = require('./source/grocerylistendpoints').getEmojiLookup;
const createEmojiLookup = require('./source/grocerylistendpoints').createEmojiLookup;
const deleteEmojiLookup = require('./source/grocerylistendpoints').deleteEmojiLookup;
const getMonkeyData = require('./source/getmonkeydata').getMonkeyData;
const updateMonkeyData = require('./source/getmonkeydata').updateMonkeyData;
const sendNotifications = require('./source/notifications').sendNotifications;
const getBananaWinnerHistory = require('./source/userendpoints').getBananaWinnerHistory;
const getBananaMoochHistory = require('./source/userendpoints').getBananaMoochHistory;
const updateUserSelfie = require('./source/fileendpoints').updateUserSelfie;
const getConfigInfo = require('./source/userendpoints').getConfigInfo;
const updateConfigInfo = require('./source/userendpoints').updateConfigInfo;
const updateGroceryItemStatus = require('./source/grocerylistendpoints').updateGroceryItemStatus;
const sqlDB = new db(dbfile);


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


app.get('/', function (req, res) {
    function checkEnv() {
        if (fs.existsSync(process.env.ROOT + "public")) {
            return "public/index.html";
        } else {
            return "build/index.html";
        }
    }
    console.log('HTTP GET ' + path.join(process.env.ROOT + 'build/index.html'));
//  res.sendFile(path.join(process.env.ROOT + 'build/index.html'));

    fs.readFile(path.join(process.env.ROOT + checkEnv()), 'utf8', (error, data) => {
        function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
        }

        if (error) {
            res.status(404).send('Cannot find requested page')
        } else {
            let htmlResponse = data;
            let m_auth_number = parseInt(req.query.m_auth);
            if (m_auth_number>keys.private_key) {
                console.log("Attempting authentication with m_auth: " + m_auth_number.toString());
                let m_auth_new = ((m_auth_number % keys.private_key) + (keys.shared_key * getRandomInt(25))).toString();
                htmlResponse = htmlResponse.replace("#PIN#", m_auth_new);
            }

            res.send(htmlResponse);
        }
    })

});

app.post('/endpoints/createuser', function (request, response) {
    createUser(sqlDB, request.body, (err) => {
        err ? response.json({ success: false, error: err.message })
            : response.json({ success: true, error: null });
    })
});

app.post('/endpoints/authenticateuser', function (request, response) {
    authenticateUser(sqlDB, request.body, (err, data) => {
        err ? response.json({ success: false, error: err.message, user: {} })
            : response.json({ success: true, error: null, user: data[0] });
    })
});

app.put('/endpoints/updateuser', function (request, response) {
   updateUser(sqlDB, request.body, (err, data) => {
        err ? response.json({ success: false, error: err.message })
            : response.json({ success: true, error: null, user: data });
    })
});

app.delete('/endpoints/deleteuser', function (request, response) {
    deleteUser(sqlDB, request.body, (err) => {
        err ? response.json({ success: false, error: err.message })
            : response.json({ success: true, error: null });
    })
});

app.post('/endpoints/creategrocerylistitem', function (request, response) {
    createGroceryListItem(sqlDB, request.body, (err) => {
        err ? response.json({ success: false, error: err.message })
            : response.json({ success: true, error: null });
    })
});

app.put('/endpoints/updategrocerylistitem', function (request, response) {
    updateGroceryListItem(sqlDB, request.body, (err) => {
        err ? response.json({ success: false, error: err.message })
            : response.json({ success: true, error: null });
    })
});

app.delete('/endpoints/deletegrocerylistitem', function (request, response) {
    deleteGroceryListItem(sqlDB, request.body, (err) => {
        err ? response.json({ success: false, error: err.message })
            : response.json({ success: true, error: null });
    })
});

app.post('/endpoints/getmonkeydata', function (request, response) {
    getMonkeyData(sqlDB, (err, data) => {
        err ? response.json({ success: false, error: err.message, data: {} })
            : response.json({ success: true, error: null, data:data });
    })
});

app.put('/endpoints/updatemonkeydata', function (request, response) {
    updateMonkeyData(sqlDB, request.body.monkeyData, (err) => {
        if (err) {
            response.json({ success: false, error: err.message });
        } else {
            new sendNotifications(sqlDB, request.body);
            response.json({ success: true, error: null });
        }
    })
});

app.post('/endpoints/getbananawinnerhistory', function (request, response) {
    getBananaWinnerHistory(sqlDB, (err, data) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: data });
    })
})

app.post('/endpoints/getbananamoochhistory', function (request, response) {
    getBananaMoochHistory(sqlDB, (err, data) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: data });
    })
})

app.post('/endpoints/updateuserselfie', function (request, response) {
    updateUserSelfie(request.body, (err) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: null });
    })
})

app.post('/endpoints/getusers', function (request, response) {
    getUsers(sqlDB, (err, data) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: data });
    })
})


app.post('/endpoints/getconfiginfo', function (request, response) {
    getConfigInfo(sqlDB, (err, data) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: data[0] });
    })
})

app.put('/endpoints/updateconfiginfo', function (request, response) {
    updateConfigInfo(sqlDB, request.body, (err) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: null });
    })
})


app.put('/endpoints/updategroceryitem', function(request, response){
    updateGroceryItem(sqlDB, request.body, (err) => {
        err ? response.json({ success:false }) : response.json({success:true})
    })
})

app.delete('/endpoints/deletegroceryitem', function (request, response) {
    deleteGroceryItem(sqlDB, request.body, (err) => {
        err ? response.json({ success: false }) : response.json({ success: true })
    })
})

app.post('/endpoints/getemojilookup', function (request, response) {
    getEmojiLookup(sqlDB, (err, data) => {
        err ? response.json({ success: false, error: err.message, data: null })
            : response.json({ success: true, error: null, data: data });
    })
})

app.put('/endpoints/createemojilookup', function (request, response) {
    createEmojiLookup(sqlDB, request.body, (err) => {
        err ? response.json({ success: false }) : response.json({ success: true })
    })
})

app.delete('/endpoints/deleteemojilookup', function (request, response) {
    deleteEmojiLookup(sqlDB, request.body, (err) => {
        err ? response.json({ success: false }) : response.json({ success: true })
    })
})

app.put('/endpoints/updategroceryitemstatus', function (request, response) {
    updateGroceryItemStatus(sqlDB, request.body, (err) => {
        err ? response.json({ success: false }) : response.json({success:true})
    })
})

console.log("Root Directory: " + process.env.root);

getConfigInfo(sqlDB, (err, data) => {
    let the_http_port = 8080;
    let the_https_port = null;
    if(!err){
        the_http_port = data[0].httpPort;
        the_https_port = data[0].httpsPort;
    }

    try {
        http.listen(the_http_port);
    } catch (error) {
        console.log(error.message);
        the_http_port = 8080;
        http.listen(the_http_port);
    }

    console.log('HTTP Server Running on Port ' + the_http_port);

    //Requires a key file and a cert file in the local directory
    if (the_https_port) {
        try {
            https.createServer({
                key: fs.readFileSync(process.env.ROOT + 'nodeserver.key'),
                cert: fs.readFileSync(process.env.ROOT + 'nodeserver.cert')
            }, app).listen(the_https_port, () => { console.log('HTTPS Server Running on Port ' + the_https_port) })
        } catch (error) {
            console.log(error.message);
        }
    }
})

process.on('SIGINT', (code) => {
    console.log("Grocery Monkey Server Terminating...code: " + code)
    sqlDB.close();
    console.log("Database closed");
})

process.on('exit', (code) => {
    console.log("Grocery Monkey Server Terminating...code: " + code)
    sqlDB.close();
    console.log("Database closed");
})



