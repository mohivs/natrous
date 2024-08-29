const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'please tell us youre name'] },
  email: {
    type: String,
    unique: true,
    required: [true, 'please provide youre email'],
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'please chose a password'],
    select: true,
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm youre password'],
    validate: {
      // this only works on save & create
      validator: function (value) {
        return this.password === value;
      },
      message: 'passwords are not the same',
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
