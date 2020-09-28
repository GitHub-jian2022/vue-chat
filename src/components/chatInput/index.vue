<template>
  <div class="container">
    <div class="chatinput">
      <input type="text" v-model="textMsg" />
      <div class="right">
        <van-icon name="smile-o" size="28" @click="showEmoj" />
        <van-icon name="add-o" size="28" @click="showMore" :class="textMsg.trim() ? 'hidden':''"/>
        <!-- <div class="send" :class="!messageContent ? 'hidden':''" @click="sendText">
          <div class="btn">发送</div>
        </div> -->
        <div class="send" v-show="textMsg.trim()" @click="sendText">
          <div class="btn">发送</div>
        </div>
      </div>
    </div>

    <!-- 菜单弹窗 -->
    <div class="menu" :class="{hidden: hideMenu}">
      <div class="emojis" v-show="!hideEmoj">
        <div v-for="item in emojiName" class="emoji" :key="item" @click="chooseEmoji(item)">
          <img :src="emojiUrl + emojiMap[item]" style="width:30px;height:30px" />
        </div>
      </div>
      <div class="more" v-show="!hideMore">
        <div class="more-item" v-for="(item,index) in menus" :key="index" @click="chooseMenu(item)">
          <van-icon :name="item.icon" :size="item.size" />{{item.menusName}}
        </div>
      </div>
    </div>

    <input
      type="file"
      id="imagePicker"
      ref="imagePicker"
      accept=".jpg, .jpeg, .png, .gif"
      @change="sendImage"
      style="display:none"
    />

    <input
      type="file"
      id="videoPicker"
      ref="videoPicker"
      @change="sendVideo"
      style="display:none"
      accept=".mp4"
    />

    <input type="file" id="filePicker" ref="filePicker" @change="sendFile" style="display:none" />

  </div>
</template>

<script>
import { emojiMap, emojiName, emojiUrl } from "../../utils/emojiMap";
export default {
  props: {
    hideMenu: {
      type: Boolean,
      default: true
    },
    hideEmoj: {
      type: Boolean,
      default: true
    },
    hideMore: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      emojiMap: emojiMap,
      emojiName: emojiName,
      emojiUrl: emojiUrl,
      menus: [
        {
          icon: 'photo-o',size: '24',menusName: '相册'
        },
        {
          icon: 'video-o',size: '24',menusName: '视频'
        },
        {
          icon: 'idcard',size: '24',menusName: '文件'
        },
        // {
        //   icon: 'location-o',size: '24',menusName: '位置'
        // },
      ],
      textMsg: ''
    };
  },
  methods: {
    showEmoj() {
      this.$emit("showEmoj");
    },
    showMore() {
      this.$emit("showMore");
    },
    chooseEmoji(item) {
      this.textMsg += item
    },
    chooseMenu(item){
      if(item.menusName === '相册'){
        this.$refs.imagePicker.click();
      }else if(item.menusName === '视频'){
        this.$refs.videoPicker.click();
      }else if(item.menusName === '文件'){
        this.$refs.filePicker.click();
      }
    },
    sendText() {
      this.$emit("sendText",this.textMsg);
      this.textMsg = ""; //清空输入框
    },
    sendImage() {
      this.$emit("sendImage");
    },
    sendVideo() {
      this.$emit("sendVideo");
    },
    sendFile() {
      this.$emit("sendFile");
    }
  },
};
</script>

<style scoped lang='less'>
.hidden {
  display: none;
}
.container {
  z-index: 99;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  padding: 0 10px;
  .chatinput {
    background: #f6f6f6;
    height: 44px;
    display: flex;
    align-items: center;
    input {
      flex: 1;
      border-radius: 5px;
      border: none;
      height: 30px;
    }
    .right {
      display: flex;
      :nth-child(1) {
        margin: 0 5px;
      }
      .send {
        display: flex;
        align-items: center;
        .btn {
          width: 45px;
          height: 28px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #f09b37, #eb632c);
          color: #fff;
          border-radius: 3px;
          font-size: 12px;
        }
      }
    }
  }

  .menu {
    width: 100vw;
    height: 40vw;
    background: #f6f6f6;
    .more {
      display: flex;
      flex-wrap: wrap;
      .more-item {
        width: 25%;
        padding: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .emojis {
      height: 40vw;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      overflow-y: scroll;
      .emoji {
        height: 40px;
        width: 40px;
        box-sizing: border-box;
      }
    }
  }
}
</style>