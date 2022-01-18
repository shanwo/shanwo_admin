<template>
<div :class="prefixCls">
  <Modal :value="value" title="添加/编辑" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="关键词：">
          <Input v-model="iconInfo.keyword" placeholder="关键词" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="回复类型：">
          <Select v-model="iconInfo.type" class="iptWidth">
            <template v-for="item in replyType">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
        </FormItem>
        <div v-if="iconInfo.type === 1">
          <FormItem label="回复内容">
            <Input v-model="iconInfo.comment.Content" placeholder="消息内容" class="iptWidth"></Input>
          </FormItem>
        </div>
        <div v-if="iconInfo.type === 2 || iconInfo.type === 3 || iconInfo.type === 4">
          <FormItem label="素材库ID">
            <Input v-model="iconInfo.comment.MediaId" placeholder="素材库ID" class="iptWidth"></Input>
          </FormItem>
        </div>
        <div v-if="iconInfo.type === 4 || iconInfo.type === 5 || iconInfo.type === 6">
          <FormItem label="标题">
            <Input v-model="iconInfo.comment.Title" placeholder="消息的标题" class="iptWidth"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input v-model="iconInfo.comment.Description" placeholder="消息的描述" class="iptWidth"></Input>
          </FormItem>
        </div>
        <div v-if="iconInfo.type === 5">
          <FormItem label="音乐链接">
            <Input v-model="iconInfo.comment.MusicURL" placeholder="音乐链接" class="iptWidth"></Input>
          </FormItem>
          <FormItem label="高质量链接">
            <Input v-model="iconInfo.comment.HQMusicUrl" placeholder="高质量链接" class="iptWidth"></Input>
          </FormItem>
          <FormItem label="缩略图素材库ID">
            <Input v-model="iconInfo.comment.ThumbMediaId" placeholder="缩略图素材库ID" class="iptWidth"></Input>
          </FormItem>
        </div>
        <div v-if="iconInfo.type === 6">
          <FormItem label="跳转链接">
            <Input v-model="iconInfo.comment.Url" placeholder="跳转链接" class="iptWidth"></Input>
          </FormItem>
          <FormItem label="图片链接">
            <Input v-model="iconInfo.comment.PicUrl" placeholder="图片链接" class="iptWidth"></Input>
          </FormItem>
        </div>
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
import { replyType } from '../page-info'
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
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addReply
      let summitInfo = {}
      for (let key in this.iconInfo) {
        summitInfo[key] = this.iconInfo[key]
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
        type: 1,
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
