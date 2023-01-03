<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="orderList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a v-if="examineStatus(row.payated_at)" @click="toRefund(row.order_sn)">退款</a>
      <a @click="toDetail(row.order_sn)">详情</a>
    </template>
  </Table>
</div>
</template>
<script>
import { columns } from '../page-info'

const prefixCls = 'order-list'
export default {
  name: 'order-list',
  data () {
    return {
      prefixCls,
      columns
    }
  },
  props: {
    orderList: {
      default: () => []
    }
  },
  methods: {
    examineStatus (value) {
      if (value && value !== null) {
        const a = value.split(' ')
        const b = a[0].split('-')
        const c = a[1].split(':')
        const nowTime = new Date()
        const oldTime = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])
        const over = (nowTime - oldTime) / (1000 * 60 * 60 * 24) < 3 // 大于3 代表是否大于3天，如果想判断30天就把3改成30
        return over
      } else {
        return false
      }
    },
    // 退款
    toRefund (order_sn) {
      this.$emit('toRefund', order_sn)
    },
    // 详情
    toDetail (order_sn) {
      this.$emit('toDetail', order_sn)
    },
    /**
     * @description 刷新列表页数据
     * @returns { undefined }
     */
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>
