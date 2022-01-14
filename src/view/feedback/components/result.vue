<template>
<div :class="prefixCls">
  <Modal :value="value" title="添加/编辑" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="ID：">
          <p>{{ iconInfo.id }}</p>
        </FormItem>
        <FormItem label="用户ID：">
          <p>{{ iconInfo.user_id }}</p>
        </FormItem>
        <FormItem label="联系方式：">
          <p>{{ iconInfo.contacts }}</p>
        </FormItem>
        <FormItem label="反馈内容：">
          <p>{{ iconInfo.content }}</p>
        </FormItem>
        <FormItem label="处理状态：">
          <p v-if="feedbackStatus[iconInfo.status]">{{ feedbackStatus[iconInfo.status].name }}</p><p v-else>-</p>
        </FormItem>
        <FormItem label="处理结果：">
          <Input v-model="iconInfo.result" placeholder="请输入处理结果" class="iptWidth"></Input>
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
import { feedbackStatus } from '../page-info'
import { getFeedbackInfo, uploadFeedbackInfo } from '@/api/feedback'

const prefixCls = 'result'
export default {
  name: 'result',
  data () {
    return {
      prefixCls,
      feedbackStatus,
      iconInfo: {
        id: null,
        user_id: 0,
        contacts: '',
        result: ''
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
    getFeedbackInfo () {
      getFeedbackInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      uploadFeedbackInfo({ id: this.id, ...this.iconInfo }).then(() => {
        this.$Message.success('处理成功')
        this.$emit('refresh')
        this.cancel()
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        result: ''
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getFeedbackInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
