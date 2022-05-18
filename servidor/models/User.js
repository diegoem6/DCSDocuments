const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    rol: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        default: "INACTIVE",
    },
    createddate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User',UserSchema)