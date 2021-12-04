<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="userFeedbackList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toEdit(row.id)">查看</a>
    </template>
  </Table>
  <result v-model="isShowEdit" :id="editId" @refresh="refresh"></result>
</div>
</template>
<script>
import { feedbackStatus, columns } from './../page-info'

const prefixCls = 'user-feedback-list'
export default {
  name: 'user-feedback-list',
  props: {
    userFeedbackList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    result: () => import('./result.vue')
  },
  data () {
    return {
      prefixCls,
      editId: null,
      isShowEdit: false,
      feedbackStatus,
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
    },
    toEdit (id) {
      this.editId = id
      this.isShowEdit = true
    }
  }
}
</script>
