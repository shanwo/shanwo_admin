<template>
<div :class="prefixCls">
  <Modal :value="value" title="收入详情" @on-cancel="cancel">
    <div :class="prefixCls + '-table'">
      <Table :columns="orderLists" :data="revenueInfo.lists" class="iviewtable"></Table>
    </div>
    <div slot="footer">
      <Button type="primary" @click="cancel">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { orderLists } from '../page-info'
import { revenueInfo } from '@/api/hy_revenue'

const prefixCls = 'revenue-info'
export default {
  name: 'revenue-info',
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
      revenueInfo:{
        lists :[]
      },
      orderLists
    }
  },
  methods: {
    /**
     * @description 获取信息
     * @returns { undefined }
     */
    getRevenueInfo () {
      revenueInfo({ id: this.id }).then(res => {
        this.revenueInfo = res.data || {}
      })
    },
    cancel () {
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getRevenueInfo()
        }
      }
    }
  }
}
</script>
<style lang="less">
.ivu-modal-body {
  padding: 8px;
}

.ivu-form-item {
  margin-bottom: 4px;
}

.ivu-table-cell {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
