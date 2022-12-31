<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="linkWhiteList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a v-if="row.status === 1" @click="toStatus(row.id,-1)">禁用</a>
      <a v-else @click="toStatus(row.id,1)" style="color: #ff0000">启用</a> |
      <a @click="toEdit(row.id)">编辑</a>
    </template>
  </Table>
</div>

</template>

<script>
import { statusLink } from '@/api/sw_link-white'
import { columns } from '../page-info'

const prefixCls = 'link-white-list'

export default {
  name: 'link-white-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    linkWhiteList: {
      type: Array,
      default: () => []
    }
  },
  inject: [ 'sortList' ],
  computed: {
    getSortList () {
      return this.sortList()
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
          statusLink({ id: id, status: status }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
