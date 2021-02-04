import Vue from 'vue'
import Vuex from 'vuex'
import extact_qa from './module/extact_qa'
import test_q from './module/test_q'
import collect_corpus from './module/collect_corpus'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'xxx',
    error: {}
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    extact_qa,
    test_q,
    collect_corpus
  }
})
