<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="请输入用户昵称/手机号"></Input>
      </FormItem>
      <FormItem label="创建人：">
        <Input v-model="value.nickname" class="inputWidth" placeholder="请输入创建人"></Input>
      </FormItem>
      <FormItem label="用户类型：">
        <Select v-model="value.type" class="inputWidth">
          <Option v-for="item of userType" :value="item.type" :key="item.type">{{ item.typeName }}</Option>
        </Select>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
import { userType } from './../page-info'

const prefixCls = 'shan-page-management-list'
export default {
  name: 'shan-page-management-list',
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
      userType
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"shan-page-management-list";
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
