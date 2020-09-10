const mongoose = require('mongoose'); 
var PropertySchema = require('./propertySchema.js');

class Property {
  constructor(name, address, description, ppm, contact, availability, date_available_from, date_available_to) {
    this.name = name
    this.address = address 
    this.description = description
    this.ppm = ppm 
    this.contact = contact 
    this.availability = availability
    this.date_available_from = date_available_from
    this.date_available_to = date_available_to
  }

  new() {
    new Property(
      name,
      address,
      description,
      ppm,
      contact,
      availability,
      date_available_from,
      date_available_to
    );
  }

  all() {
    mongoose.connect('mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority', {useNewUrlParser: true});
    const db = mongoose.connection;
     var all = PropertySchema.find({},function(err,docs){
      });
  

  }
}