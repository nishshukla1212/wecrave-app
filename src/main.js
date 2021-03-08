import Vue from "vue";
import ApolloClient from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUtensils)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueApollo);

Vue.config.productionTip = true;

// Create an http link:
const link = new HttpLink({
  uri: `https://crave-restaurants.hasura.app/v1/graphql`,
  headers: {
    "x-hasura-admin-secret": `ndnfijnfnifijfne!!njknjjndscm`
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
