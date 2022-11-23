<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="类型：">
        <Select v-model="value.type" class="inputWidth">
          <Option v-for="item of classificationType" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="关键字" clearable></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>
</template>

<script>
import { classificationType } from '../page-info'

const prefixCls = 'classification-list'
export default {
  name: 'classification-list',
  data () {
    return {
      prefixCls,
      classificationType
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"classification-list";
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
