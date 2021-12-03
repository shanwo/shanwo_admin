export const userType = [
  {
    type: '',
    typeName: '全部'
  },
  {
    type: 1,
    typeName: '普通'
  },
  {
    type: 2,
    typeName: '会员'
  },
  {
    type: 3,
    typeName: '黑名单'
  }
]
export const userRenewal = [
  {
    type: 0,
    typeName: '-'
  },
  {
    type: 1,
    typeName: '年'
  },
  {
    type: 2,
    typeName: '季'
  },
  {
    type: 3,
    typeName: '月'
  },
  {
    type: 4,
    typeName: '周'
  },
  {
    type: 5,
    typeName: '天'
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
      return h('span', userType[row.type] && userType[row.type].typeName)
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
    key: 'pages',
    title: '闪页数'
  },
  {
    slot: 'action',
    title: '操作'
  }
]
