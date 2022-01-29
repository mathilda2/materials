import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {message} from 'ant-design-vue'
import '../public/css/reset.css'
import '../public/css/common.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { createSimpleTransition } from 'vuetify/lib/components/transitions/createTransition'
import store from './store'
import formatDate from './util/date.js'
import BaiduMap from 'vue-baidu-map';

Vue.config.productionTip = false
Vue.use(Antd); 
Vue.use(message);
Vue.use(BaiduMap, {
  ak: 'u8DbydWfNX8lV7vC0BnqCqZWe9NAcj5V'//这里是你申请的key
})
Vue.prototype.formatDate = formatDate;
Vue.prototype.$message=message;
Vue.prototype.PICTURE_HOST =  process.env.VUE_APP_PICTURE_HOST;
console.log( process.env.VUE_APP_PICTURE_HOST);
//axios.defaults.baseURL = '/api';
axios.defaults.baseURL = process.env.VUE_APP_SERVER;
axios.defaults.withCredentials = true;//允许跨域携带cookie信息
Vue.use(VueAxios,axios);//把实例挂载上去这样就能全局调用了
const myTransition = createSimpleTransition('my-transition')  
Vue.component('my-transition', myTransition)
axios.interceptors.request.use(function(response){
  return response;
},(error)=>{//这个是状态码的轮询''
  return Promise.reject(error);
});
axios.interceptors.response.use(function(response){
  return response;
},(error)=>{//这个是状态码的轮询
		const res = error.response;
		if(res.status==403){
			message.error("未登录!");
			store.dispatch('saveUser','');
			window.location.href = '/#/index';
		}
  return Promise.reject(error);
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
