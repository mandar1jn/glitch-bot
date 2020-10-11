const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const exphbs = require('express-handlebars');
const router = express.Router();
const session = require('express-session');
const FormData = require('form-data');

const data = new FormData();
var auth = null;
var response = null;

async function getUser(token) {
    let response = await fetch("https://discordapp.com/api/users/@me", {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    let data = await response.json();
    setTimeout(3000);
    //verwijder data; als je er iets mee gaat doen
    console.log(data);

}


app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/routes/index.html'));
});

router.get('/home/', (req, res) => {
    res.sendFile(path.join(__dirname + '/routes/index.html'));
});

router.get('/about/', (req, res) => {
    res.sendFile(path.join(__dirname + '/routes/about.html'));
});

router.get('/discord/', (req, res) => {
    res.sendFile(path.join(__dirname + '/routes/discord.html'));
});

router.get('/stats/', (req, res) => {
    res.render(__dirname + '/views/stats.handlebars', { layout: false })
});


router.get('/dashboard/login/', (req, res) => {
    res.redirect(process.env.OAUTH_URL)
});

router.get('/dashboard/callback', (req, res) => {
    data.append('client_id', process.env.CLIENT_ID);
    data.append('client_secret', process.env.CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('scope', 'identify guilds');
    data.append('redirect_uri', process.env.REDIRECT_URL)
    data.append('code', req.query.code);

    fetch('https://discordapp.com/api/oauth2/token', {
        method: 'POST',
        body: data,
    }).then((res) => res.json()).then((data) => {
        req.session.loggedin = true
        auth = data
        req.session.token = auth['access_token']

        res.redirect('/dashboard')
    });
});

router.get('/dashboard/', (req, res) => {
    if (req.session.loggedin) {

        response = getUser(req.session.token);
        //verwijder response; als je er iets mee gaat doen
        console.log(response);
        res.sendFile(path.join(__dirname + '/routes/dashboard.html'));



    } else {
        res.status(403);
        res.write("<h1>You are not logged in! <a href = /dashboard/login>Click here to login</a></h1>");
        res.end();
    }
});

app.use('/', router);

var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 5
});
app.use(limiter);

module.exports = app;