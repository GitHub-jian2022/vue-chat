<template>
  <div id="message-list"  class="message-list" @click="msgListClick">
    <div v-for="(item,index) in currentMessageList" :key="index" class="row">
      <MessageTime :message="item" v-if="timeFliter(item,index)" />

      <!-- 自己发出的消息 -->
      <div class="my" v-if="item.flow=='out'">
        <!-- 左-消息 -->
        <div class="left">
          <!-- 文字消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_TEXT" class="bubble">
            <!-- <div v-html="item.payload.text"></div> -->
            <text-element :payload="item.payload" :message="item" />
          </div>
          <!-- 图片消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_IMAGE" class="bubble">
            <img class="img" mode="aspectFill" :src="item.payload.imageInfoArray[0].url"  @click="onMsgClick(item)" />
          </div>
          <!-- 视频消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_VIDEO" class="bubble">
            <video-element :payload="item.payload" :message="item" />
          </div>
          <!-- 音频消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_AUDIO" class="bubble">
            <div class="voice">
              <sound-element :payload="item.payload" :message="item" />
            </div>
          </div>
          <!-- 文件消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_FILE" class="bubble">
            <file-element :payload="item.payload" :message="item" />
          </div>
        </div>
        <!-- 右-头像 -->
        <div class="right">
          <img :src="VUE_APP_STATIC_URL+userInfo.img" @click="onAvatarClick(userInfo)" />
        </div>
      </div>
      <!-- 别人发出的消息 -->
      <div class="other" v-else>
        <!-- 左-头像 -->
        <div class="left">
          <img :src="VUE_APP_STATIC_URL+toUserInfo.avatar" @click="onAvatarClick(toUserInfo)" />
        </div>
        <!-- 右-用户名称-时间-消息 -->
        <div class="right">
          <div class="username">
            <div class="name">{{toUserInfo.nick}}</div>
          </div>
          <!-- 文字消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_TEXT" class="bubble">
            <!-- <div v-html="item.payload.text"></div> -->
            <text-element :payload="item.payload" :message="item" />
          </div>
          <!-- 图片消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_IMAGE" class="bubble">
            <img
              class="img"
              mode="aspectFill"
              :src="item.payload.imageInfoArray[0].url"
              @click="onMsgClick(item)"
            />
            <!-- <image-element :payload="item.payload" :message="item" /> -->
          </div>
          <!-- 视频消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_VIDEO" class="bubble">
            <video-element :payload="item.payload" :message="item" />
          </div>
          <!-- 音频消息 -->
          <div v-if="item.type==$TIM.TYPES.MSG_AUDIO" class="bubble">
            <div class="voice">
              <sound-element :payload="item.payload" :message="item" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 预览图片 -->
    <van-image-preview v-model="show" :images="images">
    </van-image-preview>
  </div>
</template>

<script>
import TextElement from './message-elements/text-element';
import ImageElemnt from './message-elements/image-element';
import VideoElement from "./message-elements/video-element";
import SoundElement from "./message-elements/sound-element";
import FileElement from './message-elements/file-element'
import MessageTime from "./message-time";
export default {
  name: 'MessageList',
  props: {
    currentMessageList: {
      type: Array,
      default: () => []
    },
    userInfo: {
      type: Object,
      default: () => {}
    },
    toUserInfo: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    TextElement,
    ImageElemnt,
    VideoElement,
    SoundElement,
    FileElement,
    MessageTime
  },
  data(){
    return {
      show: false,
      images: [],
      VUE_APP_STATIC_URL: process.env.VUE_APP_STATIC_URL
    }
  },
  methods: {
    msgListClick() {
      this.$bus.$emit("hideDrawer");
    },
    //判断是否显示时间
    timeFliter(item, index) {
      let flag = false;
      if (index === 0 ) {
        flag = true
        return flag
      }

      if (index < this.currentMessageList.length) {
        let before_time = this.currentMessageList[index - 1].time;
        let after_time = item.time;
        //相差秒
        const diff_time = after_time - before_time;
        //大于5分钟显示时间
        flag = diff_time > 5 * 60 ? true:false;
      }
      return flag
    },
    onAvatarClick(userInfo) {
      this.$emit("onAvatarClick", userInfo);
    },
    onMsgClick(message) {
      const url = message.payload.imageInfoArray[0].url;
      this.images = [url]
      this.show = true
    }
  }
};
</script>

<style scoped lang='less'>
.message-list {
  padding: 0 10px;
  height: calc(100vh - 90px);
  overflow-y: scroll;
  .row {
    margin: 20px 0;
    .my .left,
    .other .right {
      width: 100%;
      display: flex;
      .bubble {
        max-width: 70%;
        min-height: 25px;
        border-radius: 5px;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 16px;
        word-break: break-word;
        position: relative;
        img {
          background-color: transparent;
          padding: 0;
          overflow: hidden;
          max-width: 175px;
          max-height: 175px;
        }
      }
    }
    .my .right,
    .other .left {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 5px;
      }
    }
    .my {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .left {
        min-height: 40px;

        align-items: center;
        justify-content: flex-end;
        .bubble {
          // background-color: #f06c7a;
          background-color: #98e165;
          color: #fff;
        }
      }
      .right {
        margin-left: 8px;
      }
    }
    .other {
      width: 100%;
      display: flex;
      .left {
        margin-right: 8px;
      }
      .right {
        flex-wrap: wrap;
        .username {
          width: 100%;
          height: 22px;
          font-size: 12px;
          color: #999;
          display: flex;
          .name {
            margin-right: 25px;
          }
        }
        .bubble {
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>