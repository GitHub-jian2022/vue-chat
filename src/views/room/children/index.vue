<template>
  <div class="room">
    <van-nav-bar class="header" title :left-text="NavName" left-arrow @click-left="$router.back()">
      <template #right>
        <router-link :to="{name: 'roomInfo'}">
          <van-icon name="ellipsis" size="16" />
        </router-link>
      </template>
    </van-nav-bar>

    <van-pull-refresh
      id="van-pull-refresh"
      v-model="isLoading"
      :success-text="isCompleted ? '已加载全部':'刷新成功'"
      @refresh="loadHistory"
    >
      <message-list
        :currentMessageList="currentMessageList"
        :userInfo="userInfo"
        :toUserInfo="currentConversation.userProfile"
        @onAvatarClick="onAvatarClick"
      />
    </van-pull-refresh>
    <!-- 底部输入框 -->
    <chat-input
      :hideMenu="hideMenu"
      :hideEmoj="hideEmoj"
      :hideMore="hideMore"
      @showEmoj="showEmoj"
      @showMore="showMore"
      @sendText="sendText"
      @sendImage="sendImage"
      @sendVideo="sendVideo"
      @sendFile="sendFile"
    />
  </div>
</template>

<script>
import MessageList from "@/components/message/message-list.vue";
import chatInput from "@/components/chatInput/index.vue";
import { mapState, mapGetters } from "vuex";
export default {
  name: "room",
  components: {
    MessageList,
    chatInput
  },
  data() {
    return {
      hideMenu: true,
      hideEmoj: true,
      hideMore: true,
      count: 10,
      userInfo: {},
      isLoading: false
    };
  },
  computed: {
    ...mapState({
      currentConversation: state => state.conversation.currentConversation,
      currentUnreadCount: state =>
        state.conversation.currentConversation.unreadCount,
      currentMessageList: state => state.conversation.currentMessageList,
      nextReqMessageID: state => state.conversation.nextReqMessageID,
      isCompleted: state => state.conversation.isCompleted,
    }),
    ...mapGetters("conversation", ["toAccount", "currentConversationType"]),

    NavName() {
      if (this.currentConversation.type === "C2C") {
        return this.currentConversation.userProfile.nick || this.toAccount;
      } else if (this.currentConversation.type === "GROUP") {
        return this.currentConversation.groupProfile.name || this.toAccount;
      } else if (this.currentConversation.conversationID === "@TIM#SYSTEM") {
        return "系统通知";
      }
      return this.toAccount;
    }
  },
  methods: {
    // 加载初始页面消息
    getMsgList() {
      // 历史消息列表
      let conversationID = this.currentConversation.conversationID;
      let promise = this.tim.getMessageList({
        conversationID: conversationID,
        count: this.count
      });
      promise.then(res => {
        this.$store.commit(
          "conversation/pushCurrentMessageList",
          res.data.messageList
        );
        this.$store.commit(
          "conversation/updateNextReqMessageID",
          res.data.nextReqMessageID
        );
        this.$store.commit(
          "conversation/updateIsCompleted",
          res.data.isCompleted
        )
      });
      // 滚动到底部
      this.$bus.$emit("scroll-bottom");
    },
    loadHistory() {
      this.isLoading = true;
      // 更多消息列表
      let conversationID = this.currentConversation.conversationID;
      let promise = this.tim.getMessageList({
        conversationID: conversationID,
        nextReqMessageID: this.nextReqMessageID,
        count: this.count
      });
      promise.then(res => {
        console.log(res.data)
        this.$store.commit(
          "conversation/unshiftCurrentMessageList",
          res.data.messageList
        );
        // 用于续拉，分页续拉时需传入该字段。
        this.$store.commit(
          "conversation/updateNextReqMessageID",
          res.data.nextReqMessageID
        );
        this.$store.commit(
          "conversation/updateIsCompleted",
          res.data.isCompleted
        )
        this.isLoading = false;
      });
    },
    showEmoj() {
      if (!this.hideMenu && this.hideEmoj) {
        this.hideEmoj = !this.hideEmoj;
        this.hideMore = !this.hideMore;
        return;
      }
      this.hideMenu = !this.hideMenu;
      this.hideEmoj = !this.hideEmoj;
    },
    showMore() {
      if (!this.hideMenu && this.hideMore) {
        this.hideEmoj = !this.hideEmoj;
        this.hideMore = !this.hideMore;
        return;
      }
      this.hideMenu = !this.hideMenu;
      this.hideMore = !this.hideMore;
    },
    //隐藏抽屉栏
    hideDrawer() {
      this.hideMenu = true;
      this.hideEmoj = true;
      this.hideMore = true;
    },
    // 点击头像
    onAvatarClick(userInfo) {
      console.log("onAvatarClick", userInfo);
    },
    // 发送文字消息
    sendText(textMsg) {
      this.hideDrawer(); //隐藏抽屉
      if (!textMsg || textMsg.trim().length === 0) {
        return;
      }

      let message = this.tim.createTextMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          text: textMsg
        }
      });
      this.$store.commit("conversation/pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(res => {
          this.$bus.$emit("scroll-bottom");
        })
        .catch(function(imError) {
          // 发送失败
          console.warn("sendMessage error:", imError);
        });
    },
    // 发送图片
    sendImage() {
      this.hideDrawer();
      const message = this.tim.createImageMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById("imagePicker") // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("conversation/pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          let imagePickerNode = document.getElementById("imagePicker")
          imagePickerNode.value = null;
          this.$bus.$emit("scroll-bottom");
        })
        .catch(imError => {
          console.warn("sendMessage error:", imError);
        });
    },
    // 发送视频
    sendVideo() {
      this.hideDrawer();
      const message = this.tim.createVideoMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById("videoPicker") // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("conversation/pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          let videoPickerNode = document.getElementById("videoPicker")
          videoPickerNode.value = null;
          this.$bus.$emit("scroll-bottom");
        })
        .catch(imError => {
          console.warn("sendMessage error:", imError);
        });
    },
    //发送文件
    sendFile() {
      this.hideDrawer();
      const message = this.tim.createFileMessage({
        to: this.toAccount,
        conversationType: this.currentConversationType,
        payload: {
          file: document.getElementById("filePicker") // 或者用event.target
        },
        onProgress: percent => {
          this.$set(message, "progress", percent); // 手动给message 实例加个响应式属性: progress
        }
      });
      this.$store.commit("conversation/pushCurrentMessageList", message);
      this.tim
        .sendMessage(message)
        .then(() => {
          let filePickerNode = document.getElementById("filePicker")
          filePickerNode.value = null;
          this.$bus.$emit("scroll-bottom");
        })
        .catch(imError => {
          console.warn("sendMessage error:", imError);
        });
    },
    // 直接滚到底部
    scrollMessageListToButtom() {
      this.$nextTick(() => {
        let messageListNode = document.getElementById("message-list");
        if (!messageListNode) {
          console.log("messageListNode undefined");
          return;
        } 
        messageListNode.scrollTop = messageListNode.scrollHeight;
      });
    }
  },
  mounted() {
    this.$bus.$on("scroll-bottom", this.scrollMessageListToButtom);
    this.$bus.$on("hideDrawer", this.hideDrawer);
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    console.log('this.userInfo: ', this.userInfo);
    this.getMsgList();
  }
};
</script>

<style scoped lang='less'>
.room {
  // background: #fff;
  padding-top: 46px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 46px;
    background: #fff;
  }
}
</style>