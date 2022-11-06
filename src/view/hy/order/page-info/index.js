export const orderStatus = {
  10: {
    type: 10,
    name: '订单创建'
  },
  20: {
    type: 20,
    name: '订单取消'
  },
  30: {
    type: 30,
    name: '支付成功'
  },
  40: {
    type: 40,
    name: '支付失败'
  },
  50: {
    type: 50,
    name: '退款完成'
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
    title: '支付金额',
    render: (h, { row }) => {
      return h('span', row.pay_price / 100)
    }
  },
  {
    key: 'status',
    title: '订单状态',
    render: (h, { row }) => {
      return h('span', orderStatus[row.status] && orderStatus[row.status].name)
    }
  },
  {
    key: 'payated_at',
    title: '支付时间'
  },
  {
    slot: 'action',
    title: '操作'
  }
]
