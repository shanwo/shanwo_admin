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
export const materialType = [
  {
    type: 'image',
    name: '图片'
  },
  {
    type: 'video',
    name: '视频'
  },
  {
    type: 'voice',
    name: '音频'
  }
]
export const replyColumns = [
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
export const articleColumns = [
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
export const mediaColumns = [
  {
    key: 'media_id',
    title: 'media_id'
  },
  {
    key: 'name',
    title: '名称'
  },
  {
    key: 'update_time',
    title: '更新时间'
  },
  {
    slot: 'action',
    title: '操作'
  }
]

export const menuTypeInfo = {
  media_id: [
    {
      title: '图片/语音/视频',
      key: 'media_id'
    }
  ],
  article_id: [
    {
      title: '图文消息ID',
      key: 'article_id'
    }
  ],
  view: [
    {
      title: '页面地址',
      key: 'url'
    }
  ],
  miniprogram: [
    {
      title: 'appid',
      key: 'appid'
    },
    {
      title: '小程序路径',
      key: 'pagepath'
    },
    {
      title: '备用网页',
      key: 'url'
    }
  ]
}
export const menuTypeKey = {
  allKey: [ 'url', 'appid', 'pagepath', 'media_id', 'view_limited', 'article_id', 'article_view_limited' ],
  media_id: [ 'media_id' ],
  article_id: [ 'article_id' ],
  view: [ 'url' ],
  miniprogram: [ 'appid', 'pagepath', 'url' ]
}
