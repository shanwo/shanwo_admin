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
export const linkType = {
  1: {
    type: 1,
    name: '弹窗'
  },
  2: {
    type: 2,
    name: '跳转'
  }
}
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'name',
    title: '平台名称'
  },
  {
    key: 'image',
    title: '图标',
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
    title: '顺序'
  },
  {
    key: 'url',
    title: '链接'
  },
  {
    key: 'type',
    title: '链接类型',
    render: (h, { row }) => {
      return h('span', linkType[row.type] && linkType[row.type].name)
    }
  },
  {
    key: 'number',
    title: '累计使用数'
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
