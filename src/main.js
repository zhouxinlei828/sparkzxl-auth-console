import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Table, Icon } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const iconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_946821_3adpo2zdqgf.js',
})
Vue.config.productionTip = false
Vue.use(Table)
Vue.component('TreeSelect', Treeselect)
Vue.component('IconFont', iconFont)
new Vue({
  el: '#vue-admin-beautiful',
  router,
  store,
  render: (h) => h(App),
})
