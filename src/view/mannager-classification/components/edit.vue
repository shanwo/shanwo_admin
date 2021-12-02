<template>
    <Modal :value="param" title="编辑用户信息" >
       <Form>
            <FormItem label="分类：" :label-width="100">
                <Select v-model="classificationInfo.type" :disabled="!!id" class="iptWidth">
                    <Option v-for="item in classificationType" :value="item.type" :key="item.type">{{item.name}}</Option>
                </Select>
            </FormItem>
            <FormItem label="名称：" :label-width="100">
                <Input v-model="classificationInfo.name" placeholder="请输入名称" class="iptWidth"></Input>
            </FormItem>
            <FormItem label="排序：" :label-width="100">
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
const prefixCls = 'mannager-classification-edit'
export default {
  name: 'mannager-classification-edit',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: Number
  },
  data () {
    return {
      prefixCls,
      classificationInfo: {},
      classificationType
    }
  },
  computed: {
    param: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
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
        this.$Message.success('操作成功')
        this.$emit('refresh')
        this.cancel()
      })
    },
    /**
         * @description 取消弹层
         * @returns { undefined }
        */
    cancel () {
      this.$set(this, 'classificationInfo', {})
      this.$emit('input', false)
      this.$emit('on-change')
      this.param = false
    },
    /**
         * @description 获取用户信息
         * @returns { undefined }
        */
    getClassificationInfo () {
      getClassificationInfo({ id: this.id }).then(res => {
        this.classificationInfo = res.data || {}
      })
    },
    /**
         * @description 控制弹出层的显示隐藏
         * @param { Boolearn } 是否显示
         * @returns { undefined }
        */
    modelValChange (val) {
      if (val && this.id) {
        this.getClassificationInfo()
      }
    }
  },
  watch: {
    value: {
      handler: 'modelValChange',
      immediate: true
    }
  }
}
</script>
