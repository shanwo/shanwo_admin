<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="pushChannelList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <c v-if="row.status === 1">
        <a @click="toStatus(row.id,-1)">禁用</a> |
        <a @click="toStatus(row.id,2)">推送</a>
      </c>
      <a v-else-if="row.status === -1" @click="toStatus(row.id,1)" style="color: #ff0000">启用</a>
      <a v-else-if="row.status === 2" @click="toStatus(row.id,-1)">停止</a>
      <a v-else>-</a> |
      <a @click="toEdit(row.id)">编辑</a>
    </template>
  </Table>
</div>

</template>

<script>
import { statusPush } from '@/api/push'
import { columns } from '../page-info'

const prefixCls = 'push-list'

export default {
  name: 'push-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    pushChannelList: {
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
    /**
     * @description 编辑当前数据
     * @param { Number } id 当前数据id
     * @returns { undefined }
     */
    toEdit (id) {
      this.$emit('toDetail', id)
    },
    toStatus (id, status) {
      this.$Modal.confirm({
        title: '警告',
        content: '确认启/停用嘛？',
        onOk: () => {
          statusPush({ id: id, status: status }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
