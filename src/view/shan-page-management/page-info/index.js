export const cacheTypeList = {
  0: {
    type: 0,
    name: '清除缓存'
  },
  1: {
    type: 1,
    name: '全部缓存'
  },
  2: {
    type: 2,
    name: '仅热门'
  },
  3: {
    type: 3,
    name: '仅最近更新'
  }
}
export const openType = [
  {
    type: '',
    typeName: '全部'
  },
  {
    type: 0,
    typeName: '关'
  },
  {
    type: 1,
    typeName: '开'
  }
]
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
      return h('span', userType[ row.type ] && userType[ row.type ].typeName)
    }
  },
  {
    key: 'nickname',
    title: '创建人'
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
      return h('span', openType[ row.is_open ] && openType[ row.is_open ].typeName)
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
