import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';
import router from "./router";
import moment from 'moment'

Axios.defaults.baseURL =  process.env('API_BASE_URL') || 'http://localhost:8099';

Vue.config.productionTip = false

Vue.filter('shortDate', function (value) {
  const date = moment(value);
  return date.format("YYYY-MM-DD")
});

Vue.filter('shortTime', function (value) {
  const date = moment(value);
  return date.format("HH:mm")
});

Vue.filter('twoDecimals', function (value) {
  return value.toFixed(2);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
