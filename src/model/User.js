const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    xesques: { type: Number, default: 0 },
    brabas: { type: Number, default: 0 },
    cus_comidos: { type: Array, default: [] }
});

module.exports = mongoose.model('user', UserSchema);