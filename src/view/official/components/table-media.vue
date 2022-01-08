<template>
<div :class="prefixCls">
  <Table :columns="mediaColumns" :data="materialList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a v-if="row.status === 1" @click="toStatus(row.id,-1)">禁用</a>
      <a v-else @click="toStatus(row.id,1)" style="color: #ff0000">启用</a> |
      <a @click="toEdit(row.id)">编辑</a>
    </template>
  </Table>
</div>

</template>

<script>
import { getMaterialDel } from '@/api/official'
import { mediaColumns } from '../page-info'

const prefixCls = 'media-list'

export default {
  name: 'media-list',
  props: {
    materialList: {
      type: 0,
      default: () => []
    }
  },
  data () {
    return {
      prefixCls,
      id: null,
      isShowEdit: false,
      mediaColumns
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
          getMaterialDel({ id: id, status: status }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
