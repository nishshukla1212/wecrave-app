<template>
  <div class="landing-page">
    <form @submit.prevent="submit()">
      <star-rating :show-rating=false active-color="#F55842" v-model="feedbackRequest.food_review"></star-rating>
      <star-rating :show-rating=false active-color="#F55842"  v-model="feedbackRequest.app_review"></star-rating>
      <star-rating :show-rating=false active-color="#F55842"  v-model="feedbackRequest.app_recommend"></star-rating>
      <textarea class="remarksBox" v-model="feedbackRequest.remarks"></textarea>
      <button>
        <div class="continue btn">
          <span class="continue-text">Continue</span>
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
<style></style>
