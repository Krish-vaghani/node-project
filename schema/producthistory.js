const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/magesDB"); 

const buyproducthistory = new mongoose.Schema({
    product_name: {
        type: String,
    },  
    username:{
        type: String,
    }
    
    
})

const history = new mongoose.model("buyproducthistory", buyproducthistory)
module.exports = history