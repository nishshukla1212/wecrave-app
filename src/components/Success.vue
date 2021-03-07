<template>
  <div class="landing-page">
    <div class="logo-container">
      <div class="row">
        <h1 class="pageTitle" style="margin-left:auto; margin-right:auto;">
          Confirmation
        </h1>
      </div>
    </div>
    <div @click="goToNextPage()" class="pageBody">
      <div class="confirmationText">
        Your food is on the way!
      </div>
      <div class="confirmationLogo">
        <img src="~@/assets/logo.png" width="141px" height="96px" />
      </div>
      <div class="orderID">Order ID - {{ orderID }}</div>
    </div>
  </div>
</template>
<script>
import gql from "graphql-tag";

export const GET_ORDER = gql`
  query GET_ORDER($orderID: String!) {
    crave_orders(where: { orderID: { _eq: $orderID } }) {
      aptNo
      deliveryNotes
      dishName
      email
      influencerName
      name
      orderID
      orderLink
      phone
      restaurantName
      streetAddress
      successful
      tip
      total
      zone
    }
  }
`;
export const UPDATE_ORDER = gql`
  mutation UPDATE_ORDER(
    $successful: Boolean = false
    $orderID: String_comparison_exp = {}
  ) {
    update_crave_orders(
      where: { orderID: $orderID }
      _set: { successful: $successful }
    ) {
      affected_rows
    }
  }
`;
export default {
  name: "Success",
  data() {
    return {
      orderID: "",
      order: {},
      crave_order: {}
    };
  },
  mounted() {
    this.orderID = this.$route.query.orderID;
    if (this.orderID.length > 0) {
      this.sendEmail();
    }
  },
  methods: {
    async sendEmail() {
      let orderObject = await this.query();
      console.log(orderObject);
      this.$store.commit("addOrderID", orderObject.orderID);
      const response = await fetch(
        `https://g3ahlnhgjd.execute-api.us-east-1.amazonaws.com/dev/send-email`,
        {
          method: "POST",
          body: JSON.stringify({
            order: orderObject
          })
        }
      );
      let responseJSON = await response.json();
      console.log(responseJSON);
      this.crave_order = await this.$apollo
        .mutate({
          mutation: UPDATE_ORDER,
          variables: {
            successful: false,
            orderID: {
              _eq: this.orderID
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    async query() {
      let variables = {};
      variables["orderID"] = this.orderID;
      console.log(variables);
      this.order = await this.$apollo
        .query({
          query: GET_ORDER,
          variables: variables
        })
        .catch(res => {
          console.log(res);
        });
      return this.order.data.crave_orders;
    },
    goToNextPage() {
      this.$router.push({path: "/feedback",  query: { orderID: this.orderID }});
    }
  }
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
