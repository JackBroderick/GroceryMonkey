'use strict';

const sls = require('serverless-http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

console.log(__dirname);

app.use(express.static(path.join(__dirname,'./build')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    console.log(path.join(__dirname + '/build/index.html'));
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports.html = sls(app);