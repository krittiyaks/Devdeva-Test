const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    gender: {
        required: false,
        type: String
    },
    birthdate: {
        required: false,
        type: String
    },
    image: {
        required: false,
        type: Buffer
    }
})

module.exports = mongoose.model('User', userSchema)