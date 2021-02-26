import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    order: {
      firstName: 'Sandwich',
      lastName: 'Pants',
      influencerName: '',
      email: 'emailmefood@crave.com',
      phone: '50050050000',
      restaurantName: 'Tasty Delicious',
      foodName: 'Burger',
      address: {
        line1: '1 Times Square',
        line2: '01',
        zip: '10101',
        city: 'New York',
        state: 'NY',
      },
      paymentInfo: {
        firstName: 'PB',
        lastName: 'AND J',
        cardNo: 'xxx-xxx-xxx',
        exp: 'xx/xx',
        cvv: 'xxx',
        address: {
          line1: '1 Times Square',
          line2: '01',
          zip: '10101',
          city: 'New York',
          state: 'NY',
        },
      },
      successful: false,
      tip: 0.0,
      total: 0.0,
      deliveryNotes: 'please call',
      orderNo: 'initial order no',
      orderPic: 'initial order pic',
    },
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
    addFirstName(state, firstName) {
      state.order.firstName = firstName
    },
    addLastName(state, lastName) {
      state.order.lastName = lastName
    },
    addIgHandle(state, IgHandle) {
      state.order.igHandle = IgHandle
    },
    addSrcIgHandle(state, srcIgHandle) {
      state.order.srcIgHandle = srcIgHandle
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
    addFoodName(state, foodName) {
      state.order.foodName = foodName
    },
    addTotal(state, total) {
      state.order.total = total
    },
    addOrderNo(state, orderNo) {
      state.order.orderNo = orderNo
    },
    addAddress(state, address) {
      state.order.address = {
        line1: address.line1,
        line2: address.line2,
        zip: address.zip,
        city: address.city,
        state: address.state,
      }
    },
    addPayment(state, paymentInfo) {
      state.order.paymentInfo = {
        firstName: paymentInfo.firstName,
        lastName: paymentInfo.lastName,
        cardNo: paymentInfo.cardNo,
        exp: paymentInfo.exp,
        cvv: paymentInfo.cvv,
        address: {
          line1: paymentInfo.address.line1,
          line2: paymentInfo.address.line2,
          zip: paymentInfo.address.zip,
          city: paymentInfo.address.city,
          state: paymentInfo.address.state,
        },
      }
    },
    addSuccessState(state, successful) {
      state.order.successful = successful
    },
  },
  actions: {},
  modules: {}
});