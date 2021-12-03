<template>
    <div :class="prefixCls">
        <Table :columns="columns" :data="userList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a v-if = "row.type !==3" @click="toStatus(row.id)">拉黑</a>
                <p v-else>已拉黑</p>
            </template>
        </Table>
    </div>
</template>
<script>
import { eidtUserStatus } from '@/api/user-management'
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
        content: '拉黑操作不可恢复，用户相关数据全部清除！！！',
        onOk: () => {
          eidtUserStatus({ id, type: 3 }).then(() => {
            this.$Message.success('拉黑成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
