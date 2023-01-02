<template>
  <div :class="prefixCls">

    <Modal
      v-model="modalStatus"
      title="图片">
      <img :src="imgSrc" style="width: 100%;display:block" alt="">
    </Modal>

    <Table :columns="columns" :data="imageList" class="iviewtable">
      <template slot-scope="{ row }" slot="action">
           <a @click="toDel(row.id)">删除</a>
           <a @click="handleDown(row)"  target="_blank" style="color: #fa4535; margin-left: 20px">下载</a>
      </template>
    </Table>
  </div>
</template>

<script>
import { uploadDel, uploadDown } from '@/api/hy_upload'
const prefixCls = 'image-list'

export default {
  name: 'image-list',
  data () {
    return {
      imgSrc: '',
      modalStatus: false,
      prefixCls,
      isShowEdit: false,
      columns: [
        {
          key: 'id',
          title: 'id'
        },
        {
          key: 'thumbnail_url',
          title: '图片预览图',
          render: (h, { row }) => {
            return h('img', {
              attrs: {
                src: row.thumbnail_url,
                height: 100
              },
              on: {
                click: (e) => { this.handleShow(row) }
              }
            })
          }
        },
        {
          key: 'name',
          title: '图片名称'
        },

        {
          key: 'venue_name',
          title: '场地'
        },
        {
          key: 'created_at',
          title: '拍摄时间'
        },
        {
          key: 'updated_at',
          title: '上传时间'
        },
        {
          slot: 'action',
          title: '操作'
        }
      ]
    }
  },
  props: {
    imageList: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    handleShow (obj) {
      console.log('obj', obj)
      this.imgSrc = obj.thumbnail_url
      this.modalStatus = true
    },
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
