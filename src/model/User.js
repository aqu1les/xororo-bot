const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    xesques: Number,
    brabas: Number
});
export const User = mongoose.model('user', UserSchema);