import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootsrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Import Css
import './assets/css/style.css'

import VueToast from 'vue-toast-notification'
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css'

// 1. Import Chart.js so you can use the global Chart object
// import Chart from 'chart.js'
// 2. Import the `generateChart()` method to create the vue component.
// import { generateChart } from 'vue-chartjs'

Vue.config.productionTip = false
// import 'vue-toast-notification/dist/theme-sugar.css';
// Vue.use(Chart)
// Vue.use(generateChart)
Vue.use(VueToast)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
