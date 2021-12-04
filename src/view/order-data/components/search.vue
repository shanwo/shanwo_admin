<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="订单号：">
        <Input v-model="value.order_sn" class="inputWidth" placeholder="请输入订单号"></Input>
      </FormItem>
      <FormItem label="三方单号：">
        <Input v-model="value.third_sn" class="inputWidth" placeholder="请输入三方单号"></Input>
      </FormItem>
      <FormItem label="用户昵称：">
        <Input v-model="value.nickname" class="inputWidth" placeholder="请输入用户昵称"></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
const prefixCls = 'order-data-list'
export default {
  name: 'order-data-list',
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
@prefix: ~"order-data-list";
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
