<template>
<Modal :value="value" title="编辑用户信息" @on-cancel="cancel">
  <Form :label-width="100">
    <FormItem label="分类：">
      <Select v-model="classificationInfo.type" :disabled="!!id" class="iptWidth">
        <Option v-for="item in classificationType" :value="item.type" :key="item.type">{{ item.name }}
        </Option>
      </Select>
    </FormItem>
    <FormItem label="名称：">
      <Input v-model="classificationInfo.name" placeholder="请输入名称" class="iptWidth"></Input>
    </FormItem>
    <FormItem label="排序：">
      <Input-number v-model="classificationInfo.order" placeholder="请输入排序" class="iptWidth"></Input-number>
    </FormItem>
  </Form>
  <div slot="footer">
    <Button type="primary" @click="confirm">确定</Button>
    <Button type="primary" @click="cancel" ghost>取消</Button>
  </div>
</Modal>

</template>

<script>
import { classificationType } from './../page-info'
import { getClassificationInfo, addClassification, updateClassification } from '@/api/mannager-classification'

const prefixCls = 'edit'
export default {
  name: 'edit',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number
    }
  },
  data () {
    return {
      prefixCls,
      classificationInfo: {
        type: null,
        name: '',
        order: 1
      },
      classificationType
    }
  },
  methods: {
    getClassificationInfo () {
      getClassificationInfo({ id: this.id }).then(res => {
        this.$set(this, 'classificationInfo', res.data || {})
      })
    },
    /**
     * @description 确认修改类型
     * @returns { undefined }
     */
    confirm () {
      let actionFn = addClassification
      let summitInfo = {}
      for (let key in this.classificationInfo) {
        if (this.classificationInfo[key]) {
          summitInfo[key] = this.classificationInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateClassification
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    /**
     * @description 取消弹层
     * @returns { undefined }
     */
    cancel () {
      this.$set(this, 'classificationInfo', {
        type: null,
        image: null,
        order: null
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getClassificationInfo()
        }
      },
      immediate: true
    }
  }
}
</script>
