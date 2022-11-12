<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="imageList" class="iviewtable">
  </Table>
</div>

</template>

<script>
import { columns } from '../page-info'

const prefixCls = 'image-list'

export default {
  name: 'image-list',
  data () {
    return {
      prefixCls,
      isShowEdit: false,
      columns
    }
  },
  props: {
    imageList: {
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
    }
  }
}
</script>
