<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="类型：">
        <Select v-model="value.start_type" class="inputWidth">
          <Option v-for="item of pushType" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="关键字"></Input>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
import { pushType } from '../page-info'
const prefixCls = 'push-list'
export default {
  name: 'push-list',
  props: {
    value: {
      start_type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      prefixCls,
      pushType
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"push-list";
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
