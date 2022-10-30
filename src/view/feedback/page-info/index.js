export const feedbackStatus = [
  {
    type: 1,
    name: '未处理'
  },
  {
    type: 2,
    name: '已处理'
  }
]
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'user_id',
    title: '用户ID'
  },
  {
    key: 'contacts',
    title: '联系方式'
  },
  {
    key: 'content',
    title: '内容'
  },
  {
    key: 'status',
    title: '处理状态',
    render: (h, { row }) => {
      return h('span', feedbackStatus[row.status] && feedbackStatus[row.status].name)
    }
  },
  {
    key: 'created_at',
    title: '反馈时间'
  },
  {
    slot: 'action',
    title: '操作'
  }
]
