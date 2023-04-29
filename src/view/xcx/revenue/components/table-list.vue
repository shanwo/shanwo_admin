<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="exportList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="handleDown(row)"  target="_blank" style="color: #fa4535; margin-left: 20px">下载</a>
    </template>
  </Table>
</div>
</template>
<script>
import { columns } from '../page-info'

const prefixCls = 'export-list'
export default {
  name: 'export-list',
  data () {
    return {
      prefixCls,
      columns
    }
  },
  props: {
    exportList: {
      default: () => []
    }
  },
  methods: {
    handleDown (obj) {
      console.log(obj)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = obj.file_url
        a.target = '_blank'
        // 保存下来的文件名
        a.download = obj.file_name
        document.body.appendChild(a)
        a.click()
        // 移除元素
        document.body.removeChild(a)
    },
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
