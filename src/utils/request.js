import axios from "axios";
import store from "../store";
import router from "../router";
import { Toast } from 'vant';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL, // api 的 VUE_APP_URL
  timeout: 50000 // 请求超时时间(因为需要调试后台,所以设置得比较大)
});

// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
  config => {
    const { token } = store.state.user
    if (token) {
      // 给请求头添加laohu-token
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
  },
  error => {
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器,数据返回后进行一些处理
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    if (res.code == "401") {
      Toast.fail(res.msg);
    } else if (res.code == "403") {
      // code为403代表token已经失效,
      // 提示用户,然后跳转到登陆页面
      router.push("/login");
    } else {
      console.log(res.msg)
    }
    return res;
  },
  error => {
    Promise.reject("网络异常");
  }
);
export default service;
