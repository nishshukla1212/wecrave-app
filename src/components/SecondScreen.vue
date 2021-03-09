<template>
  <div class="landing-page">
    <div class="logo-container">
      <div class="row">
        <button @click="goBack()">
          <span class="close">X</span>
        </button>
        <h1 class="pageTitle">
          Item Details
        </h1>
      </div>
    </div>
    <h1 class="pageHeader">
      Order
    </h1>
    <div class="food-preview">
      <img :src="this.previewImageUrl" alt="IMG" />
      <p class="pictureCredits">
        <span>@{{ this.$store.state.selectedDish[0].influencerName }}</span>
      </p>
      <h1 class="dishName">
        {{ this.$store.state.selectedDish[0].dishName }}
      </h1>
      <div class="row" style="margin-left:0px;">
        <p class="restaurantName">
          {{ this.$store.state.selectedDish[0].restaurantName }}
        </p>
        <p class="dishPrice">
          $ {{ this.$store.state.selectedDish[0].totalPrice.toFixed(2) }}
        </p>
      </div>
      <p class="condition">
        *Inclusive of tax and delivery
      </p>
    </div>
    <button>
      <div @click="goToNextPage()" class="continue btn">
        <span class="continue-text">Continue</span>
      </div>
    </button>
  </div>
</template>
<script>
export default {
  name: "SecondScreen",
  data() {
    return {
      previewImageUrl:
        "https://scraped-info-from-ig.s3.amazonaws.com/" +
        this.$store.state.selectedDish[0].picID +
        ".jpg"
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goToNextPage() {
      this.$router.push("/delivery");
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/main.scss";
div.food-preview {
  position: relative;
  width: 315px;
  height: 312px;
  margin-left: 30px;
  margin-top: 10%;
  border-radius: 30px;
  margin-bottom: 5%;
  img {
    width: 315px;
    height: 312px;
    border-radius: 30px;
  }
  p.pictureCredits {
    width: 100%;
    height: 16px;
    margin-top: 5%;
    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;

    color: #000000;
  }
  h1.dishName {
    width: 259px;
    height: 25px;
    margin-top: 5%;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    display: flex;
    align-items: center;

    color: #000000;
  }
  p.restaurantName {
    width: 168px;
    height: 24px;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    display: flex;
    margin-right: 1%;
    margin-left: 0;
    color: rgba(63, 63, 70, 0.5);
  }
  p.dishPrice {
    height: 24px;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    display: flex;
    padding-left: 20%;
    color: #000000;
    right: 0 !important;
    text-align: right !important;
  }
  p.condition {
    width: 162px;
    height: 24px;
    margin-left: 50%;
    margin-top: 2%;
    margin-bottom: 2%;

    font-family: Nunito;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;

    color: rgba(63, 63, 70, 0.5);
  }
}
</style>
