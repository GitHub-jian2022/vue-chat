import Vue from "vue";
// import "vant/lib/index.css";
import App from "./App.vue";
import router from "./router/index";
// import "@/assets/style/font/iconfont.css";
import "@/assets/style/index.less";
import $axios from "@/utils/request";
import mixin from "./mixin/index";
import store from "./store/index";

import "@/components/Vant";
// rem
import "amfe-flexible";

Vue.prototype.$bus = new Vue() // event Bus 用于无关系组件间的通信。
//腾讯云im
import tim from './commen/tim/tim.js'
import TIM from 'tim-js-sdk'
Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量

// 把变量挂载到vue的原型上
Vue.prototype.$axios = $axios;

Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
