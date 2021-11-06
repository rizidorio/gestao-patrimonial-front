import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import i18n from './i18n';
import { VueMaskDirective } from "v-mask";

Vue.config.productionTip = false;
Vue.directive("mask", VueMaskDirective);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
