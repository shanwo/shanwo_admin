<template>
<div :class="prefixCls">
  <Modal :value="value" title="退款" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="退款金额：">
          <Input-number v-model="payer_total" :min="0" :max="64" placeholder="请输入退款金额" class="inputWidth"></Input-number>
        </FormItem>
        <FormItem label="退款原因：">
          <Input v-model="reason" placeholder="请输入退款原因" class="inputWidth"></Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" @click="confirm">确定</Button>
      <Button type="primary" @click="cancel" ghost>取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { orderRefund } from '@/api/hy_order'

const prefixCls = 'order-refund'
export default {
  name: 'order-refund',
  data () {
    return {
      prefixCls,
      payer_total: 0,
      reason: ''
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    order_sn: {
      type: String
    }
  },
  methods: {
    /**
     * @description 发起退款
     * @returns { undefined }
     */
    confirm () {
      let data = {}
      data.order_sn = this.order_sn
      data.payer_total = this.payer_total * 100
      data.reason = this.reason
      orderRefund(data).then(() => {
        this.cancel()
      })
    },
    /**
     * @description 取消弹层
     * @returns { undefined }
     */
    cancel () {
      this.$set(this, 'payer_total', 0)
      this.$set(this, 'reason', '')
      this.$emit('input', false)
      this.$emit('on-change')
    }
  }
}
</script>
