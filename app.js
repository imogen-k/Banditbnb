var express = require('express');
var app = express();
var port = 3000
var path = require('path')



const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority', {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

})


app.get('/', function (req, res) {
  import { Property } from './property.js'
  const villa = new Property({ name: 'Villa', address: '124 cool kids lane', description: 'Cool villa for cool kids', 
ppn: 234.55, contact: 'coolkidz@cool.com', availability: true });
  console.log(villa.name);

  villa.save(function (err, villa) {
    if (err) return console.error(err);
    console.log(villa.name);
  });
  app.use(express.static(__dirname + '/images'));
  res.sendFile(path.join(__dirname + '/routes/landingPage.html'))
});

app.listen(port);