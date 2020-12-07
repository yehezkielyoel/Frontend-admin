import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

Vue.config.productionTip = false

Vue.use(jsPDF)
// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
