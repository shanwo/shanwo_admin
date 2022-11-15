<template>
<div :class="prefixCls">
  <Modal :value="value" title="添加/编辑" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="自动加载：">
          <Select v-model="iconInfo.autoload" class="iptWidth">
            <template v-for="item in configAutoload">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="配置名：">
          <Input v-model="iconInfo.option_name" placeholder="请输入配置名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="配置内容：">
          <textarea :rows="8" v-model="iconInfo.option_value" class="ivu-input"/>
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
import { configAutoload } from '../page-info'
import { updateConfig, addConfig, getConfigInfo } from '@/api/config'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      configAutoload,
      iconInfo: {
        option_name: '',
        option_value: {},
        autoload: 0
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
    getConfigInfo () {
      getConfigInfo({ id: this.id }).then(res => {
        res.data.option_value = JSON.stringify(res.data.option_value, null, 4)
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addConfig
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          if (key === 'option_value') {
            summitInfo[key] = JSON.parse(this.iconInfo[key])
          } else {
            summitInfo[key] = this.iconInfo[key]
          }
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateConfig
      }
      // console.log(summitInfo.option_value)
      console.log(summitInfo)
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        option_name: '',
        option_value: {},
        autoload: 0
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getConfigInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
