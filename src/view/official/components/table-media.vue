<template>
<div :class="prefixCls">
  <Table :columns="mediaColumns" :data="materialList" class="iviewtable">
  </Table>
</div>

</template>

<script>
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
    }
  }
}
</script>
