export const userSex = [
  {
    type: 0,
    name: '保密'
  },
  {
    type: 1,
    name: '男'
  },
  {
    type: 2,
    name: '女'
  }
]
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
export const userVipType = [
  {
    type: 0,
    name: '-'
  },
  {
    type: 1,
    name: '年卡'
  },
  {
    type: 2,
    name: '季卡'
  },
  {
    type: 3,
    name: '月卡'
  },
  {
    type: 4,
    name: '周卡'
  },
  {
    type: 5,
    name: '日卡'
  }
]
export const contactType = {
  'wechat': {
    type: 'wechat',
    name: '微信号'
  },
  'official': {
    type: 'wechat',
    name: '公众号'
  },
  'phone': {
    type: 'phone',
    name: '手机号'
  },
  'qq': {
    type: 'qq',
    name: 'QQ'
  },
  'weibo': {
    type: 'weibo',
    name: '微博'
  },
  'email': {
    type: 'email',
    name: '邮箱'
  }
}
export const userThird = [
  {
    key: 'source',
    title: '平台类型',
    render: (h, { row }) => {
      return h('span', contactType[row.source] ? contactType[row.source].name : row.source)
    }
  },
  {
    key: 'nickname',
    title: '平台昵称'
  },
  {
    key: 'logins_number',
    title: '登录次数'
  },
  {
    key: 'updated_at',
    title: '最后登录时间'
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
export const record = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'avatar',
    title: '闪页头像',
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
    title: '闪页名称'
  }
]
