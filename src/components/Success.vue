<template>
  <div>
    <h1>It is successful</h1>
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
  mutation UPDATE_ORDER($orderID: String!) {
    update_crave_orders_by_pk(pk_columns: { orderID: $orderID }) {
      successful
    }
  }
`;
export default {
  name: "Success",
  data() {
    return {
      orderID: "",
      order: {},
      crave_order: {},
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
          variables: { orderID: this.$store.state.order.orderID }
        })
        .catch(res => {
          console.log(res);
        });
      if (response.statusCode === 200) {
        this.$router.push("/feedback");
      }
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
    }
  }
};
</script>
