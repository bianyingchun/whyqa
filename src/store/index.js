import Vue from 'vue'
import Vuex from 'vuex'
import extact_qa from './module/extact_qa'
import test_q from './module/test_q'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    extact_qa,
    test_q
  }
})
