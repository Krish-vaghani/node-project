require('dotenv').config()
require('./config/db')
const express = require('express')  
const app = express()
const port = process.env.PORT || 5555
var cors = require('cors')
const studentRouter = require("./router/student");
const userRouter = require("./router/user");
const product = require('./router/product')
const buyproduct = require('./router/buyproduct')
const buyproducthistory = require('./router/buyproducthistory')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./Swager/krish.postman_collection.json-OpenApi3Json.json');
const { errorhandle } = require('./utils/error')


app.use(express.static('public'));

//FOR ejs
app.set('view engine', 'ejs');
app.get('/', (req, res) => { 
  res.render('home',{ name: 'abc' }); 
});
app.get('/dashboard', (req, res) => { 
  res.render('dashboard'); 
});


app.use(cors());
app.use(express.json());

// for swaggerUi
var options = {
  explorer: true
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
app.use('/api', studentRouter)
app.use('/user', userRouter)
app.use('/product', product)
app.use('/buyproduct', buyproduct)
app.use('/producthistory', buyproducthistory)
// app.use(errorhandle)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});