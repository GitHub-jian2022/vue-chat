<template>
  <div class="video">
    <video :src="payload.videoUrl" controls class="video" ></video>
  </div>
</template>

<script>
export default {
  name: "VideoElement",
  props: {
    payload: {
      type: Object,
      required: true
    },
    message: {
      type: Object,
      required: true
    },
    methods: {
      videoError(e) {
        console.log(e.target.error.message)
      }
    }
  }
};
</script>

<style scoped lang='less'>
.video {
  width: 100%;
  max-height: 300px;
}
</style>