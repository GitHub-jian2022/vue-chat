<template>
  <div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  created() {
    // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
    this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
    // 收到新消息
    this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
    // 会话列表更新
    this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
      this.$store.commit("conversation/updateConversationList", event.data);
    });
  },
  methods: {
    onReadyStateUpdate({ name }) {
      const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
      //自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
      this.$store.commit("user/toggleIsSDKReady", isSDKReady);
      //sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
    },

    onReceiveMessage({ data: messageList }) {
      // this.handleAt(messageList);
      this.$store.commit("conversation/pushCurrentMessageList", messageList);
    }
    //根据消息列表请求聊天对象的用户信息 并完成数据拼接
  }
};
</script>



