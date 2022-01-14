export const status = {
  '-1': {
    type: -1,
    name: '已禁用'
  },
  '1': {
    type: 1,
    name: '已启用'
  },
  '2': {
    type: 1,
    name: '待推送'
  },
  '3': {
    type: 1,
    name: '推送中'
  },
  '4': {
    type: 1,
    name: '已完成'
  }
}
export const pushType = [
  {
    type: '',
    name: '请选择'
  },
  {
    type: 1,
    name: '手动'
  },
  {
    type: 2,
    name: '定时'
  },
  {
    type: 3,
    name: '周期'
  }
]
export const pushMethod = [
  {
    type: 0,
    name: '-'
  },
  {
    type: 1,
    name: '天'
  },
  {
    type: 2,
    name: '周'
  },
  {
    type: 3,
    name: '月'
  },
  {
    type: 4,
    name: '年'
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
    key: 'start_type',
    title: '推送类型',
    render: (h, { row }) => {
      return h('span', pushType[row.start_type] ? pushType[row.start_type].name : '未定义')
    }
  },
  {
    key: 'start_method',
    title: '推送模式',
    render: (h, { row }) => {
      return h('span', pushMethod[row.start_method] ? pushMethod[row.start_method].name : '未定义')
    }
  },
  {
    key: 'start_time',
    title: '执行时间'
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
