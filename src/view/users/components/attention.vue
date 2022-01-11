<template>
<div :class="prefixCls">
  <Modal :value="value" title="关注记录" @on-cancel="cancel">
    <div :class="prefixCls + '-table'">
      <Table :columns="record" :data="attentionList" class="iviewtable"></Table>
    </div>
    <div :class="prefixCls + '-page'">
      <Page :total=total show-total :page-size=attentionSearch.size @on-change="pageChange"></Page>
    </div>
    <div slot="footer">
      <Button type="primary" @click="cancel">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { getUserAttention } from '@/api/users'
import { record } from '../page-info'

const prefixCls = 'users--attention'
export default {
  name: 'users--attention',
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
      total: 0,
      record,
      attentionList: [],
      attentionSearch: {
        id: 0,
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    pageChange (page) {
      this.attentionSearch.page = page
      this.getUserAttention()
    },
    getUserAttention () {
      this.attentionSearch.id = this.id
      getUserAttention(this.attentionSearch).then(res => {
        this.total = res.data.total
        this.attentionList = res.data.lists || []
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
          this.getUserAttention()
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
