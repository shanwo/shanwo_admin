<template>
  <div class="loading">
    {{msg}}
  </div>
</template>

<script>
export default {
  props:{
    msg:{
      type:String,
      default:"图片保存中,请耐心等待"
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
  .loading{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999999999;
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
