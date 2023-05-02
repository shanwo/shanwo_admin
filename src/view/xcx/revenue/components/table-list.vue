<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="revenueList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toDetail(row.id)">详情</a>
    </template>
  </Table>
</div>
</template>
<script>
import { columns } from '../page-info'

const prefixCls = 'revenue-list'
export default {
  name: 'revenue-list',
  data () {
    return {
      prefixCls,
      columns
    }
  },
  props: {
    revenueList: {
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
        const over = (nowTime - oldTime) / (1000 * 60 * 60 * 24) < 1 // 大于1 代表是否大于1天，如果想判断30天就把1改成30
        return over
      } else {
        return false
      }
    },
    // 详情
    toDetail (id) {
      this.$emit('toDetail', id)
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
