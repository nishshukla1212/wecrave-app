<template>
  <div class="landing-page">
    <div class="logo-container">
      <div class="row">
        <button @click="goBack()">
          <span class="close">X</span>
        </button>
        <h1 class="pageTitle">Delivery Details</h1>
      </div>
    </div>
    <h1 class="pageHeader">Deliver to</h1>
    <ValidationObserver v-slot="{ handleSubmit, invalid }">
      <form @submit.prevent="handleSubmit(goToNextPage)">
        <ValidationProvider name="Name" rules="required" v-slot="{ errors }">
          <input
            type="text"
            class="text-field"
            name="name"
            id="name"
            v-model="name"
            placeholder="Name"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider
          name="Phone"
          rules="required|length:10|numeric"
          v-slot="{ errors }"
        >
          <input
            type="tel"
            class="text-field"
            name="phone"
            id="phone"
            v-model="phone"
            placeholder="Phone"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
          <input
            type="email"
            class="text-field"
            name="email"
            id="email"
            v-model="email"
            placeholder="Email"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
        <ValidationProvider name="Address" rules="required" v-slot="{ errors }">
          <input
            type="search"
            class="text-field"
            name="address"
            id="address"
            ref="address"
            placeholder="Address"
          />
          <p class="error">{{ errors[0] }}</p>
        </ValidationProvider>
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
          style="margin-bottom: 20px; margin-top: 32px"
          placeholder="Instructions"
        />
        <div class="row etaRow" style="padding-left: 18px">
          <p class="eta">Estimated Delivery Time:</p>
          <p class="etaTime" style="margin-left: 12%">30 mins</p>
        </div>

        <button :disabled="invalid">
          <div class="continue btn dlvyBtn">
            <span class="continue-text">Continue</span>
          </div>
        </button>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import { required, email, length, numeric } from "vee-validate/dist/rules";
extend("required", {
  ...required,
  message: "This field is required",
});

// Add the email rule
extend("email", {
  ...email,
  message: "This field must be a valid email",
});

extend("length", {
  ...length,
  message: "This field must be 10 digits",
});
extend("numeric", {
  ...numeric,
  message: "This field must be numeric",
});

export default {
  name: "DeliveryScreen",
  data() {
    return {
      name: "",
      email: "",
      phone: "",
      address: null,
      address2: "",
      instructions: "",
      totalPrice: this.$store.state.selectedDish[0].totalPrice || 0.0,
      custom_tip_display: false,
    };
  },

  components: {
    ValidationObserver,
    ValidationProvider,
  },
  mounted() {
    this.initMapAutoComplete();
  },
  methods: {
    isRequired(value) {
      return value ? true : "This field is required";
    },
    goBack() {
      this.$router.go(-1);
    },
    initMapAutoComplete() {
      const center = { lat: 40.758390939444126, lng: -73.98573206540885 };
      // Create a bounding box with sides ~10km away from the center point
      const defaultBounds = {
        north: center.lat + 0.03,
        south: center.lat - 0.03,
        east: center.lng + 0.03,
        west: center.lng - 0.03,
      };
      const options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "us" },
        fields: ["address_components", "geometry", "icon", "name"],
        origin: center,
        strictBounds: true,
      };
      // eslint-disable-next-line no-undef
      this.address = new google.maps.places.Autocomplete(this.$refs.address, options);
      this.address.addListener('place_changed', this.address)
    },
    goToNextPage() {
      this.$store.commit(
        "addInfluencerName",
        this.$store.state.selectedDish[0].influencerName,
      );
      this.$store.commit("addName", this.name);
      this.$store.commit("addEmail", this.email);
      this.$store.commit("addPhone", this.phone);
      this.$store.commit("addStreetAddress", document.getElementById("address").value);
      this.$store.commit("addAptNo", this.address2);
      this.$store.commit("addDeliveryNotes", this.instructions);
      this.$store.commit("addZone", this.$store.state.selectedDish[0].zone);
      this.$store.commit("addOrderLink", this.$store.state.selectedDish[0].orderLink);
      this.$store.commit(
        "addRestaurantName",
        this.$store.state.selectedDish[0].restaurantName,
      );
      this.$store.commit("addDishName", this.$store.state.selectedDish[0].dishName);
      this.$router.push("/payment");
    },
    fillInAddress(autocomplete) {
      // Get the place details from the autocomplete object.
      const place = autocomplete.getPlace();
      let address1 = "";
      let postcode = "";

      // Get each component of the address from the place details,
      // and then fill-in the corresponding field on the form.
      // place.address_components are google.maps.GeocoderAddressComponent objects
      // which are documented at http://goo.gle/3l5i5Mr
      for (const component of place.address_components) {
        const componentType = component.types[0];

        switch (componentType) {
          case "street_number": {
            address1 = `${component.long_name} ${address1}`;
            break;
          }

          case "route": {
            address1 += component.short_name;
            break;
          }

          case "postal_code": {
            postcode = `${component.long_name}${postcode}`;
            break;
          }

          case "postal_code_suffix": {
            postcode = `${postcode}-${component.long_name}`;
            break;
          }
          case "locality":
            document.querySelector("#locality").value = component.long_name;
            break;

          case "administrative_area_level_1": {
            document.querySelector("#state").value = component.short_name;
            break;
          }
          case "country":
            document.querySelector("#country").value = component.long_name;
            break;
        }
      }
    
    },
  },
};
</script>
<style lang="scss">
.dlvyBtn {
  min-height: 45px;
  margin-top: 45%;
}
</style>
