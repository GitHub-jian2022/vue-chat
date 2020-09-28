<template>
  <div class="conversation">
    <van-nav-bar title="消息" />
    <div class="list-box" v-if="conversationList && conversationList.length>0">
      <conversation-item
        v-for="(item,index) in conversationList"
        :key="index"
        @ItemClick="ItemClick"
        :message="item"
      />
    </div>
    <Footer page="index"></Footer>
  </div>
</template>

<script>
import Footer from "@/components/Footer";
import ConversationItem from "@/components/conversation/conversation-item.vue";
import { mapState } from "vuex";
export default {
  components: {
    Footer,
    ConversationItem
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin,
      isSDKReady: state => state.user.isSDKReady,
      conversationList: state => state.conversation.conversationList
    })
  },
  watch: {
    isSDKReady(val) {
      console.log("isSDKReady", val);
      //isSDKReady == true
      if (val) {
        //更新用户自己的基础资料（头像+昵称+个性签名）
        this.updateUserInfo();
        //请求会话列表
        this.getConversationList();
      } else {
        this.$router.replace("/login");
      }
    }
  },
  methods: {
    //提交用户的基础信息到Im
    updateUserInfo() {
      //将已经登陆的用户信息 提交到IM中
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("userInfo", userInfo);
      let promise = this.tim.updateMyProfile({
        nick: userInfo.username,
        avatar: userInfo.img,
        gender: this.$TIM.TYPES.GENDER_MALE,
        selfSignature: "暂无个性签名",
        allowType: this.$TIM.TYPES.ALLOW_TYPE_ALLOW_ANY
      });
      promise
        .then(res => {
          console.log("提交资料成功", res.data);
        })
        .catch(imError => {
          console.log("updateMyProfile error:", imError); // 更新资料失败的相关信息
        });
    },
    //获取消息列表
    getConversationList() {
      // 拉取会话列表
      let promise = this.tim.getConversationList();
      promise
        .then(res => {
          let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
          if (conversationList.length) {
            //将返回的会话列表拼接上 用户的基本资料
            //说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
            this.$store.commit(
              "conversation/updateConversationList",
              conversationList
            );
          }
        })
        .catch(err => {
          console.warn("getConversationList error:", err); // 获取会话列表失败的相关信息
        });
    },
    ItemClick(item) {
      console.log(item);
      // 将某会话下所有未读消息已读上报
      let promise = this.tim.setMessageRead({ conversationID: item.conversationID });
      promise
        .then((imResponse)=> {
          // 已读上报成功，指定 ID 的会话的 unreadCount 属性值被置为0
          this.$store.commit("conversation/updatecurrentConversation", item);
          this.$router.push("/room");
        })
        .catch((imError)=> {
          // 已读上报失败
          console.warn("setMessageRead error:", imError);
        });
    }
  }
};
</script>

<style scoped lang='less'>
.conversation {
  margin-bottom: 50px;
}
</style>
