<template>
  <div>
    <div v-if="successful === false" class="landing-page">
      <ValidationObserver v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(addRow)">
          <div class="row" :key="count" v-for="count in counter">
            <div class="rowGroup">
              <div class="col-md-12" style="margin-left: 12px">
                <dropzone></dropzone>
              </div>
              <div class="col-md-12">
                <div class="inputGroup">
                  <ValidationProvider name="zone" rules="required" v-slot="{ errors }">
                    <div class="selectBox" style="margin-left: 30px; width: 315px">
                      <select v-model="zone">
                        <option :key="zone" v-for="zone in zones" :value="zone">
                          {{ zone }}
                        </option>
                      </select>
                    </div>
                    <p class="error">{{ errors[0] }}</p>
                  </ValidationProvider>
                  <ValidationProvider
                    name="restaurantName"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="text-field"
                      name="restaurantName"
                      id="restaurantName"
                      v-model="restaurantName"
                      placeholder="Restaurant Name"
                    />
                    <p class="error">{{ errors[0] }}</p>
                  </ValidationProvider>
                  <ValidationProvider
                    name="dishName"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      type="text"
                      class="text-field"
                      name="dishName"
                      id="dishName"
                      v-model="dishName"
                      placeholder="Dish Name"
                    />
                    <p class="error">{{ errors[0] }}</p>
                  </ValidationProvider>
                  <input
                    type="url"
                    class="text-field"
                    name="orderLink"
                    id="orderLink"
                    v-model="orderLink"
                    placeholder="Order Link"
                  />
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    class="text-field"
                    name="dishPrice"
                    id="dishPrice"
                    v-model="dishPrice"
                    placeholder="Dish Price"
                  />
                </div>
              </div>
            </div>
          </div>

          <button :disabled="invalid">
            <div class="continue btn dlvyBtn" style="margin-top: 50px">
              <span class="continue-text">Add</span>
            </div>
          </button>
        </form>
      </ValidationObserver>
    </div>
    <div v-if="successful === true" class="landing-page">
      <div class="logo-container">
        <div class="row">
          <h1 class="pageTitle" style="margin-left: auto; margin-right: auto">
            Confirmation
          </h1>
        </div>
      </div>
      <div @click="goToNextPage()" class="pageBody">
        <div class="confirmationText">Success! Add More? Tap Logo</div>
        <div class="confirmationLogo">
          <img src="~@/assets/logo.png" width="141px" height="96px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { extend } from "vee-validate";
import { required, email, length, numeric, regex } from "vee-validate/dist/rules";
import Dropzone from "../components/Dropzone";
import gql from "graphql-tag";

export const ADD_DISH = gql`
  mutation ADD_DISH($object: crave_restaurants_insert_input!) {
    insert_crave_restaurants_one(object: $object) {
      id
    }
  }
`;
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

extend("regex", {
  ...regex,
  message: "This field must be URL",
});

export default {
  name: "AddForm",
  data() {
    return {
      influencerName: "",
      counter: 1,
      restaurantName: "",
      dishName: "",
      dishPrice: 0.0,
      orderLink: "https://www.district9.com",
      zones: ["Lower West", "Lower East", "Midtown", "Upper West", "Upper East"],
      zone: "Lower East",
      successful: false,
      id: "",
    };
  },
  components: {
    Dropzone,
    ValidationObserver,
    ValidationProvider,
  },
  mounted() {
    this.influencerName = this.$route.path.split("/")[2];
    console.log(this.influencerName);
  },
  methods: {
    async addRow() {
      let s3URL = await this.$store.state.urls[0].split("?")[0];
      console.log(s3URL);
      let request = {};
      request.pictureURL = await s3URL;
      request.influencerName = this.influencerName;
      request.dishName = this.dishName;
      request.dishPrice = this.dishPrice;
      request.totalPrice = this.dishPrice;
      request.restaurantName = this.restaurantName;
      request.orderLink = this.orderLink;
      request.zone = this.zone;
      this.crave_dish = await this.$apollo
        .mutate({
          mutation: ADD_DISH,
          variables: { object: request },
        })
        .catch((res) => {
          console.log(res);
        });

      if (this.crave_dish.data.insert_crave_restaurants_one.id) {
        this.successful = true;
        this.id = this.crave_dish.data.insert_crave_restaurants_one.id;
      }
    },
    goToNextPage() {
      this.successful = false;
      location.reload();
    },
  },
};
</script>

<style lang="scss">
.confirmationLogo {
  width: 141px;
  height: 96px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.confirmationText {
  width: 315px;
  height: 72px;

  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10%;
  color: #000000;
}
.orderID {
  @extend .confirmationText;
  margin-top: 10%;
}
.pageBody {
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
