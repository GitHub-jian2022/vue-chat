<template>
  <div class="cell-item" @click="ItemClick">
      <img :src="VUE_APP_STATIC_URL+user.img" class="avatar" alt />

      <div class="cell-item-content">
        <div>{{user.username}}</div>
      </div>
    </div>
</template>

<script>
export default {
   name: "ContactItem",
   props: {
    user: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      VUE_APP_STATIC_URL: process.env.VUE_APP_STATIC_URL
    }
  },
  methods: {
    ItemClick() {
      this.$emit('ItemClick',this.user)
    }
  }
}
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
    align-items: center;
  }
}
</style>