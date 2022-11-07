<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="请输入关键字" clearable></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
const prefixCls = 'venue-list'
export default {
  name: 'venue-list',
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
@prefix: ~"pay-list";
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
