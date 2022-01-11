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
export const configAutoload = [
  {
    type: 0,
    name: '不自动加载'
  },
  {
    type: 1,
    name: '自动加载'
  }
]
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'option_name',
    title: '名称'
  },
  {
    key: 'autoload',
    title: '加载方式',
    render: (h, { row }) => {
      return h('span', configAutoload[row.autoload] ? configAutoload[row.autoload].name : '未定义')
    }
  },
  {
    key: 'status',
    title: '状态',
    render: (h, { row }) => {
      return h('span', status[row.status] && status[row.status].name)
    }
  },
  {
    key: 'created_at',
    title: '创建时间'
  },
  {
    slot: 'action',
    title: '操作'
  }
]
