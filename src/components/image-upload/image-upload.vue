<template>
  <div :class="prefixCls">
        <Upload 
            :action="`${config.baseUrl.dev}/upload/file`" 
            :headers="{
                Authorization: `Bearer ${this.token}`
            }"
            :on-success="uploadSuccess">
            <div :class="prefixCls + '-box'">
                <img :src="value" width="30">
            </div>
        </Upload>
  </div>
</template>

<script>
const prefixCls = "image-upload";
import config from '@/config/index'
export default {
    name: "image-upload",
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
        token () {
            return this.$store.state && this.$store.state.user && this.$store.state.user.token;
        }
    },
    methods: {
        uploadSuccess (args) {
            this.$emit('on-change',args);
        }
    }
}
</script>

<style lang="less" scoped>
.mr10{
  margin-right: 10px;
}
@prefix: ~"image-upload";
.@{prefix}{
    &-box{
        width: 32px;
        height: 32px;
        
        border: 1px dashed #999;
    }
  
}
</style>
