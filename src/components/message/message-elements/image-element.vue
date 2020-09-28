<template>
  <img
    class="img"
    mode="aspectFill"
    :src="payload.imageInfoArray[0].url"
  />
</template>

<script>
export default {
  name: "ImageElemnt",
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped lang='less'>
</style>