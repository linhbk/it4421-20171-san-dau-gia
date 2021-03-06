const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productHistories = new schema({
  productId: String,
  histories: [{
    username: String,
    price: Number,
    time: Date
  }],
  maxPrice: Number,
});

module.exports = mongoose.model('productHistories', productHistories);
