"use strict";

const stripe = require("stripe")(
  "sk_test_51IHapJHffvLfnsDrGKqR703ylaKbSADWaxAIhrOX5dI9DtWsq5iK13hV4Uyj4oOFMKwVdmMaxot436Nl9LccPqEB00kcpPJBQi"
);
let nodemailer = require("nodemailer");
var sgTransport = require('nodemailer-sendgrid-transport');
let aws = require("@aws-sdk/client-ses");

var options = {
  auth: {
      api_key: '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'
  }
}

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1"
});
// create Nodemailer SES transporter
let transporter = nodemailer.createTransport(sgTransport(options));
module.exports.hello = async event => {
  console.log(event);
  let orderID = event.queryStringParameters.orderID;
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
            name: product.name
          },
          unit_amount: Number(price.unit_amount)
        },
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `https://order.wecrave.co/#/success?orderID=${orderID}`,
    cancel_url: `https://order.wecrave.co/#/payment?orderID=${orderID}`
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
        sessionID: await session.id,
        orderID: orderID
      },
      null,
      2
    )
  };
};

module.exports.sendEmail = (event, context, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify({ message: 'Emails Sent!' }),
  };

  console.log(JSON.parse(event.body).order[0]);
  let order = JSON.parse(event.body).order[0];
  transporter.sendMail(
    {
      from: "nish.12.shukla@gmail.com",
      to: "nish.12.shukla@gmail.com",
      subject: `Crave - ${order.orderID.toString()}`,
      html: `
      New Order Arrived!<br>
      Order ID: ${order.orderID}<br>
      name: ${order.name}<br>
      influencerName: ${order.influencerName}<br>
      email: ${order.email}<br>
      phone: ${order.phone}<br>
      restaurantName: ${order.restaurantName}<br>
      dishName: ${order.dishName}<br>
      orderLink: ${order.orderLink}<br>
      zone: ${order.zone}<br>
      streetAddress : ${order.streetAddress}<br>
      aptNo  : ${order.aptNo}<br>
      tip  : ${order.tip}%<br>
      total  : ${order.total}<br>
      deliveryNotes: ${order.deliveryNotes}<br>
      `
    },
    (err, info) => {
      if (!err) {
        transporter.sendMail(
          {
            from: "nish.12.shukla@gmail.com",
            to: order.email.toString(),
            subject: `Crave - ${order.orderID.toString()}`,
            html: `
            Thank you for your Crave order!<br>
            Order ID: ${order.orderID}<br>
            name: ${order.name}<br>
            `,
            ses: {
              // optional extra arguments for SendRawEmail
            }
          },
          (err2, info2) => {
            if (!err2) {
              callback(null, response);
            } else {
              console.log(err2);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );

};
