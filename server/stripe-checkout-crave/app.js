'use strict';

// eslint-disable-next-line import/no-unresolved
const express = require('express');

const app = express();

const stripe = require("stripe")(
  "sk_test_51IHapJHffvLfnsDrGKqR703ylaKbSADWaxAIhrOX5dI9DtWsq5iK13hV4Uyj4oOFMKwVdmMaxot436Nl9LccPqEB00kcpPJBQi"
);


// Routes
app.get('/', (req, res) => {
  res.send(`Request received: ${req.method} - ${req.path}`);
});

app.post("/create-checkout-session", async (req, res) => {
  const product = await stripe.products.create({
    name: req.body.productID
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: req.body.price,
    currency: "usd"
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.id
          },
          unit_amount: price.id
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: "https://blissful-kirch-3476bb.netlify.app/#/success",
    cancel_url: "https://blissful-kirch-3476bb.netlify.app/#/cancel"
  });

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ id: session.id });
});

// Error handler
app.use((err, req, res) => {
  console.error(err);
  res.status(500).send('Internal Serverless Error');
});

module.exports = app;
