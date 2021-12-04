<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="orderList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
    </template>
  </Table>
</div>
</template>
<script>
import { columns } from './../page-info'

const prefixCls = 'order-data-list'
export default {
  name: 'order-data-list',
  props: {
    orderList: {}
  },
  data () {
    return {
      prefixCls,
      columns
    }
  },
  methods: {
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
