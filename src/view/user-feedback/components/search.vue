<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="处理状态：">
        <Select v-model="value.type" class="inputWidth">
          <Option v-for="item of feedbackStatus" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="用户关键字：">
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
import { feedbackStatus } from './../page-info'

const prefixCls = 'user-feedback-list'
export default {
  name: 'user-feedback-list',
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
      feedbackStatus
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"user-feedback-list";
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
