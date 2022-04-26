import Vue from 'vue'
import Vuex from 'vuex'
import * as types from '../config/MutationTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  // 引入其他模块
  modules: {},
  state: {
    count: 0
  },
  mutations: {
    [types.COUNT_CHANGE](state, payload) {
      state.count = payload
    }
  },
  getters: {
    count: state => state.count
  },
  actions: {
    changeCountAsync({ commit }, value) {
      commit(types.COUNT_CHANGE, value)
    }
  }
})
