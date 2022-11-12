<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="关键字：">
        <Input v-model="value.keyword" class="inputWidth" placeholder="请输入关键字" clearable></Input>
      </FormItem>
      <FormItem label="场地：">
        <Select v-model="value.venue_id" style="width:200px" clearable>
        <Option v-for="item in selectArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
       </Select>
      </FormItem>
      <FormItem label="">
        <slot name="btn"></slot>
      </FormItem>
    </Form>
  </div>
</div>

</template>

<script>
import { getVenueList } from '@/api/venue'
const prefixCls = 'venue-list'
export default {
  name: 'venue-list',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted () {
    getVenueList().then(res => {
      this.selectArr = res.data.lists
    })
  },
  data () {
    return {
      prefixCls,
      selectArr: []
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
