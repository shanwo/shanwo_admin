<template>
<div :class="prefixCls">
  <Upload
      :action=this.action+'/upload/file'
      :headers="{Authorization: `Bearer ${this.token}`}"
      :on-success="uploadSuccess">
    <div :class="prefixCls + '-box'">
      <img :src="value" width="256">
    </div>
  </Upload>
</div>
</template>

<script>
import config from '@/config/index'

const prefixCls = 'image-upload'
export default {
  name: 'image-upload',
  data () {
    return {
      prefixCls,
      config
    }
  },
  props: {
    value: ''
  },
  computed: {
    action () {
      if (window.location.hostname === 'shanwo.cc') {
        return config.baseUrl.pro
      } else {
        return config.baseUrl.dev
      }
    },
    token () {
      return this.$store.state && this.$store.state.user && this.$store.state.user.token
    }
  },
  methods: {
    uploadSuccess (args) {
      this.$emit('on-change', args)
    }
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"image-upload";
.@{prefix} {
  &-box {
    width: 258px;
    border: 1px dashed #999;
  }

}
</style>
