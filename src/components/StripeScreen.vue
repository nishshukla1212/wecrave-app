<template>
  <div class="landing-page">

    <div class="tip">
      <p class="tip-text">Add Tip</p>
      <div class="row tip-row">
        <span id="tip-15" class="btn primitive default tip-btn">15%</span>
        <span id="tip-20" class="btn primitive default tip-btn">20%</span>
        <span id="tip-25" class="btn primitive default tip-btn">25%</span>
        <span id="tip-more" class="btn primitive default tip-btn">more</span>
      </div>
      <div class="tip-input" v-if="custom_tip_display"><input class="input input-lg" type="number" @change="calculateTip()" name="custom-tip" id="custom-tip"> %</div>
      <div class="row subtotalRow">
        <span class="subtotal">Subtotal</span>
        <span class="subtotalPrice">$ {{ this.totalPrice }}</span>
      </div>
    </div>
    <div id="checkout-button" class="continue btn" @click="redirectCheckout()">
      <span class="continue-text">Continue</span>
    </div>
  </div>
</template>
<script>
import { loadStripe } from "@stripe/stripe-js";

export default {
  name: "StripeScreen",
  data() {
    return {
      totalPrice : this.$store.state.selectedDish[0].totalPrice || 0.00,
      custom_tip_display : false,
    }
  },
  mounted() {
    this.addTipListeners();
  },
  methods: {
    addTipListeners() {
      const tip_15 = document.getElementById("tip-15");
      const tip_20 = document.getElementById("tip-20");
      const tip_25 = document.getElementById("tip-25");
      const tip_more = document.getElementById("tip-more");
      tip_15.addEventListener("click", () => {
        tip_15.classList.add("active");
        tip_20.classList.remove("active");
        tip_25.classList.remove("active");
        tip_more.classList.remove("active");
        this.custom_tip_display= false
        this.calculateTip();
      });
      tip_20.addEventListener("click", () => {
        tip_15.classList.remove("active");
        tip_20.classList.add("active");
        tip_25.classList.remove("active");
        tip_more.classList.remove("active");
        this.custom_tip_display= false
        this.calculateTip();
      });
      tip_25.addEventListener("click", () => {
        tip_15.classList.remove("active");
        tip_20.classList.remove("active");
        tip_25.classList.add("active");
        tip_more.classList.remove("active");
        this.custom_tip_display= false
        this.calculateTip();
      });
      tip_more.addEventListener("click", () => {
        tip_15.classList.remove("active");
        tip_20.classList.remove("active");
        tip_25.classList.remove("active");
        tip_more.classList.add("active");
        this.custom_tip_display= true
      });
    },
    calculateTip(){
      this.totalPrice = this.$store.state.selectedDish[0].totalPrice;
      let tip_percent = String(document.getElementsByClassName("active")[0].innerText);
      if(tip_percent.includes('%')){
        tip_percent = String(document.getElementsByClassName("active")[0].innerText).split('%')[0];
      }
      if(tip_percent === "more"){
        tip_percent = String(document.getElementById("custom-tip").value)
      }
      console.log(tip_percent);
      this.totalPrice = this.totalPrice + (this.totalPrice * (tip_percent / 100))
      this.totalPrice = Math.round((this.totalPrice + Number.EPSILON) * 100) / 100
      console.log(this.totalPrice);
    },
    async redirectCheckout() {
      // const stripe = await loadStripe(
      //   "pk_live_51IHapJHffvLfnsDr4945gyj6tVauBRS1stvmTnhwQVYcEpSd7dpsP7lWAIeIRNhHJOj2BwfbnEkyLNb4HBDVzjvN00NQn7GIo0",
      // );
      const stripe = await loadStripe(
        "pk_test_51IHapJHffvLfnsDrRlM7r5h0fQ74a4ID4POuwgFN5EiBLUc9sLNRmUzrWj3pgW8h8IDOW3O772baHXbwsZRCozOF00HxKYIi8x"
      );

      console.log(this.$store.state.selectedDish[0].id);

      let price_total = String(
        this.totalPrice
      ).split(".");
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
