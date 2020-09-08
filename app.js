var express = require('express');
var app = express();
var port = 3000
var path = require('path')


app.get('/', function (req, res) {
  app.use(express.static(__dirname + '/images'));
  res.sendFile(path.join(__dirname + '/routes/landingPage.html'))
});

app.listen(port);