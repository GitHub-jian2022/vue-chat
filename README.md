后台地址：
https://github.com/GitHub-jian2022/vue-chat-admin

#### 启动项目
1. npm i 安装依赖
1. npm run serve 启动项目

>#### 核心知识体系简介
1. vue-cli3 脚手架
    * 创建项目
    * 开发环境和生产环境配置
    
2. vue-router 路由
    * 路由配置
    * 子路由配置
    * 路由守卫，设置页面标题和根据登录状态判断是否允许进入特定页面
    * 对router-link使用active-class,高亮当前路由
    
3. vuex 跨组件通信
    * vuex 配置
    * vuex 持久化
    * vuex 使用
    
4. rem 移动端适配
    * 通过 amfe-flexibe 设置 root 元素的字体大小
    * 通过 pxtorem 把 px 转成 rem, 无需手动书写 rem
    
5. axios 配置
    * 使用拦截器配置 baseURL 和给请求头加上 token
    * 使用拦截器对返回的数据进行处理
    * 挂载到 vue 原型上，方便使用
    
6. promise 使用
    
    * 在项目中使用 async await 把异步变成同步
    
7. 有赞 vant-ui 库
    * 导航栏
    * 单元格
    * loading
    * ......
    
8. 使用keep-alive组件缓存某些组件(新增)

9. 添加小型服务器接口,用来编写本项目所需接口

    

>####  vue-cli3 脚手架
1. 具体操作,请移步[vue-cli3文档官网]( [https://cli.vuejs.org/zh/guide/installation.html](https://links.jianshu.com/go?to=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Finstallation.html)
)
2. **开发环境和生产环境配置**
  * 根目录新建两文件 .env.development => 开发环境配置  .env.production => 生产环境配置
文件内容

3. **package.json 配置**
vue-cli3默认已经给你配置好了model, 开发环境对应development, 生产环境对应production,如果你不知道model,请移步[webpack文档官网]([https://www.webpackjs.com/](https://www.webpackjs.com/)
)
4. 在你的项目中，通过  process.env.VUE_APP_URL 可以访问到你在环境配置文件中设置的变量

>####  vue-router 路由

>####  vuex 跨组件通信
1. 项目中有以下几个地方用到了 vuex
    * 设置登录状态
    * 设置用户名
    * 保存 token
    * 会话列表
    * 聊天室
2. 以登录为里，做个简单说明
登录成功时，修改登陆状态为 true
退出登录时，修改登录状态为 false

3. vuex 持久化
    * 使用 vuex-persistedstate 插件对 vuex 的状态持久化
    * 等你的页面刷新时，状态依然存在
    * 本质上是这个插件帮你把状态都存到了 localStorage

>#### rem 移动端适配
1. 安装 amfe-flexible 插件 ```npm i amfe-flexible --save-dev```
2. 在 main.js 中导入
3. 配置 pxtorem 插件，能帮你自动把 rem 转成 px, 具体配置如下，在项目根目录下的 vue.config.js（没有则新建）

>####  axios 配置
1. axios 拦截器
能帮我们对数据进行一些统一的处理，比如后台给我们的数据里都是把数据包在 data 对象里面，而使用 axios, 则又会再用 data 把返回的数据再包一层，如果不统一处理以下，用起来很不爽。
2. 设置请求头，后台识别用户经常使用 token, 我们登陆的时候能拿到后台返回的 token, 然后存入 store 里，当我们发送请求时，我们可以给请求头统一加上 token
3. 把 axios 的实例挂载到 vue 的实例上


>


