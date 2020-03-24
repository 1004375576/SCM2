// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon/iconfont.css';
import router from './router/index'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;
Vue.prototype.$http = axios;
// axios 配置
axios.defaults.headers.post['Content-Type'] = 'application/json';
//Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.config.productionTip = false
import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //components: { App },
  //template: '<App/>',
  render: h => h(App)
})






