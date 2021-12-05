<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="pageList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a v-if="row.is_open" @click="toEdit(row.id)">推荐</a>
      <a v-else style="color: #ff0000">-</a>
    </template>
  </Table>
  <edit v-model="isShowEdit" :id="id" @refresh="refresh"></edit>
</div>

</template>

<script>
import { openType, userType, columns } from './../page-info'

const prefixCls = 'shan-page-management-list'

export default {
  name: 'shan-page-management-list',
  props: {
    pageList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    edit: () => import('./edit.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      isShowEdit: false,
      openType,
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
    /**
     * @description 编辑当前数据
     * @param { Number } id 当前数据id
     * @returns { undefined }
     */
    toEdit (id) {
      this.id = id
      this.isShowEdit = true
    }
  }
}
</script>
