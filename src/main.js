
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import 'normalize.css/normalize.css'

Vue.use(VueAxios, axios)
Vue.config.productionTip = false


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
