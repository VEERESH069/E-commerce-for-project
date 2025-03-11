const mongoose = require('mongoose');

// Define Order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: Number,
    },
  ],
  address: {
    street: String,
    city: String,
    postalCode: String,
    country: String,
  },
  totalAmount: Number,
  status: { type: String, default: 'pending' }, // Order status
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
