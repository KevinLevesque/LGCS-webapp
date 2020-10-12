import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios';
import router from "./router";
import moment from 'moment'
import VueGoodTablePlugin from 'vue-good-table';
import store from "./store";
import Cookies from "js-cookie";
import 'vue-good-table/dist/vue-good-table.css'
import Auth from "./api/Auth";



Axios.defaults.baseURL =  process.env.VUE_APP_API_BASE_URL || 'http://localhost:8099';

if(Cookies.get('token')){
  Auth.setAuthorizationHeader(Cookies.get('token'));
}

Vue.use(VueGoodTablePlugin);

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
  store,
  render: h => h(App),
}).$mount('#app')
