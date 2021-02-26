import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import StripeScreen from "../components/StripeScreen.vue";

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
  }
];

const router = new VueRouter({
  routes
});

export default router;
