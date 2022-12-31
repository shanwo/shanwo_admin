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
        <FormItem label="名称：">
          <Input v-model="iconInfo.name" placeholder="请输入名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="图片上传：">
          <image-upload v-model="iconInfo.image" @on-change="uploadImageChange"/>
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
import { updateDecoration, addDecoration, getDecorationInfo } from '@/api/sw_decoration'

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
      iconInfo: {
        sort_id: null,
        name: '',
        image: null,
        order: 1
      }
    }
  },
  components: {
    imageUpload: () => import('@/components/image-upload')
  },
  inject: [ 'sortList' ],
  computed: {
    getSortList () {
      return this.sortList()
    }
  },
  methods: {
    uploadImageChange (arg) {
      this.iconInfo.image = arg.data && arg.data.url
    },
    getDecorationInfo () {
      getDecorationInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addDecoration
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateDecoration
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
      })
    },
    cancel () {
      this.$set(this, 'iconInfo', {
        sort_id: null,
        name: null,
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
          this.getDecorationInfo()
        }
      },
      immediate: true
    }
  }
}
</script>
