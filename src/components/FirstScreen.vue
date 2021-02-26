<template>
  <div class="landing-page">
    <div class="logo-container">
      <img src="~@/assets/logo.png" width="53px" height="36px" />
    </div>
    <div class="selectBox">
      <select v-on:change="filterResults()" v-model="selectedInfluencer">
        <option
          :key="influencer"
          v-for="influencer in influencerNames"
          :value="influencer"
        >
          {{ influencer }}
        </option>
      </select>
    </div>
    <div class="selectBox">
      <select v-model="zone" v-on:change="filterResults()">
        <option :key="zone" v-for="zone in zones" :value="zone">
          {{ zone }}
        </option>
      </select>
    </div>
    <div class="inputField">
      <input
        type="text"
        v-model="dishName"
        name="dishName"
        id="dishName"
        @keypress="filterResults()"
      />
    </div>
    <div class="container">
      <div class="gallery">
        <div :key="url.id" v-for="url in pictureURLS" class="gallery-item" tabindex="0">
          <img :src="url.img" class="gallery-image" alt="" />
          <div class="gallery-item-info" @click="selectDish(url.id)">
            <ul class="noPadding">
              <li class="gallery-item-dish-name">
                <span class="visually-hidden">Dish:</span
                ><font-awesome-icon icon="utensils" aria-hidden="true" />
                {{ url.description }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export const GET_DISHES = gql`
  query GET_DISHES(
    $influencerName: String
    $dishPrice: numeric!
    $zone: String
    $dishName: String
  ) {
    crave_restaurants(
      where: {
        influencerName: { _eq: $influencerName }
        _or: { dishPrice: { _gt: $dishPrice }, _or: { dishName: { _eq: $dishName } } }
      }
    ) {
      deliveryFee
      dishName
      dishPrice
      id
      influencerName
      minPrice
      orderLink
      picID
      restaurantName
      serviceFee
      tax
      totalPrice
      zone
    }
  }
`;
export default {
  name: "FirstScreen",
  data() {
    return {
      crave_restaurants: {},
      influencerNames: [],
      pictureURLS: [],
      dishPrice: 0.0,
      selectedInfluencer: this.$route.query.id ? this.$route.query.id : "",
      zone: "Lower East",
      dishName: "",
      zones: ["Lower East", "Lower West", "Midtown", "Upper East", "Upper West"],
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    async query() {
      let variables = {};
      if (this.selectedInfluencer.length > 0) {
        variables["influencerName"] = this.selectedInfluencer;
      }
      if (this.zone.length > 0) {
        variables["zone"] = this.zone;
      }
      if (this.dishName.length > 0) {
        variables["dishName"] = this.dishName;
      }
      variables["dishPrice"] = this.dishPrice;
      console.log(variables);
      this.crave_restaurants = await this.$apollo
        .query({
          query: GET_DISHES,
          variables: variables,
        })
        .catch((res) => {
          console.log(res);
        });
      this.$store.commit("addDishes", this.crave_restaurants.data.crave_restaurants);
      if (this.selectedInfluencer.length > 0) {
        this.influencerNames.push("@" + this.selectedInfluencer);
      } else {
        this.$store.state.dishes.forEach((dish) => {
          if (!this.influencerNames.includes("@" + dish.influencerName)) {
            this.influencerNames.push("@" + dish.influencerName);
          }
        });
      }
      this.selectedInfluencer = this.influencerNames[0];
      this.$store.state.dishes.forEach((dish) => {
        this.pictureURLS.push({
          img: "https://scraped-info-from-ig.s3.amazonaws.com/" + dish.picID + ".jpg",
          description: dish.dishName,
          id: dish.id,
        });
      });
      this.filterResults();
    },
    selectDish(id) {
      let selectedDish = this.$store.state.dishes.filter((dish) => dish.id === id);
      this.$store.commit("addSelectedDish", selectedDish);
      this.$router.push("/payment");
    },
    filterResults() {
      console.log("in filter results");
      console.log(this.selectedInfluencer);
      console.log(this.zone);
      let filteredDishes = this.$store.state.dishes.filter(
        (dish) =>
          dish.influencerName === this.selectedInfluencer.split("@")[1] &&
          dish.zone === this.zone &&
          dish.dishName.includes(this.dishName),
      );
      this.pictureURLS = [];
      filteredDishes.forEach((dish) => {
        this.pictureURLS.push({
          img: "https://scraped-info-from-ig.s3.amazonaws.com/" + dish.picID + ".jpg",
          description: dish.dishName,
          id: dish.id,
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "@/assets/main.scss";
</style>
