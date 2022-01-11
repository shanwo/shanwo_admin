<template>
<div :class="prefixCls">
  <Modal :value="value" title="编辑/添加" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="名称：">
          <Input v-model="iconInfo.name" placeholder="名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="标识：">
          <Input v-model="iconInfo.mark" placeholder="标识" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="类型：">
          <Select v-model="iconInfo.type" class="iptWidth">
            <template v-for="item in type">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="默认值：">
          <Input v-model="iconInfo.default" placeholder="默认值" class="iptWidth"></Input>
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
import { updateTag, addTag, getTagInfo } from '@/api/tag'
import { type } from '../page-info'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      type,
      iconInfo: {
        id: null,
        name: '',
        value: '',
        type: 0,
        default: ''
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
    getTagInfo () {
      getTagInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addTag
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateTag
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        id: null,
        name: '',
        value: '',
        type: 0,
        default: ''
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getTagInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
