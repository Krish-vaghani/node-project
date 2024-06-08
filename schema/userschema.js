const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/magesDB"); 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        required: true
    },
    userId:{
        type: String,
        defaut : "A0"
    }
})

const user = new mongoose.model("users", userSchema)
module.exports = user