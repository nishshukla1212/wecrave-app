import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StripeScreen from "../components/StripeScreen.vue";
import SecondScreen from "../components/SecondScreen.vue";
import DeliveryScreen from "../components/DeliveryScreen.vue";
import FeedbackScreen from "../components/FeedbackScreen.vue";
import Success from "../components/Success.vue";
import Cancel from "../components/Cancel.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/payment",
    name: "StripeScreen",
    component: StripeScreen
  },
  {
    path: "/secondScreen",
    name: "SecondScreen",
    component: SecondScreen
  },
  {
    path: "/delivery",
    name: "DeliveryScreen",
    component: DeliveryScreen
  },
  {
    path: "/feedback",
    name: "FeedbackScreen",
    component: FeedbackScreen
  },
  {
    path: "/success",
    name: "Success",
    component: Success
  },
  {
    path: "/cancel",
    name: "Cancel",
    component: Cancel
  }
];

const router = new VueRouter({
  routes
});

export default router;
