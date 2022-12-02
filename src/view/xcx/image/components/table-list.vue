<template>
  <div :class="prefixCls">
    <Table :columns="columns" :data="imageList" class="iviewtable">
      <template slot-scope="{ row }" slot="action">
        <a @click="toDel(row.id)">删除</a>
         <a @click="handleDown(row)"  target="_blank" style="color: #fa4535; margin-left: 20px">下载</a>
      </template>
    </Table>
  </div>
</template>

<script>
import { columns } from '../page-info'
import { uploadDel, uploadDown } from '@/api/hy_upload.js'

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
    },
    handleDown (obj) {
      console.log(obj)
      uploadDown({ id: obj.id }).then(res => {
        console.log('res,', res)
        // window.location.href = res.data.original_url
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = res.data.original_url
        a.target = '_blank'
        // 保存下来的文件名
        a.download = 'image.png'
        document.body.appendChild(a)
        a.click()
        // 移除元素
        document.body.removeChild(a)
      })
    }
  }
}
</script>
