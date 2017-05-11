const db = require('./db/main.js');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const Router = require('router');
const router = new Router(app);

app.listen(8080);

console.log('Server running on port 8080');

