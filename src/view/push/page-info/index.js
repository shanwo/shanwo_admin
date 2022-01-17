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
export const ruleList = [
  {
    type: '=',
    name: '='
  },
  {
    type: '!=',
    name: '!='
  },
  {
    type: '>',
    name: '>'
  },
  {
    type: '>=',
    name: '>='
  },
  {
    type: '<',
    name: '<'
  },
  {
    type: '<=',
    name: '<='
  },
  {
    type: 'like',
    name: '包含'
  }
]
export const pushType = {
  1: {
    type: 1,
    name: '手动'
  },
  2: {
    type: 2,
    name: '定时'
  },
  3: {
    type: 3,
    name: '周期'
  }
}
export const pushMethod = {
  1: {
    type: 1,
    name: '每天'
  },
  2: {
    type: 2,
    name: '每周'
  },
  3: {
    type: 3,
    name: '每月'
  },
  4: {
    type: 4,
    name: '每年'
  }
}
export const weekList = [
  {
    type: 1,
    name: '周一'
  },
  {
    type: 2,
    name: '周二'
  },
  {
    type: 3,
    name: '周三'
  },
  {
    type: 4,
    name: '周四'
  },
  {
    type: 5,
    name: '周五'
  },
  {
    type: 6,
    name: '周六'
  },
  {
    type: 7,
    name: '周日'
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
