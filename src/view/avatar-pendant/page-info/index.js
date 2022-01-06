export const status = [
  {
    type: -1,
    name: '禁用'
  },
  {
    type: 1,
    name: '启用'
  }
]
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
    title: '徽章',
    render: (h, { row }) => {
      return h('img', {
        attrs: {
          src: row.image,
          width: 30,
          height: 30
        }
      })
    }
  },
  {
    key: 'order',
    title: '排序'
  },
  {
    key: 'status',
    title: '状态',
    render: (h, { row }) => {
      return h('span', status[row.status] && status[row.status].name)
    }
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
