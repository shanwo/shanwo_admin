<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="imageList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toDel(row.id)">删除</a>
    </template>
  </Table>
</div>

</template>

<script>
import { columns } from '../page-info'
import { uploadDel } from '@/api/hy_upload.js'

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
    },
    toDel (id, status) {
      this.$Modal.confirm({
        title: '警告',
        content: '确认删除此图片嘛？',
        onOk: () => {
          uploadDel({ id: id }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
