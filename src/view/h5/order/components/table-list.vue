<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="orderList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toRefund(row.order_sn)">退款</a>
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
    // 退款
    toRefund (order_sn) {
      this.$emit('toRefund', order_sn)
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
