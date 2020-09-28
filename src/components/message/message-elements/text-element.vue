<template>
  <div>
    <template v-for="(item, index) in contentList">
      <span :key="index" v-if="item.name === 'text'">{{ item.text }}</span>
      <img v-else-if="item.name === 'img'" :src="item.src" width="20px" height="20px" :key="index"/>
    </template>
  </div>
</template>

<script>
import { decodeText } from '../../../utils/decodeText'
export default {
  name: 'TextElement',
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
  },
  computed: {
    contentList() {
      return decodeText(this.payload)
    }
  }
};
</script>

<style>
</style>