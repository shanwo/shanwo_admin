<template>
<div :class="prefixCls">
  <Modal :value="value" title="推荐设置" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
      <FormItem label="推荐类型：">
        <Select v-model="cache" class="inputWidth">
          <Option v-for="item of cacheTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="排序值：">
        <Input-number v-model="pageInfo.sort" placeholder="请输入排序值" class="inputWidth"></Input-number>
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
import { cacheTypeList } from './../page-info'
import { setSortConfig, getPageInfo } from '@/api/shan-page-management'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      cacheTypeList,
      cache: 1,
      pageInfo: {}
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
    getPageInfo () {
      getPageInfo({ id: this.id }).then(res => {
        this.$set(this, 'pageInfo', res.data || {})
      })
    },
    /**
     * @description 确认修改用用户状态
     * @returns { undefined }
     */
    confirm () {
      let summitInfo = {}
      summitInfo.id = this.id
      summitInfo.sort = this.pageInfo.sort
      setSortConfig(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    /**
     * @description 取消弹层
     * @returns { undefined }
     */
    cancel () {
      this.$set(this, 'pageInfo', {
        cache: 0
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getPageInfo()
        }
      },
      immediate: true
    }
  }
}
</script>
