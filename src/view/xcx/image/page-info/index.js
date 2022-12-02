export const columns = [
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
