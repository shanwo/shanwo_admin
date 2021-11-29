export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'name',
    title: '名称'
  },
  {
    key: 'image',
    title: '图片',
    render: (h, { row }) => {
      return h('img', {
        attrs: {
          src: row.image,
          width: 128
        }
      })
    }
  },
  {
    key: 'order',
    title: '排序'
  },
  {
    key: 'updated_at',
    title: '更新时间'
  },
  {
    slot: 'action',
    title: '操作'
  }
]
