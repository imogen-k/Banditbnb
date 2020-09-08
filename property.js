const mongoose = require('mongoose'); 
var PropertySchema = require('./propertySchema.js');

class Property {
  constructor(name, address, description, ppm, contact, availability) {
    this.name = name
    this.address = address 
    this.description = description
    this.ppm = ppm 
    this.contact = contact 
    this.availability = availability
  }

  new() {
    new Property(name, address, description, ppm, contact, availability)
  }

  all() {
    mongoose.connect('mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority', {useNewUrlParser: true});
    const db = mongoose.connection;
     var all = PropertySchema.find({},function(err,docs){
      });
  

  }
}