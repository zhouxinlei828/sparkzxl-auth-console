import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import './plugins'
import '@/layouts/export'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { Icon } from 'ant-design-vue'
import Iframe from '@/components/Iframe'
import 'ant-design-vue/dist/antd.css'
const iconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_946821_x3edyjj0q7b.js',
})
Vue.config.productionTip = false
Vue.component('TreeSelect', Treeselect)
Vue.component('IconFont', iconFont)
Vue.component('Iframe', Iframe)
new Vue({
  el: '#vue-admin-beautiful',
  router,
  store,
  render: (h) => h(App),
})
