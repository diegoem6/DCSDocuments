const mongoose = require('mongoose');

const TagDescriptorSchema = mongoose.Schema({
    tagname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    system:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'System'
    },
    createddate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('TagDescriptor',TagDescriptorSchema)