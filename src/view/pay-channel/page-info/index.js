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
export const payType = {
  1: {
    type: 1,
    name: '一年'
  },
  2: {
    type: 2,
    name: '一季'
  },
  3: {
    type: 3,
    name: '一月'
  },
  4: {
    type: 4,
    name: '一周'
  },
  5: {
    type: 5,
    name: '一天'
  }
}
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
    key: 'channel',
    title: '销售渠道',
    render: (h, { row }) => {
      return h('span', row.channel ? '用户分销:' + row.channel : '系统渠道')
    }
  },
  {
    key: 'original_price',
    title: '原价(元)'
  },
  {
    key: 'activity_price',
    title: '活动价(元)'
  },
  {
    key: 'description',
    title: '描述'
  },
  {
    key: 'type',
    title: '时长类型',
    render: (h, { row }) => {
      return h('span', payType[row.type] ? payType[row.type].name : '未定义')
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
