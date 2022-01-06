export const status = [
  {
    type: -1,
    name: '禁用'
  },
  {
    type: 1,
    name: '启用'
  }
]
export const templateType = {
  1: {
    type: 1,
    name: '免费模板'
  },
  2: {
    type: 2,
    name: '会员模板'
  },
  3: {
    type: 3,
    name: '限时模板'
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
    key: 'preview',
    title: '预览图',
    render: (h, { row }) => {
      return h('img', {
        attrs: {
          src: row.preview,
          width: 30,
          height: 30
        }
      })
    }
  },
  {
    key: 'type',
    title: '模板类型',
    render: (h, { row }) => {
      return h('span', templateType[row.type] && templateType[row.type].name)
    }
  },
  {
    key: 'order',
    title: '顺序'
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
