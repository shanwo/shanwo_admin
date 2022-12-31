<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="venueList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toCache(row.id)">缓存刷新</a> |
      <a v-if="row.status === 1" @click="toStatus(row.id,-1)">禁用</a>
      <a v-else @click="toStatus(row.id,1)" style="color: #ff0000">启用</a> |
      <a @click="toEdit(row.id)">编辑</a>
    </template>
  </Table>
</div>

</template>

<script>
import { venueStatus, vacheCache } from '@/api/hy_venue'
import { columns } from '../page-info'

const prefixCls = 'venue-list'

export default {
  name: 'venue-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    venueList: {
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
          venueStatus({ id: id, status: status }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    },
    toCache (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '缓存刷新会降低系统性能，确定刷新缓存吗？',
        onOk: () => {
          vacheCache({ id: id }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
