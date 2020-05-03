const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const router = express.Router();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/home/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

router.get('/about/', (req, res) => {
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/discord/', (req, res) => {
  res.sendFile(path.join(__dirname+'/discord.html'));
});

router.get('/stats/', (req, res) => {
  res.render(__dirname+'/views/stats.handlebars', {layout: false})
});

router.get('/dashboard/', (req, res) => {
  res.sendFile(path.join(__dirname+'/dashboard.html'));
});

app.use('/', router);

module.exports = app;