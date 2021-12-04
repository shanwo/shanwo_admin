<template>
    <div :class="prefixCls">
        <Table :columns="columns" :data="avatarPendantList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a @click="toEdit(row.id)">编辑</a>&nbsp;
                <a @click="toDel(row.id)">删除</a>
            </template>
        </Table>
    </div>

</template>

<script>
import { deleteDecoration } from '@/api/avatar-pendant'
import { columns } from './../page-info'
const prefixCls = 'avatar-pendant-list'
export default {
  name: 'avatar-pendant-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    avatarPendantList: {
      type: Array,
      default: () => []
    }
  },
  inject: ['sortList'],
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
    toDel (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '确认删除当前数据？',
        onOk: () => {
          deleteDecoration({ id }).then(() => {
            this.$Message.success('删除成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
