"use strict";

var path = require('path');

var express = require('express');
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
var port = 3000

var PropertySchema = require('./lib/propertySchema.js');
var Property = require('./lib/property.js')
const User = require('./lib/userSchema.js')


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

app.get('/register', function (req, res) {
  res.render('register');
})

app.post('/register', function (req, res) {
  const {name, email, password, password2} = req.body;
  let errors = [];
  console.log(' Name: ' + name+ ' email :' + email+ ' pass:' + password);
  if(!name || !email || !password || !password2) {
        errors.push({msg : "Please fill in all of the fields."})
    }
    //check if match
    if(password !== password2) {
        errors.push({msg : "Passwords don't match."});
    }

    //check if password is more than 6 characters
    if(password.length < 6 ) {
        errors.push({msg : 'Password must be at least 6 characters.'})
    }
    if(errors.length > 0 ) {
    res.render('register', {
        errors : errors,
        name : name,
        email : email,
        password : password,
        password2 : password2})
    } else {
        //validation passed
      User.findOne({email : email}).exec((err,user)=>{
        console.log(user);   
        if(user) {
            errors.push({msg: 'Email already associated with an account.'});
            render(res,errors,name,email,password,password2);
            
          } else {
            const newUser = new User({
                name : name,
                email : email,
                password : password
            });
          bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(newUser.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                    //save pass to hash
                    newUser.password = hash;
                    //save user
                    newUser.save()
                    .then((value)=>{
                        console.log(value)
                    res.redirect('/users/login');
                    })
                    .catch(value=> console.log(value));
                      
                }));
             } //ELSE statement ends here
          });
  };
});

  app.get('/login', function (req, res) {
    res.render('login');
  })

  app.post('/login', function (req, res, next) {
    
  })

  app.get('/logout', function (req, res) {
    
  })




app.listen(port);
