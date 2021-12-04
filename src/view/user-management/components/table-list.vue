<template>
    <div :class="prefixCls">
        <Table :columns="columns" :data="userList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a @click="toEdit(row.id)">查看</a> |
                <a v-if = "row.type !==3" @click="toStatus(row.id)">拉黑</a>
                <a v-else style="color: #ff0000">已拉黑</a>
            </template>
        </Table>
    </div>
</template>
<script>
import { editUserStatus } from '@/api/user-management'
import { userType, columns } from './../page-info'

const prefixCls = 'user-management-list'
export default {
  name: 'user-management-list',
  data () {
    return {
      prefixCls,
      id: null,
      userType,
      columns
    }
  },
  props: {
    userList: {
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
    },
    toStatus (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '拉黑操作不可恢复，用户相关数据全部清除！！！',
        onOk: () => {
          editUserStatus({ id, type: 3 }).then(() => {
            this.$Message.success('拉黑成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
