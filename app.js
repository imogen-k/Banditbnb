'use strict';

var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
var app = express();
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUnintialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

app.use(bodyParser.json());
app.set('view engine', 'ejs');
var port = 3000;

var Property = require('./lib/propertySchema.js');
const User = require('./lib/userSchema.js');

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {});

app.get('/', function (req, res) {
  Property.find({}, function (err, properties) {
    app.use(express.static(__dirname + '/images'));
    app.use(express.static(__dirname + '/views'));
    res.render('landingPage', { properties: properties, user: req.user });
  });
});

app.get('/booking/:id', function (req, res) {
  app.use(express.static(__dirname + '/images'));
  app.use(express.static(__dirname + '/views'));
  Property.findById(req.params.id, function (err, property) {
    res.render('booking.ejs', {
      property: property,
    });
  });
});

app.post('/booking/:id', function (req, res) {
  const { user_start_date, user_end_date } = req.body;
  Property.findById(req.params.id, function (err, property) {
    let errors = [];
    if (
      user_start_date >= property.start_date &&
      user_end_date <= property.end_date
    ) {
      res.render('booking', {
        user_start_date: user_start_date,
        user_end_date: user_end_date,
        property: property,
      });
      req.flash('success_msg', 'Property available to book for your dates!');
    } else {
      errors.push({ msg: 'This property is not available for these dates' });
      res.render('booking', {
        user_start_date: user_start_date,
        user_end_date: user_end_date,
        property: property,
        errors: errors,
      });
    }
  });
});

app.get('/booking/confirmation', function (req, res) {
  res.render('bookingConfirmation.ejs');
});

app.get('/register', function (req, res) {
  app.use(express.static(__dirname + '/images'));
  app.use(express.static(__dirname + '/views'));
  res.render('register');
});

app.post('/register', function (req, res) {
  app.use(express.static(__dirname + '/images'));
  app.use(express.static(__dirname + '/views'));
  const { name, email, password, password2 } = req.body;
  let errors = [];
  console.log(' Name: ' + name + ' email :' + email + ' pass:' + password);
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all of the fields.' });
  }
  //check if match
  if (password !== password2) {
    errors.push({ msg: "Passwords don't match." });
  }

  //check if password is more than 6 characters
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters.' });
  }
  if (errors.length > 0) {
    res.render('register-property', {
      errors: errors,
      name: name,
      email: email,
      password: password,
      password2: password2,
    });
  } else {
    //validation passed
    User.findOne({ email: email }).exec((err, user) => {
      console.log(user);
      if (user) {
        errors.push({ msg: 'Email already associated with an account.' });
        res.render('register', { errors, name, email, password, password2 });
      } else {
        const newUser = new User({
          name: name,
          email: email,
          password: password,
        });
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //save pass to hash
            newUser.password = hash;
            //save user
            newUser
              .save()
              .then((value) => {
                console.log(value);
                req.flash('success_msg', 'Registration complete!');
                res.redirect('/login');
              })
              .catch((value) => console.log(value));
          })
        );
      } //ELSE statement ends here
    });
  }
});

app.get('/login', function (req, res) {
  app.use(express.static(__dirname + '/images'));
  app.use(express.static(__dirname + '/views'));
  res.render('login');
});

app.post('/login', function (req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
});

app.get('/register-property', function (req, res) {
  app.use(express.static(__dirname + '/images'));
  app.use(express.static(__dirname + '/views'));
  res.render('register-property');
});

app.post('/register-property', function (req, res) {
  const {
    name,
    address,
    description,
    ppn,
    contact,
    start_date,
    end_date,
  } = req.body;
  let errors = [];
  if (
    !name ||
    !address ||
    !description ||
    !ppn ||
    !contact ||
    !start_date ||
    !end_date
  ) {
    errors.push({ msg: 'Please fill in all of the fields.' });
  }
  if (errors.length > 0) {
    res.render('register-property', {
      errors: errors,
      name: name,
      address: address,
      description: description,
      ppn: ppn,
      contact: contact,
      start_date: start_date,
      end_date: end_date,
    });
  } else {
    const newProperty = new Property({
      name: name,
      address: address,
      description: description,
      ppn: ppn,
      contact: contact,
      start_date: start_date,
      end_date: end_date,
    });

    newProperty.save().then((value) => {
      console.log(value);
      res.redirect('/');
    });
  }
});

app.get('/logout', function (req, res) {
  req.logout();
  req.flash('success_msg', "You've been logged out");
  res.redirect('/');
});

app.listen(port);
