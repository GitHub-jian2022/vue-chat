<template>
  <div class="page">
    <van-nav-bar title="设置" left-text="返回" left-arrow @click-left="back"></van-nav-bar>

    <van-cell-group class="mt-10">
      <van-cell title="账号" :value="userInfo.username"></van-cell>
      <van-cell isLink title="登录密码" value="******"></van-cell>
    </van-cell-group>

    <!-- 退出登录 -->
    <div class="logout f16 flex fcc bg-fff fixed w100pc" @click="logout">
      <p class="blue">退出登录</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Dialog } from 'vant';
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {
    back() {
      history.back();
    },
    async logout() {
      Dialog.confirm({
        title: "退出登录",
      }).then(() => {
          this.$store.commit("user/reset");
          this.$router.push("/login");
          this.tim
            .logout()
            .then(res => {
              console.log("tim退出成功");
            })
            .catch(err => {
              console.log("退出失败");
            });
        })
        .catch(() => {
          // on cancel
        });
      
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  }
};
</script>

<style lang="less" scoped>
.logout {
  bottom: 0;
  height: 50px;
  color: #ff5f16;
}
</style>

