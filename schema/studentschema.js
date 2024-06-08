const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    role:{
        type:String,
        default: 'user'
    },
    otp:{
        type:Number,
    },
    referID:{
        type:String
    }
})

const studentschemaexport = mongoose.model('signup', studentSchema);
module.exports = studentschemaexport;