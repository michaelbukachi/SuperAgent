// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import BootstrapVue from 'bootstrap-vue'
import * as firebase from 'firebase'
import SimpleVueValidation from 'simple-vue-validator'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(SimpleVueValidation)
Vue.use(VueProgressBar, {
  color: 'rgb(245, 237, 214)',
  failedColor: 'red',
  height: '2px'
})
Vue.config.productionTip = false

const config = {
  // apiKey: process.env.API_KEY,
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
}

firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
