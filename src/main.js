import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"

import api from "./axios/index.js"
import utils from "./utils/utils"
import "./filter/filters"
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  error: require("./assets/images/replace.png"),
  loading: require("./assets/images/replace.png")
})

import "./element-ui"
Vue.config.productionTip = false

import "./assets/css/reset.css"

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
