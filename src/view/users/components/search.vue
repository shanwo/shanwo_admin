<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="用户类型：">
        <Select v-model="value.type" clearable class="inputWidth">
          <Option v-for="item of userType" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="用户关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="请输入用户昵称/手机号"></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
const prefixCls = 'users-list'
export default {
  name: 'users-list',
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
@prefix: ~"users-list";
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
