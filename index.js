let express = require('express');
let cors = require('cors');
const { resolve } = require('path');

let app = express();
app.use(cors());
const port = 3000;

// Server-side values
let taxRate = 5; // 5%
let discountPercentage = 10; // 10%
let loyaltyRate = 2; // 2 points per 1$

function calculateCartTotalPrice(newItemPrice, cartTotal) {
  let cartTotalPrice = newItemPrice + cartTotal;
  return cartTotalPrice.toString();
}

function calculateDiscountedPrice(isMember, cartTotal) {
  let discountedPrice = cartTotal;
  if (isMember == 'true') {
    discountedPrice = ((100 - discountPercentage) * cartTotal) / 100;
  }
  return discountedPrice.toString();
}

function calculateTax(cartTotal) {
  let tax = (taxRate * cartTotal) / 100;
  return tax.toString();
}

function estimateDelivery(shippingMethod, distance) {
  let estimateDelivery = 0;
  let standardRate = 50;
  let expressRate = 100;
  if (shippingMethod == 'standard') {
    estimateDelivery = distance / standardRate;
  } else if (shippingMethod == 'express') {
    estimateDelivery = distance / expressRate;
  } else {
    return 'Invalid [shippingMethod]';
  }
  return estimateDelivery.toString();
}

function calculateShippingCost(weight, distance) {
  let shippingCost = weight * distance * 0.1;
  return shippingCost.toString();
}

function calculateLoyaltyPoints(purchaseAmount) {
  let points = purchaseAmount * loyaltyRate;
  return points.toString();
}

// routes

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateCartTotalPrice(newItemPrice, cartTotal));
});

app.get('/membership-discount', (req, res) => {
  let isMember = req.query.isMember;
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateDiscountedPrice(isMember, cartTotal));
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTax(cartTotal));
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(estimateDelivery(shippingMethod, distance));
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance));
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  res.send(calculateLoyaltyPoints(purchaseAmount));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
