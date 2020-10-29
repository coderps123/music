import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import * as getters from "./getters"
import * as mutations from "./mutations"
import * as actions from "./actions"
import createLogger from "vuex/dist/logger"

const debug = process.env.NODE_ENV !== "production"

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createLogger()]
})

export default store
