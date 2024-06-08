const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/magesDB"); 

const buyproductSchema = new mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    studentId: {
        type: String,
        require: true
    }

})

const buyproduct = new mongoose.model("buyproduct", buyproductSchema)
module.exports = buyproduct