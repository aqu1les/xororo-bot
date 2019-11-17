const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    xesques: Number,
    brabas: Number
});
module.exports = mongoose.model('user', UserSchema);