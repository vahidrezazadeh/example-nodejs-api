const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('users', UserSchema);
