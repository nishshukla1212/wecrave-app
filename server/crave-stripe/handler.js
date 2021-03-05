'use strict';

const stripe = require("stripe")(
  "sk_test_51IHapJHffvLfnsDrGKqR703ylaKbSADWaxAIhrOX5dI9DtWsq5iK13hV4Uyj4oOFMKwVdmMaxot436Nl9LccPqEB00kcpPJBQi"
);


module.exports.hello = async (event) => {
  console.log(event);
  const product = await stripe.products.create({
    name: event.queryStringParameters.productID
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: Number(event.queryStringParameters.price),
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
          unit_amount: Number(price.unit_amount)
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: "https://blissful-kirch-3476bb.netlify.app/#/success",
    cancel_url: "https://blissful-kirch-3476bb.netlify.app/#/cancel"
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        sessionID: await session.id
      },
      null,
      2
    ),
  };
};
