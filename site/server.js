const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();

app.use(express.static(__dirname + 'public'))

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
})

app.use('/', router);

module.exports = app;