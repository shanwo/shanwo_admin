<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="关键字"></Input>
      </FormItem>
      <FormItem label="用户ID：">
        <Input v-model="value.user_id" class="inputWidth" placeholder="创建用户ID"></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
const prefixCls = 'shan-page-list'
export default {
  name: 'shan-page-list',
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
@prefix: ~"shan-page-list";
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
