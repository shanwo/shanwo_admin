<template>
<div :class="prefixCls">
  <Modal :value="value" title="添加/编辑" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="所属分类：">
          <Select v-model="iconInfo.sort_id" class="iptWidth">
            <Option v-for="(item, index) of getSortList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="模板类型：">
          <Select v-model="iconInfo.type" class="iptWidth">
            <template v-for="item in templateType">
              <Option v-if="item" :value="item.type" :key="item.type">{{ item.name }}</Option>
            </template>
          </Select>
        </FormItem>
        <FormItem label="模板名称：">
          <Input v-model="iconInfo.name" placeholder="请输入模板名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="背景图：">
          <image-upload v-model="iconInfo.background" @on-change="uploadImageChange"/>
        </FormItem>
        <FormItem label="排序：">
          <Input-number v-model="iconInfo.order" :min="0" :max="255" placeholder="请输入排序值" class="iptWidth"></Input-number>
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
import { templateType } from '../page-info'
import { updateTemplate, addTemplate, getTemplateInfo } from '@/api/template'

const prefixCls = 'edit'
export default {
  name: 'edit',
  components: {
    imageUpload: () => import('@/components/image-upload')
  },
  data () {
    return {
      prefixCls,
      templateType,
      iconInfo: {
        sort_id: null,
        name: null,
        background: null,
        type: 1,
        order: 1
      }
    }
  },
  inject: [ 'sortList' ],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  },
  computed: {
    getSortList () {
      return this.sortList()
    }
  },
  methods: {
    uploadImageChange (arg) {
      this.iconInfo.image = arg.data && arg.data.url
    },
    getTemplateInfo () {
      getTemplateInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addTemplate
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateTemplate
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        sort_id: null,
        name: null,
        background: null,
        type: 1,
        order: 1
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getTemplateInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
