const mongoose = require('mongoose'); 
var PropertySchema = require('./propertySchema.js');
console.log('hello peeps')

class Property {
  // constructor(name, address, description, ppm, contact, availability) {
  //   this.name = name
  //   this.address = address 
  //   this.description = description
  //   this.ppm = ppm 
  //   this.contact = contact 
  //   this.availability = availability
  // }

  // new() {
  //   new Property(name, address, description, ppm, contact, availability)
  // }

  static all(callback) {
    mongoose.connect('mongodb+srv://fraser:Zhe3ren3@banditbnb.1nsfl.mongodb.net/BanditBnB?retryWrites=true&w=majority', {useNewUrlParser: true});
    const db = mongoose.connection;
    PropertySchema.find({}, function (err, docs) {
      callback(docs)
    });
  }
}

module.exports = Property;
 
