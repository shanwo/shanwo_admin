<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="类型：">
        <Select v-model="value.type" clearable class="inputWidth">
          <Option v-for="item of replyType" :value="item.type" :key="item.type">{{ item.name }}</Option>
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
import { replyType } from '../page-info'

const prefixCls = 'reply-list'
export default {
  name: 'reply-list',
  data () {
    return {
      prefixCls,
      replyType
    }
  },
  props: {
    value: {
      type: 0,
      default: () => {
      }
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"reply-list";
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
