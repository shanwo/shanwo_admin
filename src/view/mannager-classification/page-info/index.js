export const classificationType = [
  {
    type: 0,
    name: '全部'
  },
  {
    type: 1,
    name: '头像'
  },
  {
    type: 2,
    name: '教学'
  },
  {
    type: 3,
    name: '模板'
  },
  {
    type: 4,
    name: '链接'
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
    key: 'order',
    title: '排序'
  },
  {
    key: 'type',
    title: '类型',
    render: (h, { row }) => {
      return h('span', classificationType[row.type] && classificationType[row.type].name)
    }
  },
  {
    slot: 'action',
    title: '操作'
  }
]
