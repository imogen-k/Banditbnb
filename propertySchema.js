const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
name: String,
address: String,
description: String,
ppn: Number,
contact: String,
availability: Boolean,
date_available_from: String,
date_available_to: String
})

const PropertySchema = mongoose.model('properties', propertySchema);

module.exports = PropertySchema
// const villa = new Property({
//   name: 'Villa', address: '124 cool kids lane', description: 'Cool villa for cool kids', 
// ppn: 234.55, contact: 'coolkidz@cool.com', availability: true });
//   console.log(villa.name);

//   villa.save(function (err, villa) {
//     if (err) return console.error(err);
//     console.log(villa.name);
//   });

//   export { Property };

