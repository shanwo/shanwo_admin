<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="userList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toEdit(row.id)">编辑</a>&nbsp;
      <a @click="toDel(row.id)">删除</a>
    </template>
  </Table>
  <edit v-model="isShowEdit" :id="editId" @refresh="refresh"></edit>
</div>

</template>

<script>
import { delClassification } from '@/api/mannager-classification'
import { columns } from './../page-info'

const prefixCls = 'mannager-classification-list'

export default {
  name: 'mannager-classification-list',
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    edit: () => import('./edit.vue')
  },
  data () {
    return {
      prefixCls,
      editId: null,
      isShowEdit: false,
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
    /**
     * @description 编辑当前数据
     * @param { Number } id 当前数据id
     * @returns { undefined }
     */
    toEdit (id) {
      this.editId = id
      this.isShowEdit = true
    },
    toDel (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '确认删除当前数据？',
        onOk: () => {
          delClassification({ id }).then(() => {
            this.$Message.success('删除成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
