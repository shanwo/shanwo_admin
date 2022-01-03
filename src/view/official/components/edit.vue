<template>
<div :class="prefixCls">
  <Modal :value="value" title="编辑/添加" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="关键词：">
          <Input v-model="iconInfo.keyword" placeholder="关键词" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="类型：">
          <Select v-model="iconInfo.type" class="iptWidth">
            <template v-for="item in replyType">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="回复内容">
          <textarea :rows="8" v-model="iconInfo.comment" class="ivu-input"/>
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
import { replyType } from './../page-info'
import { updateReply, addReply, getReplyInfo } from '@/api/official'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      replyType,
      iconInfo: {
        keyword: '',
        type: 1,
        comment: {}
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
    getReplyInfo () {
      getReplyInfo({ id: this.id }).then(res => {
        res.data.comment = JSON.stringify(res.data.comment, null, 4)
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addReply
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (key === 'comment') {
          summitInfo[key] = JSON.parse(this.iconInfo[key])
        } else {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateReply
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        keyword: '',
        type: 0,
        comment: {}
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getReplyInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
