import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    order: {
      orderID: '',
      name: 'Sandwich',
      influencerName: '',
      email: 'emailmefood@crave.com',
      phone: '50050050000',
      restaurantName: 'Tasty Delicious',
      dishName: 'Burger',
      orderLink: '',
      zone: '',
      streetAddress : '',
      aptNo  : '',
      tip  : 0.00,
      total  : 0.00,
      successful: false,
      deliveryNotes: '',
    },
    urls:[],
    dishes: [],
    selectedDish:{},
  },
  mutations: {
    addDishes(state, dishes) {
      state.dishes = dishes
    },
    addSelectedDish(state, dish) {
      state.selectedDish = dish
    },
    addUrls(state, url) {
      state.urls.push(url);
    },
    addOrderID(state, orderID) {
      state.order.orderID = orderID
    },
    addName(state, name) {
      state.order.name = name
    },
    addInfluencerName(state, influencerName) {
      state.order.influencerName = influencerName
    },
    addEmail(state, email) {
      state.order.email = email
    },
    addPhone(state, phone) {
      state.order.phone = phone
    },
    addRestaurantName(state, restaurantName) {
      state.order.restaurantName = restaurantName
    },
    addDishName(state, dishName) {
      state.order.dishName = dishName
    },
    addTotal(state, total) {
      state.order.total = total
    },
    addTip(state, tip) {
      state.order.tip = tip
    },
    addStreetAddress(state, streetAddress) {
      state.order.streetAddress = streetAddress
    },
    addAptNo(state, aptNo) {
      state.order.aptNo = aptNo
    },
    addDeliveryNotes(state, deliveryNotes) {
      state.order.deliveryNotes = deliveryNotes
    },
    addZone(state, zone) {
      state.order.zone = zone
    },
    addOrderLink(state, orderLink) {
      state.order.orderLink = orderLink
    },
    addSuccessState(state, successful) {
      state.order.successful = successful
    },
  },
  actions: {},
  modules: {}
});