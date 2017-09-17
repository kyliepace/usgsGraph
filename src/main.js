// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Icon from 'vue-awesome/components/Icon'

Chart.defaults.global.defaultFontFamily = "'Hind', Helvetica, Arial, sans-serif";
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = '#2c3e50';

Vue.use(VueChartkick, { Chartkick })
// globally (in your main .js file)
Vue.component('icon', Icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
