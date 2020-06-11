const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    googleId: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model('user', User);