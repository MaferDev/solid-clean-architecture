var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

let validRoles = {
  values: ['USER_ROLE', 'SUPER_ROLE', 'ADMIN_ROLE'],
  message: 'Error, expected {PATH} is not valid.'
};

var userSchema = new Schema({
  id: { type: String, required: [true, ' Id is required'] },
  name: { type: String, required: [true, ' Name is required'] },
  email: { type: String, unique: true, required: [true, ' Email is required'] },
  password: { type: String, required: [true, ' Password is required'] },
  phone: { type: String, required: [true, ' phone is required'] },
  img: { type: String, required: [true, ' img is required'] },
  role: { type: String, enum: validRoles, required: true, default: 'USER_ROL' }
});

userSchema.plugin(uniqueValidator, {
  message: 'Error, expected {PATH} to be unique.'
});

module.exports = mongoose.model('User', userSchema);
