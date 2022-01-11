<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="userFeedbackList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toEdit(row.id)">查看</a>
    </template>
  </Table>
</div>
</template>

<script>
import { feedbackStatus, columns } from '../page-info'

const prefixCls = 'feedback-list'
export default {
  name: 'feedback-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      feedbackStatus,
      columns
    }
  },
  props: {
    userFeedbackList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * @description 刷新列表页数据
     * @returns { undefined }
     */
    refresh () {
      this.$emit('refresh')
    },
    toEdit (id) {
      this.$emit('toDetail', id)
    }
  }
}
</script>
