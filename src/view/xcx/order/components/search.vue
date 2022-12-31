<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="场地：">
        <Select v-model="value.venue_id" class="inputWidth" clearable>
          <Option v-for="item in selectArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="状态：">
        <Select v-model="value.status" class="inputWidth" clearable>
          <Option v-for="item of orderStatus" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="订单号：">
        <Input v-model="value.order_sn" class="inputWidth" placeholder="请输入订单号" clearable></Input>
      </FormItem>
      <FormItem label="三方单号：">
        <Input v-model="value.third_sn" class="inputWidth" placeholder="请输入三方单号" clearable></Input>
      </FormItem>
      <FormItem label="用户ID：">
        <Input v-model="value.user_id" class="inputWidth" placeholder="请输入用户昵称" clearable></Input>
      </FormItem>
      <!--      <FormItem label="支付时间：">-->
      <!--        <Date-picker @on-change="timeChange" :value="searchInfo.time" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="选择日期" style="width: 200px"></Date-picker>-->
      <!--      </FormItem>-->
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
import { getVenueSelect } from '@/api/venue'
import { orderStatus } from '../page-info'

const prefixCls = 'order-list'
export default {
  name: 'order-list',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted () {
    getVenueSelect().then(res => {
      this.selectArr = res.data.lists
    })
  },
  data () {
    return {
      prefixCls,
      orderStatus,
      selectArr: []
    }
  },
  methods: {
    timeChange (arg) {
      this.$set(this, 'searchTimeRange', arg)
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"order-list";
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
