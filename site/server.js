const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const exphbs = require('express-handlebars');
const router = express.Router();
const session = require('express-session');
const FormData = require('form-data');

const data = new FormData();


app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(session({
	secret: process.env.SECRET,
	resave: true,
	saveUninitialized: true
}));


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


router.get('/dashboard/login/', (req, res) => {
  res.redirect('https://discord.com/api/oauth2/authorize?client_id=705484773505761280&redirect_uri=https%3A%2F%2Fglitch-bot-development--marijnkneppers.repl.co%2Fdashboard%2Fcallback&response_type=code&scope=identify%20guilds')
})

router.get('/dashboard/callback', (req, res) => {
  data.append('client_id', '705484773505761280');
  data.append('client_secret', '74kOyMAxo3hg7SF99mHwdcx1lGAn99UT');
  data.append('grant_type', 'authorization_code');
  data.append('scope', 'identify guilds');
  data.append('redirect_uri', 'https://oauthtest--007whitetiger.repl.co/callback/')
  data.append('code', req.query.code);

  fetch('https://discordapp.com/api/oauth2/token', {
      method: 'POST',
      body: data,
  }).then(res => res.json()).then(data => {
    req.session.loggedin = true
    req.session.token = data['access_token']
    
    res.redirect('/dashboard')
  })
})

router.get('/dashboard/', (req, res) => {
  if(req.session.loggedin) {
    console.log(req.session.token)
    
    fetch('https://discordapp.com/api/users/@me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${req.session.token}` },
    })
    
    
  } else {
    res.status(403)
    res.write("<h1>You are not logged in! <a href = /dashboard/login>Click here to login</a></h1>")
    res.end()
  }
})



app.use('/', router);

module.exports = app;