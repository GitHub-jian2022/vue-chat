<template>
  <van-swipe-cell @click="onCellClick" :name="message.conversationID">
    <div class="cell-item" @click="ItemClick">
      <img :src="VUE_APP_STATIC_URL+userProfile.avatar" class="avatar" alt />

      <div class="cell-item-content">
        <div class="cell-item-content-l">
          <div>{{userProfile.nick}}</div>
          <!-- <div v-html="lastMessage.payload.text"></div> -->
          <div class="cell-item-content-l-lastmessage">
            <template v-for="(item, index) in contentList">
              <span :key="index" v-if="item.name === 'text'">{{ item.text }}</span>
              <img
                v-else-if="item.name === 'img'"
                :src="item.src"
                width="20px"
                height="20px"
                :key="index"
              />
            </template>
          </div>
        </div>
        <div class="cell-item-content-r">
          <div class="time">{{timeFliter(lastMessage.lastTime)}}</div>
          <!-- 未读消息 -->
          <div class="unreadCount" v-if="message.unreadCount > 0">{{message.unreadCount}}</div>
        </div>
      </div>
    </div>
    <template #right>
      <van-button square text="删除" type="danger" class="delete-button" />
    </template>
  </van-swipe-cell>
</template>

<script>
import { dateTimeFliter } from "../../utils/index";
import { decodeText } from "../../utils/decodeText";
import { Dialog } from "vant";

export default {
  name: "ConversationItem",
  props: {
    message: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      VUE_APP_STATIC_URL: process.env.VUE_APP_STATIC_URL
    }
  },
  computed: {
    userProfile() {
      return this.message.userProfile;
    },
    lastMessage() {
      return this.message.lastMessage;
    },
    contentList() {
      return decodeText(this.lastMessage.payload);
    }
  },
  methods: {
    //时间过滤
    timeFliter(timer) {
      let timeData = new Date(timer * 1000);
      let str = dateTimeFliter(timeData);
      return str;
    },
    ItemClick() {
      this.$emit("ItemClick", this.message);
    },
    // position 为关闭时点击的位置
    onCellClick(position) {
      if (position === "right") {
        let promise = this.tim.deleteConversation(this.message.conversationID);
        promise
          .then((imResponse) => {
            //删除成功。
            const { conversationID } = imResponse.data; // 被删除的会话 ID
            console.log('conversationID',conversationID)
          })
          .catch((imError) => {
            console.warn("deleteConversation error:", imError); // 删除会话失败的相关信息
          });
      }
    }
  }
};
</script>

<style scoped lang="less">
.cell-item {
  margin: 0;
  padding: 10px;
  background-color: @white;
  display: flex;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .cell-item-content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    .cell-item-content-l {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .cell-item-content-l-lastmessage {
        display: flex;
        overflow: hidden;
        white-space: nowrap; 
        text-overflow: ellipsis;
        font-size: 14px;
        color: #999;
      }
    }
    .cell-item-content-r {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      color: #999;
      .time {
        font-size: 14px;
      }
      .unreadCount {
        width: 20px;
        line-height: 20px;
        border-radius: 50%;
        font-size: 14px;
        text-align: center;
        color: #fff;
        background-color: #f00;
      }
    }
  }
}
.delete-button {
  height: 100%;
}
</style>