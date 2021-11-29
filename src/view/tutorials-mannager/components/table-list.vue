<template>
    <div :class="prefixCls">
       <Table :columns="columns" :data="tutorialsMannagerList" class="iviewtable">
            <template slot-scope="{ row }" slot="action">
                <a @click="toEdit(row.id)">编辑</a>&nbsp;
                <a @click="toDel(row.id)">删除</a>
            </template>
       </Table>
    </div>

</template>

<script>
import { deleteTutorials } from '@/api/tutorials-mannager'
import { columns } from './../page-info'
const prefixCls = 'avatar-pendant-list'
export default {
  name: 'tutorials-mannager-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    tutorialsMannagerList: {
      type: Array,
      default: () => []
    }
  },
  inject: [ 'sortList' ],
  computed: {
    getSortList () {
      return this.sortList && this.sortList() || {}
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
          deleteTutorials({ id }).then(() => {
            this.$Message.success('删除成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
