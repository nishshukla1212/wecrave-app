<template>
  <div class="landing-page">
    <input
      type="text"
      class="text-field"
      style="margin-top: 184px !important;"
      name="name"
      id="name"
      v-model="name"
      placeholder="Name"
    />
    <input
      type="tel"
      class="text-field"
      name="phone"
      id="phone"
      v-model="phone"
      placeholder="Phone"
    />
    <input
      type="email"
      class="text-field"
      name="email"
      id="email"
      v-model="email"
      placeholder="Email"
    />
    <input
      type="search"
      class="text-field"
      name="address"
      id="address"
      placeholder="Address"
    />
    <input
      type="text"
      class="text-field"
      name="address2"
      id="address2"
      v-model="address2"
      placeholder="Apt No."
    />
    <input
      type="text"
      class="text-field"
      name="instructions"
      id="instructions"
      v-model="instructions"
      style="margin-bottom:20px;"
      placeholder="Instructions"
    />
    <div class="row etaRow" style="padding-left:18px">
      <p class="eta">Estimated Delivery Time:</p>
      <p class="etaTime" style="margin-left:12%">30 mins</p>
    </div>

    <div @click="goToNextPage()" class="continue btn"><span class="continue-text">Continue</span></div>
  </div>
</template>
<script>
export default {
  name: "DeliveryScreen",
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      address2: '',
      instructions: '',
      totalPrice: this.$store.state.selectedDish[0].totalPrice || 0.0,
      custom_tip_display: false
    };
  },
  mounted() {
    this.initMapAutoComplete();
  },
  methods: {
    initMapAutoComplete() {
      const center = { lat: 40.758390939444126, lng: -73.98573206540885 };
      // Create a bounding box with sides ~10km away from the center point
      const defaultBounds = {
        north: center.lat + 0.03,
        south: center.lat - 0.03,
        east: center.lng + 0.03,
        west: center.lng - 0.03
      };
      const input = document.getElementById("address");
      const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: true
      };
      // eslint-disable-next-line no-undef
      const autocomplete = new google.maps.places.Autocomplete(input, options);
      input.addEventListener("change", () => {
        input.innerText = autocomplete
      });
    },
    goToNextPage(){
      this.$store.commit("addInfluencerName", this.$store.state.selectedDish[0].influencerName);
      this.$store.commit("addName", this.name);
      this.$store.commit("addEmail", this.email);
      this.$store.commit("addPhone", this.phone);
      this.$store.commit("addStreetAddress", document.getElementById("address").value);
      this.$store.commit("addAptNo", this.address2);
      this.$store.commit("addDeliveryNotes", this.instructions);
      this.$store.commit("addZone", this.$store.state.selectedDish[0].zone);
      this.$store.commit("addOrderLink", this.$store.state.selectedDish[0].orderLink);
      this.$store.commit("addRestaurantName", this.$store.state.selectedDish[0].restaurantName);
      this.$store.commit("addDishName", this.$store.state.selectedDish[0].dishName);
      this.$router.push("/payment");
    }
  }
};
</script>
<style></style>
