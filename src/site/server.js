const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const app = express();
app.use(require("helmet")());
const exphbs = require("express-handlebars");
const router = new express.Router();
const session = require("express-session");
const FormData = require("form-data");

let data = new FormData();

async function getUser(token) {
    let response = await fetch("https://discordapp.com/api/users/@me", {
        method: "GET",
        headers: {"Authorization": `Bearer ${token}` }
    });
    data = await response.json();
    setTimeout(3000);
    //verwijder data; als je er iets mee gaat doen
    console.log(data);

}


app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/routes/index.html"));
});

router.get("/home/", (req, res) => {
    res.sendFile(path.join(__dirname + "/routes/index.html"));
});

router.get("/about/", (req, res) => {
    res.sendFile(path.join(__dirname + "/routes/about.html"));
});

router.get("/discord/", (req, res) => {
    res.sendFile(path.join(__dirname + "/routes/discord.html"));
});

router.get("/stats/", (req, res) => {
    res.render(__dirname + "/views/stats.handlebars", { layout: false });
});


router.get("/dashboard/login/", (req, res) => {
    res.redirect(process.env.OAUTH_URL);
});

router.get("/dashboard/callback", (req, res) => {
    data.append("client_id", process.env.CLIENT_ID);
    data.append("client_secret", process.env.CLIENT_SECRET);
    data.append("grant_type", "authorization_code");
    data.append("scope", "identify guilds");
    data.append("redirect_uri", process.env.REDIRECT_URL);
    data.append("code", req.query.code);

    fetch("https://discordapp.com/api/oauth2/token", {
        method: "POST",
        body: data,
    }).then((loginRes) => res.json()).then((loginData) => {
        req.session.loggedin = true;
        let auth = loginData;
        req.session.token = auth["access_token"];

        loginRes.redirect("/dashboard");
    });
});

router.get("/dashboard/", (req, res) => {
    if (req.session.loggedin) {

        let response = getUser(req.session.token);
        //verwijder response; als je er iets mee gaat doen
        console.log(response);
        res.sendFile(path.join(__dirname + "/routes/dashboard.html"));



    } else {
        res.status(403);
        res.write("<h1>You are not logged in! <a href = /dashboard/login>Click here to login</a></h1>");
        res.end();
    }
});

app.use("/", router);
app.listen(2020);

module.exports = app;