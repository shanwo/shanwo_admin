<template>
<div :class="prefixCls">
  <Modal :value="value" title="添加/编辑" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="名称：">
          <Input v-model="iconInfo.name" placeholder="请输入渠道名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="推送类型:">
          <RadioGroup v-model="iconInfo.start_type">
            <template v-for="item in pushType">
              <Radio v-if="item" :label="item.type" :key="item.type">{{ item.name }}</Radio>
            </template>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="iconInfo.start_type === 3" label="时长类型：">
          <RadioGroup v-model="iconInfo.start_method">
            <template v-if="iconInfo.start_type === 3" v-for="item in pushMethod">
              <Radio v-if="item" :label="item.type" :key="item.type">{{ item.name }}</Radio>
            </template>
          </RadioGroup>
          <Select v-if="iconInfo.start_method === 2" class="iptWidth">
            <template v-for="item in week">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
          <Select v-if="iconInfo.start_method === 3" class="iptWidth">
            <template v-for='index in 28'>
              <Option :value="index" :key="index">{{ index }}日</Option>
            </template>
          </Select>
          <date-picker v-if="iconInfo.start_method === 4" v-model="iconInfo.start_time" type="date" format="MM-dd"></date-picker>
        </FormItem>
        <FormItem v-if="iconInfo.start_type === 2" label="时间：">
          <date-picker v-model="iconInfo.start_time" type="datetime" format="yyyy-MM-dd HH:mm"></date-picker>
        </FormItem>
        <FormItem v-if="iconInfo.start_type === 3" label="时间：">
          <date-picker v-model="iconInfo.start_time" type="time" format="HH:mm"></date-picker>
        </FormItem>
        <FormItem label="过滤规则：">
          <Input v-model="iconInfo.rule" placeholder="过滤规则" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="推送配置：">
          <Input v-model="iconInfo.config" placeholder="过滤规则" class="iptWidth"></Input>
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
import { pushType, pushMethod, week } from '../page-info'
import { updatePush, addPush, getPushInfo } from '@/api/push'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      week,
      pushType,
      pushMethod,
      iconInfo: {
        name: '',
        start_type: 1,
        start_method: 0,
        start_time: '',
        rule: {},
        config: {}
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
    getPushInfo () {
      getPushInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addPush
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updatePush
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
          this.getPushInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
