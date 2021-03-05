"use strict";

const stripe = require("stripe")(
  "sk_test_51IHapJHffvLfnsDrGKqR703ylaKbSADWaxAIhrOX5dI9DtWsq5iK13hV4Uyj4oOFMKwVdmMaxot436Nl9LccPqEB00kcpPJBQi"
);
let nodemailer = require("nodemailer");
let aws = require("@aws-sdk/client-ses");
const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "us-east-1"
});
// create Nodemailer SES transporter
let transporter = nodemailer.createTransport({
  SES: { ses, aws }
});
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
    success_url: `https://blissful-kirch-3476bb.netlify.app/#/success?orderID=${orderID}`,
    cancel_url: `https://blissful-kirch-3476bb.netlify.app/#/payment?orderID=${orderID}`
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

module.exports.sendEmail = async (event, context, callback) => {
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
      from: "nish@wecrave.co",
      to: order.email.toString(),
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
      `,
      ses: {
        // optional extra arguments for SendRawEmail
      }
    },
    (err, info) => {
      console.log(info.envelope);
      console.log(info.messageId);
      if (!err) {
        transporter.sendMail(
          {
            from: "nish@wecrave.co",
            to: order.email.toString(),
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
            `,
            ses: {
              // optional extra arguments for SendRawEmail
            }
          },
          (err2, info2) => {
            console.log(info2.envelope);
            console.log(info2.messageId);
            if (!err2) {
              callback(null, response);
            }
          }
        );
      }
    }
  );

};
