<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="类型：">
        <Select v-model="value.type" clearable class="inputWidth">
          <Option v-for="item of payType" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="分销ID：">
        <Input v-model="value.channel" class="inputWidth" placeholder="请输入分销人ID"></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
import { payType } from '../page-info'
const prefixCls = 'pay-list'
export default {
  name: 'pay-list',
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
