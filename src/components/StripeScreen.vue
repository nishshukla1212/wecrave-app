<template>
  <div>
    <button id="checkout-button" @click="redirectCheckout()">Checkout</button>
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "StripeScreen",
  methods: {
    async redirectCheckout() {
      // const stripe = await loadStripe(
      //   "pk_live_51IHapJHffvLfnsDr4945gyj6tVauBRS1stvmTnhwQVYcEpSd7dpsP7lWAIeIRNhHJOj2BwfbnEkyLNb4HBDVzjvN00NQn7GIo0",
      // );
      const stripe = await loadStripe(
        "pk_test_51IHapJHffvLfnsDrRlM7r5h0fQ74a4ID4POuwgFN5EiBLUc9sLNRmUzrWj3pgW8h8IDOW3O772baHXbwsZRCozOF00HxKYIi8x"
      );

      console.log(this.$store.state.selectedDish[0].id);

      let price_total = String(this.$store.state.selectedDish[0].totalPrice).split('.');
      let price = Number(price_total[0] + price_total[1]);

      // Call your backend to create the Checkout Session
      const response = await fetch(
        `https://g3ahlnhgjd.execute-api.us-east-1.amazonaws.com/dev?productID=${this.$store.state.selectedDish[0].id}&price=${price}`,
        {
          method: "GET"
        }
      );

      let responseJSON = await response.json();
      console.log(responseJSON.sessionID);

      const sessionID = responseJSON.sessionID;

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: sessionID
      });

      if (result.error) {
        console.log(result.error);
      }
    }
  }
};
</script>
<style></style>
