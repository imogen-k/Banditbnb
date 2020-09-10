"use strict";

var path = require('path');

var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var port = 3000

var PropertySchema = require('./lib/propertySchema.js');
var Property = require('./lib/property.js')


const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

})



app.get('/', function (req, res) {
  function renderLandingPage(all) {
    console.log(all);
    app.use(express.static(__dirname + '/images'));
    app.use(express.static(__dirname + '/views'));
    res.render('landingPage', { all: all });
  }
  const all = Property.all(renderLandingPage)



});

app.listen(port);
