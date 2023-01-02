export const status = {
  '10': {
    type: 10,
    name: '任务创建'
  },
  '20': {
    type: 20,
    name: '任务取消'
  },
  '30': {
    type: 30,
    name: '执行中'
  },
  '40': {
    type: 40,
    name: '执行成功'
  },
  '50': {
    type: 50,
    name: '执行失败'
  }
}
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'venue_name',
    title: '场地名称'
  },
  {
    key: 'file_name',
    title: '文件名称'
  },
  {
    key: 'merger_name',
    title: '地区'
  },
  {
    key: 'address',
    title: '详细地址'
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
    title: '执行时间'
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
