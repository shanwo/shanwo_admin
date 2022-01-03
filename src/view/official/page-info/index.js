export const replyType = [
  {
    type: 0,
    name: '全部'
  },
  {
    type: 1,
    name: '文本消息'
  },
  {
    type: 2,
    name: '图片消息'
  },
  {
    type: 3,
    name: '语音消息'
  },
  {
    type: 4,
    name: '视频消息'
  },
  {
    type: 5,
    name: '音乐消息'
  },
  {
    type: 6,
    name: '图文消息'
  }
]
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'type',
    title: '链接类型',
    render: (h, { row }) => {
      return h('span', replyType[row.type] && replyType[row.type].name)
    }
  },
  {
    key: 'keyword',
    title: '关键词'
  },
  {
    key: 'number',
    title: '累计使用数'
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
