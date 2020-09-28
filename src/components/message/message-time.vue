<template>
  <div class="message-time">{{timeFliter(message.time)}}</div>
</template>

<script>
import { dateTimeFliter } from "@/utils/index";
export default {
  name: 'MessageTime',
  props:{
    message:{
      type: Object,
      required: true
    }
  },
  methods: {
    //时间过滤
    timeFliter(timer) {
      let timeData = new Date(timer * 1000);
      let str = dateTimeFliter(timeData);
      return str;
    }
  }
}
</script>

<style scoped lang='less'>
.message-time{
  font-size: 14px;
  color: #999;
  text-align:center;
  margin-bottom: 10px;
}
</style>