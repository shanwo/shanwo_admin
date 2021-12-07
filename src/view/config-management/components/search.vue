<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-left'">
    </div>
    <div :class="prefixCls + '-right'">
      <slot name="btn"></slot>
    </div>
  </div>

</template>

<script>
import { payType } from './../page-info'

const prefixCls = 'pay-channel-list'
export default {
  name: 'pay-channel-list',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      prefixCls,
      payType
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"pay-channel-list";
.@{prefix} {
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.inputWidth {
  width: 160px;
}
</style>
