<template>
  <div class="contact">
    <van-nav-bar title="通讯录" />

    <van-index-bar :index-list="indexList">
      <div v-for="(item1,index1) in data" :key="index1">
        <van-index-anchor :index="item1[0].belong">{{item1[0].belong}}</van-index-anchor>

        <contact-item
          :user="item2"
          @ItemClick="ItemClick"
          v-for="(item2,index2) in item1"
          :key="index2"
        />
      </div>
    </van-index-bar>

    <Footer page="contact"></Footer>
  </div>
</template>

<script>
import ContactItem from "@/components/contact/contact-item";
import Footer from "@/components/Footer";
export default {
  components: {
    ContactItem,
    Footer
  },
  data() {
    return {
      data: {},
      indexList: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    ItemClick(user) {
      // console.log(user);
      let promise = this.tim.getUserProfile({
        userIDList: [user.userId] 
      });
      promise
        .then((imResponse) => {
          // console.log(imResponse.data); // 存储用户资料的数组 - [Profile]
          const userProfile = imResponse.data[0];
          let currentConversation = {
            conversationID: 'C2C' + userProfile.userID,
            type: 'C2C',
            userProfile
          }
          this.$store.commit("conversation/createcurrentConversation", currentConversation);
          this.$router.push("/room");
        })
        .catch((imError)=> {
          console.warn("getUserProfile error:", imError); // 获取其他用户资料失败的相关信息
        });
    },
    async getUsers() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let { data } = await this.$axios.get("/user/users");
      data = data.filter(user => user.userId !== userInfo.userId);
      let obj = {};
      data.forEach((item, index) => {
        // 获取首字母，转大写
        const letter = item.username.substring(0, 1).toUpperCase();
        item.belong = letter;
        if (obj[item.belong]) {
          obj[item.belong].push(item);
        } else {
          obj[item.belong] = [item];
        }
      });
      // console.log("obj", obj);
      // 构造新数组
      let arr = [];
      for (let key in obj) {
        const index = arr.indexOf(key);
        if (index > -1) {
          arr[index].push(obj[key]);
        } else {
          arr.push(obj[key]);
        }
      }
      arr.sort((a, b) => {
        return (a[0].username + "").localeCompare(b[0].username + "");
      });
      // console.log("arr", arr);

      this.data = arr;
      this.indexList = Object.keys(obj);
    }
  }
};
</script>

<style scoped lang='less'>
.contact {
  margin-bottom: 50px;
}
</style>
