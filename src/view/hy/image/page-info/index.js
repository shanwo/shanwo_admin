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
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    slot: 'imgslot',
    title: '图片预览图'
  },
  {
    key: 'name',
    title: '图片名称'
  },

  {
    key: 'venue_name',
    title: '场地'
  },
  // {
  //   key: 'thumbnail_url',
  //   title: '图片预览图',
  //   render: (h, { row }) => {
  //     return h('span', status[row.status] && status[row.status].name)
  //   }
  // },
  {
    key: 'updated_at',
    title: '更新时间'
  }
  // {
  //   slot: 'action',
  //   title: '操作'
  // }
]
