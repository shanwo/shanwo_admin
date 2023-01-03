<template>
<div :class="prefixCls">
  <Modal :value="value" title="订单详情" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form>
        <FormItem label="订单编号：" style="width:200px;float: left">
          <p>{{ orderInfo.order_sn }}</p>
        </FormItem>
        <FormItem label="订单状态：">
          <p>{{ orderStatus[orderInfo.status].name }}</p>
        </FormItem>
        <FormItem label="单价：" style="width:200px;float: left">
          <p>{{ orderInfo.price }}</p>
        </FormItem>
        <FormItem label="支付金额：">
          <p>{{ orderInfo.pay_price }}</p>
        </FormItem>
        <FormItem label="下单时间：" style="width:200px;float: left">
          <p>{{ orderInfo.created_at }}</p>
        </FormItem>
        <FormItem label="支付时间：">
          <p>{{ orderInfo.payated_at }}</p>
        </FormItem>
        <FormItem label="图片">
        </FormItem>
        <FormItem>
          <img v-for="images in orderInfo.images" :key="images.id" :src="images.thumbnail_url" style="width: 23%;margin: 5px"/>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" @click="cancel">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { orderStatus } from '../page-info'
import { orderInfo } from '@/api/hy_order'

const prefixCls = 'order-info'
export default {
  name: 'order-info',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    order_sn: {
      type: String
    }
  },
  data () {
    return {
      prefixCls,
      orderInfo: {
        order_sn: '',
        status: 10,
        price: '',
        pay_price: '',
        images: []
      },
      orderStatus
    }
  },
  methods: {
    /**
     * @description 获取用户信息
     * @returns { undefined }
     */
    getOrderInfo () {
      orderInfo({ order_sn: this.order_sn }).then(res => {
        this.orderInfo = res.data || {}
      })
    },
    cancel () {
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    order_sn: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getOrderInfo()
        }
      }
    }
  }
}
</script>
<style lang="less">
.ivu-modal-body {
  padding: 8px;
}

.ivu-form-item {
  margin-bottom: 4px;
}

.ivu-table-cell {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
