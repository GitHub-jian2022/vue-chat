<template>
  <div class="center">
    <!-- 头部 -->
    <header>
      <div class="beijin"></div>
      <div class="flex aic users pixed" style="width:50%;">
        <img :src="!isLogin ? avatarUrl: (VUE_APP_STATIC_URL+currentUserProfile.img)" class="imege" />
        <router-link v-if="!isLogin" to="/login" class="f16 fff ml-20">立即登录</router-link>
        <span v-else class="f16 fff ml-20">{{currentUserProfile.username}}</span>
      </div>
    </header>

    <!-- 主体 -->
    <main class="mt-10">
      <div class="bg-fff">
        <van-cell title="我的订单" isLink to="/order"></van-cell>
        <van-cell title="收藏" isLink></van-cell>
        <van-cell title="钱包" isLink></van-cell>
        <van-cell title="设置" isLink to="/my/set"></van-cell>
      </div>
    </main>

    <Footer page="my" />
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import { mapGetters } from "vuex";
export default {
  components: {
    Footer,
  },
  data(){
    return {
      avatarUrl: require('../../../assets/img/personal/tx.jpg'),
      VUE_APP_STATIC_URL: process.env.VUE_APP_STATIC_URL
    }
  },
  computed: {
    ...mapGetters(["currentUserProfile", "isLogin"]),
  },
};
</script>

<style lang="less" scoped>
@import "./center.less";
</style>