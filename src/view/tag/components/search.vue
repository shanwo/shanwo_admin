<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="类型：">
        <Select v-model="value.type" clearable class="inputWidth">
          <Option v-for="item of type" :value="item.type" :key="item.type">{{ item.name }}</Option>
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
import { type } from '../page-info'

const prefixCls = 'tag-list'
export default {
  name: 'tag-list',
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
      type
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"tag-list";
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
