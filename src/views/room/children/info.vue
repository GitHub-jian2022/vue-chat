<template>
  <div class="roomInfo">
    <van-nav-bar class="header" title left-text="聊天信息" left-arrow @click-left="$router.back()"></van-nav-bar>

    <div class="members">
      <div class="member">
        <img class="avatar" :src="VUE_APP_STATIC_URL+currentConversation.userProfile.avatar" alt="">
        <div class="username">{{currentConversation.userProfile.nick}}</div>
      </div>
    </div>

  </div>


</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "info",
  data() {
    return {
      VUE_APP_STATIC_URL: process.env.VUE_APP_STATIC_URL
      
    };
  },  
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
    }),
  },
};
</script>

<style scoped lang='less'>
.roomInfo {
  .members {
    height: 100px;
    padding: 10px;
    background-color: #fff;
    .member {
      width: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      img.avatar {
        width: 50px;
        height: 50px;
        border-radius: 10px;
      }
    }
  }
}
</style>