import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './common/stylus/index.styl'
import axios from 'axios'
import FastClick from 'fastclick'
import VueAMap from 'vue-amap'

import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
Vue.use(Vant)
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '4496576a9569ebcbdae327bcd1e701b0',
  plugin: [
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
    'Geocoder'
  ],
  v: '1.4.4'
})

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
