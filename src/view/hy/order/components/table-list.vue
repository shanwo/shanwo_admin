<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="orderList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <Button v-if="examineStatus(row.payated_at)" type="info" @click="handleTmPay(row.id)">退款</Button>
    </template>
  </Table>
</div>
</template>
<script>
import { columns } from '../page-info'

const prefixCls = 'order-list'
export default {
  name: 'order-list',
  props: {
    orderList: {}
  },
  computed: {

  },
  data () {
    return {
      prefixCls,
      columns
    }
  },
  methods: {
    examineStatus (value) {
      console.log('value', value)
      if (value && value !== null) {
        const a = value.split(' ')
        const b = a[0].split('-')
        const c = a[1].split(':')
        console.log(a, b, c)
        const nowTime = new Date()
        const oldTime = new Date(b[0], b[1] - 1, b[2], c[0], c[1], c[2])

        console.log('oldTime', oldTime)
        const over = (nowTime - oldTime) / (1000 * 60 * 60 * 24) < 30 // 大于3 代表是否大于3天，如果想判断30天就把3改成30
        console.log(over)
        return over
      } else {
        return false
      }
    },
    // 退款
    handleTmPay () {

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
