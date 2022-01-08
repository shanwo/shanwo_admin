<template>
<div :class="prefixCls">
  <Table :columns="articleColumns" :data="materialList" class="iviewtable">
  </Table>
</div>

</template>

<script>
import { articleColumns } from '../page-info'

const prefixCls = 'article-list'

export default {
  name: 'article-list',
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
      articleColumns
    }
  },
  methods: {
    /**
     * @description 刷新列表页数据
     * @returns { undefined }
     */
    refresh () {
      this.$emit('refresh')
    }
  }
}
</script>
