import Vue from "vue";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import store from "./store";
import router from "./router";
import App from "./App.vue";

Vue.use(VueApollo);

Vue.config.productionTip = false;

// Create an http link:
const link = new HttpLink({
  uri: `${process.env.HASURA_URI}`,
  headers: {
    "x-hasura-admin-secret": `${process.env.HASURA_ADMIN_KEY}`
  },
  fetch
});
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true
  })
});
const apolloProvider = new VueApollo({
  defaultClient: client
});
new Vue({
  router,
  apolloProvider,
  store,
  render: h => h(App)
}).$mount("#app");
