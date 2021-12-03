<template>
    <div :class="prefixCls">
        <Table :columns="columns" :data="userList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a @click="toStatus(row.id)">拉黑</a>
            </template>
        </Table>
        <edit v-model="isShowEdit" :id="editId" @refresh="refresh"></edit>
    </div>

</template>

<script>
import { userType, columns } from './../page-info'

const prefixCls = 'user-management-table-list'
export default {
  name: 'user-management-table-list',
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      prefixCls,
      editId: null,
      isShowEdit: false,
      userType,
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
    toStatus (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '拉黑后用户相关数据全部清除！！',
        onOk: () => {
          deleteDecoration({ id }).then(() => {
            this.$Message.success('拉黑成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
