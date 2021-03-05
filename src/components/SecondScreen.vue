<template>
  <div class="landing-page">
    <div class="food-preview">
      <img :src="this.previewImageUrl" alt="IMG" />
    </div>
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
  }
};
</script>
<style lang="scss">
@import "@/assets/main.scss";
div.food-preview {
  position: absolute;
  width: 315px;
  height: 312px;
  left: 30px;
  top: 168px;
  border-radius: 30px;
  img {
    width: 315px;
    height: 312px;
  }
}
</style>
