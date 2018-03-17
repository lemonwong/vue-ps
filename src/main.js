// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/stylus/index.styl'
import axios from 'axios'
import FastClick from 'fastclick'

// import Vant from 'vant'
// import 'vant/lib/vant-css/index.css'
// Vue.use(Vant)

Vue.prototype.$http = axios

FastClick.attach(document.body)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: { App },
	template: '<App/>'
})
