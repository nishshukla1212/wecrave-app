<template>
  <div class="landing-page">
    <div class="logo-container">
      <div class="row">
        <button @click="goBack()">
          <span class="close">X</span>
        </button>
        <h1 class="pageTitle">
          Feedback
        </h1>
      </div>
    </div>
    <h1 class="pageHeader feedbackPadedTop">
      We’d love to hear your feedback
    </h1>
    <form class="feedbackForm" @submit.prevent="submit()">
      <p>How was the food?</p>
      <star-rating
        :show-rating="false"
        active-color="#F55842"
        v-model="feedbackRequest.food_review"
      ></star-rating>
      <p>How do you like the app?</p>
      <star-rating
        :show-rating="false"
        active-color="#F55842"
        v-model="feedbackRequest.app_review"
      ></star-rating>
      <p>Would you recommend this app to your friends?</p>
      <star-rating
        :show-rating="false"
        active-color="#F55842"
        v-model="feedbackRequest.app_recommend"
      ></star-rating>
      <p>What else would you like to share with us?</p>
      <textarea rows="6" class="remarksBox" v-model="feedbackRequest.remarks"></textarea>
      <button>
        <div class="continue btn">
          <span class="continue-text">Submit</span>
        </div>
      </button>
    </form>
  </div>
</template>
<script>
import StarRating from "vue-star-rating";
import gql from "graphql-tag";

export const ADD_FEEDBACK = gql`
  mutation ADD_FEEDBACK($object: crave_order_feedback_insert_input!) {
    insert_crave_order_feedback_one(object: $object) {
      orderID
      food_review
      app_review
      app_recommend
      remarks
    }
  }
`;
export default {
  name: "DeliveryScreen",
  components: {
    StarRating
  },
  data: () => ({
    orderID: "",
    feedbackResponse: {},
    feedbackRequest: {
      food_review: "",
      app_review: "",
      app_recommend: "",
      remarks: ""
    }
  }),

  mounted() {
    this.orderID = this.$store.state.order.orderID;
  },
  methods: {
    async submit() {
      this.feedbackResponse = await this.$apollo
        .mutate({
          mutation: ADD_FEEDBACK,
          variables: { object: this.feedbackRequest }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="scss">
.feedbackForm {
  p {
    width: 315px;
    height: 24px;
    margin-left: 30px;

    font-family: Nunito;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    display: flex;
    align-items: center;

    color: #000000;
  }
  .vue-star-rating{
    text-align: left;
    margin-left: 15px;
    margin-right: 0px;
  }
}
.feedbackPadedTop {
  margin-top: 25%;
  margin-bottom: 25%;
}
</style>
