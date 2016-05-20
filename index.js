var express = require('express');
var pug = require('pug');

var config = require('./config');
var mutual = require('./mutual');

var app = express();

app.use('/static', express.static('static'));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', config);
});

app.get('/request', (req, res) => {
    console.log('Trying to add: ' + req.query.id);
    mutual.mutual(req.query.id, res);
})

mutual.login(config.username, config.password);
app.listen(8080);

