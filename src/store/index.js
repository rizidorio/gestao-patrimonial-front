import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {
    USER_LOGGED(state, payload) {
        localStorage.removeItem("userLogged");
        localStorage.setItem("userLogged", payload);
        state.userLogged = payload;
    },
    TOKEN_EXPIRES(state, payload) {
        localStorage.removeItem("tokenExpires");
        localStorage.setItem("tokenExpires", payload);
        state.tokenExpires = payload;
    },
    CURRENT_USER_TOKEN(state, payload) {
        localStorage.removeItem("userToken");
        localStorage.setItem("userToken", payload);
        state.userToken = payload;
    }
  },
  actions: {},
  modules: {}
})
