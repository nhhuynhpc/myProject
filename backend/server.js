var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodeParser = bodyParser.urlencoded({ extended: false });

const authRoute = require('./routes/auth.Routes');
const titleRoute = require('./routes/title.Routes');
const categoriesRoute = require('./routes/categories.Routes')
const productsRoute = require('./routes/product.Routes')
const cartRoute = require('./routes/cart.Routes')
const cartDetailRoute = require('./routes/cartDetail.Routes')
const searchRoute = require('./routes/search.Routes')
const orderRoute = require('./routes/order.Routes')
const orderDetailRoute = require('./routes/orderdetail.Routes')

app.use(cors({
  origin: '*'
}))
  app.use(express.json());
  app.use('/api/v1/auth', jsonParser, urlencodeParser, authRoute);

  app.use('/api/v1/title', jsonParser, urlencodeParser, titleRoute);

  app.use('/api/v1/categories', jsonParser, urlencodeParser, categoriesRoute);

  app.use('/api/v1/product', jsonParser, urlencodeParser, productsRoute);

  app.use('/api/v1/cart', jsonParser, urlencodeParser, cartRoute);

  app.use('/api/v1/cart-detail', jsonParser, urlencodeParser, cartDetailRoute);

  app.use('/api/v1/search', jsonParser, urlencodeParser, searchRoute);

  app.use('/api/v1/order', jsonParser, urlencodeParser, orderRoute);

  app.use('/api/v1/order-detail', jsonParser, urlencodeParser, orderDetailRoute);

  app.use(express.static('uploads'))

  app.listen(8080, function () {
  console.log('CORS-enabled web server listening on port 8080')
  })