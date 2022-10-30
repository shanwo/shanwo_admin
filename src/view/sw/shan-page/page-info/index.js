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
export const cacheTypeList = [
  {
    type: 0,
    name: '关闭推荐'
  },
  {
    type: 1,
    name: '全部推荐'
  },
  {
    type: 2,
    name: '热门推荐'
  },
  {
    type: 3,
    name: '最近更新'
  }
]
export const userType = {
  1: {
    type: 1,
    typeName: '普通'
  },
  2: {
    type: 2,
    typeName: '会员'
  },
  3: {
    type: 3,
    typeName: '黑名单'
  }
}
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'name',
    title: '闪页名称'
  },
  {
    key: 'type',
    title: '状态',
    render: (h, { row }) => {
      return h('span', userType[row.type] && userType[row.type].typeName)
    }
  },
  {
    key: 'nickname',
    title: '创建人'
  },
  {
    key: 'code',
    title: '闪码'
  },
  {
    key: 'follow',
    title: '关注数'
  },
  {
    key: 'browse',
    title: '浏览数'
  },
  {
    key: 'sort',
    title: '排序值'
  },
  {
    key: 'is_open',
    title: '广场开关',
    render: (h, { row }) => {
      return h('span', row.is_open ? '开' : '关')
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
    key: 'updated_at',
    title: '最近修改时间',
    width: 160
  },
  {
    slot: 'action',
    title: '操作'
  }
]
export const record = [
  {
    key: 'user_id',
    title: '用户ID'
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
  }
]
