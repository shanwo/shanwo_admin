<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="venueList" class="iviewtable">
    <template slot-scope="{ row }" slot="imgslot">
     <img style="width:150px;height:150px;object-fit: contain;" :src="row.thumbnail_url" alt="">
    </template>
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
    }
  }
}
</script>
