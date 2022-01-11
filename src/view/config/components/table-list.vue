<template>
  <div :class="prefixCls">
    <Table :columns="columns" :data="configlList" class="iviewtable">
      <template slot-scope="{ row }" slot="action">
        <a v-if="row.status === 1" @click="toStatus(row.id,-1)">禁用</a>
        <a v-else @click="toStatus(row.id,1)" style="color: #ff0000">启用</a> |
        <a @click="toEdit(row.id)">编辑</a>
      </template>
    </Table>
  </div>

</template>

<script>
import { statusConfig } from '@/api/config'
import { columns } from '../page-info'

const prefixCls = 'config-list'

export default {
  name: 'config-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    configlList: {
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
    toDel (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '确认删除当前数据？',
        onOk: () => {
          statusConfig({ id }).then(() => {
            this.$Message.success('删除成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
