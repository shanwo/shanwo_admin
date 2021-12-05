<template>
<div :class="prefixCls">
  <Modal :value="value" title="推荐设置">
    <Form :label-width="100">
      <FormItem label="缓存类型：">
        <Select v-model="pageInfo.cache" class="inputWidth">
          <Option v-for="item of cacheTypeList" :value="item.type" :key="item.type">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="排序值：">
        <Input-number v-model="pageInfo.sort" placeholder="请输入排序值" class="inputWidth"></Input-number>
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="confirm">确定</Button>
      <Button type="primary" @click="cancel" ghost>取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { openType, userType, cacheTypeList } from './../page-info'
import { setSortConfig } from '@/api/shan-page-management'

const prefixCls = 'edit'
export default {
  name: 'edit',
  data () {
    return {
      prefixCls,
      userType,
      openType,
      cacheTypeList,
      pageInfo: {
        cache: 1,
        sort: 1
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
    /**
     * @description 确认修改用用户状态
     * @returns { undefined }
     */
    confirm () {
      setSortConfig({ id: this.id, ...this.pageInfo }).then(() => {
        this.$Message.success('修改成功')
        this.$emit('refresh')
        this.cancel()
      })
    },
    /**
     * @description 取消弹层
     * @returns { undefined }
     */
    cancel () {
      this.$emit('input', false)
      this.$emit('on-change')
    }
  }
}
</script>
