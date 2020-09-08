var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var port = 3000
var path = require('path')
var PropertySchema = require('./propertySchema.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

})


app.get('/', function (req, res) {
  var a=32
  app.use(express.static(__dirname + '/images'));
  res.render('landingPage', { a:a})



});

app.listen(port);
