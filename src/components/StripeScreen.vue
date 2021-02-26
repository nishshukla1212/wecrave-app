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
        "pk_test_51IHapJHffvLfnsDrRlM7r5h0fQ74a4ID4POuwgFN5EiBLUc9sLNRmUzrWj3pgW8h8IDOW3O772baHXbwsZRCozOF00HxKYIi8x",
      );

      // Call your backend to create the Checkout Session
      const response = await fetch(
        "https://wm235kmiq1.execute-api.us-east-1.amazonaws.com/create-checkout-session",
        {
          method: "POST",
          cache: "default",
          mode: "cors",
          body: JSON.stringify({
            productID: this.$store.state.selectedDish.id,
            price: this.$store.state.selectedDish.totalPrice,
          }),
        },
      );

      console.log(response);

      const session = await response.json();

      // When the customer clicks on the button, redirect them to Checkout.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    },
  },
};
</script>
<style></style>
