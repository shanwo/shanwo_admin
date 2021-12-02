<template>
    <div :class="prefixCls">
        <Modal :value="value" title="编辑/添加" @on-cancel="cancel">
            <div :class="prefixCls + '-box'">
                <Form :label-width="100" >
                    <FormItem label="所属分类：" >
                        <Select v-model="iconInfo.sort_id" class="iptWidth">
                            <Option v-for="(item, index) of getSortList" :value="item.id" :key="index">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                  <FormItem label="名称：" >
                    <Input-number :min="1" v-model="iconInfo.name" placeholder="教程名称"  class="iptWidth"></Input-number>
                  </FormItem>
                    <FormItem label="图片上传：" >
                        <image-upload v-model="iconInfo.image" @on-change="uploadImageChange" />
                    </FormItem>
                    <FormItem label="排序：" >
                        <Input-number :min="1" v-model="iconInfo.order" placeholder="请输入排序值"  class="iptWidth"></Input-number>
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
import { updateTutorials, addTutorials, getTutorialsInfo } from '@/api/tutorials-mannager'
const prefixCls = 'edit'
export default {
  name: 'edit',
  components: {
    imageUpload: () => import('@/components/image-upload')
  },
  data () {
    return {
      prefixCls,
      iconInfo: {
        sort_id: null,
        image: null,
        name: '',
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
      return this.sortList && this.sortList() || []
    }
  },
  methods: {
    uploadImageChange (arg) {
      this.iconInfo.image = arg.data && arg.data.url
    },
    getTutorialsInfo () {
      getTutorialsInfo({ id: this.id }).then(res => {
        this.$set(this, 'iconInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = addTutorials
      let summitInfo = {}
      for (let key in this.iconInfo) {
        if (this.iconInfo[key]) {
          summitInfo[key] = this.iconInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        actionFn = updateTutorials
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
        image: null,
        url: null,
        type: 1,
        order: null,
        description: null
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getTutorialsInfo()
        }
      },
      immediate: true
    }
  }

}
</script>
