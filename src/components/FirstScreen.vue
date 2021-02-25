<template>
  <div>
    <div class="logo"></div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export const GET_DISHES = gql`
  query GET_DISHES($influencerName: String, $dishPrice: numeric!) {
    crave_restaurants(
      where: {
        influencerName: { _eq: $influencerName }
        _or: { dishPrice: { _gt: $dishPrice } }
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
  name: "FirstScreen"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"></style>
