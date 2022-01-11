export const status = {
  '-1': {
    type: -1,
    name: '已禁用'
  },
  '1': {
    type: 1,
    name: '已启用'
  }
}
export const type = [
  {
    type: '',
    name: '请选择'
  },
  {
    type: 1,
    name: '字符串'
  },
  {
    type: 2,
    name: '整数'
  },
  {
    type: 3,
    name: '小数'
  },
  {
    type: 4,
    name: '布尔'
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
    key: 'mark',
    title: '标签'
  },
  {
    key: 'type',
    title: '类型',
    render: (h, { row }) => {
      return h('span', type[row.type] && type[row.type].name)
    }
  },
  {
    key: 'default',
    title: '默认值'
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
