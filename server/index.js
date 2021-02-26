const express = require("express");
var cors = require('cors');
const app = express();
// const stripe = require("stripe")(
//   "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"
// );
const stripe = require("stripe")(
  "sk_test_51IHapJHffvLfnsDrGKqR703ylaKbSADWaxAIhrOX5dI9DtWsq5iK13hV4Uyj4oOFMKwVdmMaxot436Nl9LccPqEB00kcpPJBQi"
);

app.use(cors);
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
    success_url: "https://localhost:8080/success",
    cancel_url: "https://localhost:8080/cancel"
  });

  res.json({ id: session.id });
});

app.listen(9000, () => console.log(`Listening on port ${9000}!`));
