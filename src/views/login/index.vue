<template>
  <header class="login">
    <van-icon name="point-gift-o" class="orange mt-30 logo"></van-icon>
    <div class>
      <!-- 手机号码 -->
      <div class="handset ml-20 mr-20 flex jc-sb pb-5">
        <input v-model="user" class="f14" type="text" placeholder="手机号" />
        <!-- <input class="gray f12 bg-fff" type="button" value=" 获取验证码" /> -->
      </div>
      <!-- 密码 -->
      <div class="handset ml-20 mr-20 flex jc-sb mt-20 pb-5">
        <input type="password" v-model="password" class="f14" placeholder="密码" />
      </div>

      <!-- 登录 -->
      <button @click="login" class="butt ml-20 mr-20 fff">登录</button>
    </div>
  </header>
</template>

<script>
import tim from '../../commen/tim/tim'
import { mapState } from "vuex";
import { Toast } from 'vant';
import { encrypt } from '@/utils/crypto.js'
export default {
  data() {
    return {
      user: "user2",
      password: "123456"
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isSDKReady: state => state.user.isSDKReady
    })
  },
  methods: {
    async login() {
      if (this.user && this.password) {
        //从服务器后台获取token
        const res = await this.$axios.post('/user/login',{
          username: this.user,
          password: encrypt(this.password)
        });
        const token = res.data;
        this.$store.commit('user/updateToken',token)
        const { data: userInfo } = await this.$axios.post('/user/getUserInfo',{token})
        // console.log('userInfo',userInfo)
        if (userInfo) {
          //根据返回的userID 以及 userSig 登录tim
          this.tim
            .login({
              userID: userInfo.userId,
              userSig: userInfo.userSig
            })
            .then(res => {
              // console.log("tim用户信息", res);
              //登录成功后 更新登录状态
              this.$store.commit("user/toggleIsLogin", true);
              //更新登录用户信息
              this.$store.commit("user/updateCurrentUserProfile", userInfo);
              //自己平台的用户基础信息
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              //tim 返回的用户信息
              localStorage.setItem("userTIMInfo", JSON.stringify(res.data));
              this.$router.push('/')
            })
            .catch(async err => {
              console.log("login error:", err); // 登录失败的相关信息
              if(err.code === 70001){
                // UserSig 已过期，重新生成
                const { data: userInfo } = await this.$axios.post('user/userSig')
                this.tim.login({
                  userID: userInfo.userId,
                  userSig: userInfo.userSig
                }).then(res =>{
                  //登录成功后 更新登录状态
                  this.$store.commit("user/toggleIsLogin", true);
                  //更新登录用户信息
                  this.$store.commit("user/updateCurrentUserProfile", userInfo);
                  //自己平台的用户基础信息
                  localStorage.setItem("userInfo", JSON.stringify(userInfo));
                  //tim 返回的用户信息
                  localStorage.setItem("userTIMInfo", JSON.stringify(res.data));
                  this.$router.push('/')
                })
              }
            });
        } else {
          Toast.fail('用户不存在');
        }
      } else {
        Toast.fail('请将账户密码输入完整');
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "./login.less";
.logo {
  font-size: 100px !important;
  margin-bottom: 150px;
}
</style>

