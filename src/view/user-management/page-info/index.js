export const userType = [
  {
    type: '',
    name: '全部'
  },
  {
    type: 1,
    name: '普通'
  },
  {
    type: 2,
    name: '会员'
  },
  {
    type: 3,
    name: '黑名单'
  }
]
export const userRenewal = [
  {
    type: 0,
    name: '-'
  },
  {
    type: 1,
    name: '年'
  },
  {
    type: 2,
    name: '季'
  },
  {
    type: 3,
    name: '月'
  },
  {
    type: 4,
    name: '周'
  },
  {
    type: 5,
    name: '天'
  }
]
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'avatar',
    title: '用户头像',
    render: (h, { row }) => {
      return h('img', {
        attrs: {
          src: row.avatar,
          width: 30,
          height: 30
        }
      })
    }
  },
  {
    key: 'nickname',
    title: '用户昵称'
  },
  {
    key: 'type',
    title: '用户类型',
    render: (h, { row }) => {
      return h('span', userType[row.type] && userType[row.type].name)
    }
  },
  {
    key: 'contact',
    title: '手机号',
    render: (h, { row }) => {
      return h('span', row.contact && row.contact.phone)
    }
  },
  {
    key: 'contact',
    title: '微信号',
    render: (h, { row }) => {
      return h('span', row.contact && row.contact.wechat)
    }
  },
  {
    key: 'contact',
    title: 'QQ',
    render: (h, { row }) => {
      return h('span', row.contact && row.contact.qq)
    }
  },
  // {
  //   key: 'contact',
  //   title: '微博',
  //   render: (h, { row }) => {
  //     return h('span', row.contact && row.contact.weibo)
  //   }
  // },
  // {
  //   key: 'contact',
  //   title: '邮箱',
  //   render: (h, { row }) => {
  //     return h('span', row.contact && row.contact.email)
  //   }
  // },
  {
    key: 'pages',
    title: '闪页数'
  },
  {
    slot: 'action',
    title: '操作'
  }
]
