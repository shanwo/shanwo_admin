<template>
<div :class="prefixCls">
  <Modal :value="value" title="编辑/添加" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="名称：">
          <Input v-model="iconInfo.name" placeholder="请输入渠道名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="销售渠道：">
          <Input-number :min="0" v-model="iconInfo.channel" placeholder="分销ID" class="iptWidth"></Input-number>
        </FormItem>
        <FormItem label="时长类型：">
          <Select v-model="iconInfo.type" class="iptWidth">
            <template v-for="item in payType">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="原价(元)：">
          <Input-number :min="0.01" v-model="iconInfo.original_price" placeholder="请输入原价" class="iptWidth"></Input-number>
        </FormItem>
        <FormItem label="活动价(元)：">
          <Input-number :min="0.01" v-model="iconInfo.activity_price" placeholder="请输入活动价" class="iptWidth"></Input-number>
        </FormItem>
        <FormItem label="描述：">
          <Input v-model="iconInfo.description" placeholder="请输入描述" class="iptWidth"></Input>
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
import { payType } from '../page-info'
import { updatePay, addPay, getPayInfo } from '@/api/pay-channel'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      payType,
      iconInfo: {
        name: '',
        channel: 0,
        original_price: 0,
        activity_price: 0,
        description: '',
        type: 1
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  },
  methods: {
    getPayInfo () {
      getPayInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addPay
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updatePay
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        name: '',
        channel: 0,
        original_price: 0,
        activity_price: 0,
        description: '',
        type: 1
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getPayInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
