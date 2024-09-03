const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    select: false,
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
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    return JWTTimestamp < changedTimestamp;
  }

  // FALSE MEANS NOT CHANGED
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
