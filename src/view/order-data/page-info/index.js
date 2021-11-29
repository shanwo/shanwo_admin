export const orderStatus = {
  1: {
    type: 1,
    name: '预支付'
  },
  2: {
    type: 2,
    name: '支付成功'
  },
  3: {
    type: 3,
    name: '支付失败'
  },
  4: {
    type: 4,
    name: '退款'
  }
}
export const columns = [
  {
    key: 'id',
    title: 'id'
  },
  {
    key: 'nickname',
    title: '用户昵称'
  },
  {
    key: 'order_sn',
    title: '订单号'
  },
  {
    key: 'third_sn',
    title: '三方单号'
  },
  {
    key: 'pay_price',
    title: '支付金额(分)'
  },
  {
    key: 'status',
    title: '订单状态',
    render: (h, { row }) => {
      return h('span', orderStatus[row.status] && orderStatus[row.status].name)
    }
  }
]
