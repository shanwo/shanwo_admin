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
const prefixCls = 'config-list'
export default {
  name: 'config-list',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      prefixCls
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"config-list";
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
