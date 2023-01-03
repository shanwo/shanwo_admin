<template>
<div :class="prefixCls">
  <Modal :value="value" title="浏览记录" @on-cancel="cancel">
    <div :class="prefixCls + '-table'">
      <Table :columns="record" :data="browseList" class="iviewtable"></Table>
    </div>
    <div :class="prefixCls + '-page'">
      <Page :total=total show-total :page-size=browseSearch.size @on-change="pageChange"></Page>
    </div>
    <div slot="footer">
      <Button type="primary" @click="cancel">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { getUserBrowse } from '@/api/users'
import { record } from '../page-info'

const prefixCls = 'users-browse'
export default {
  name: 'users-browse',
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
      browseList: [],
      browseSearch: {
        id: 0,
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    pageChange (page) {
      this.browseSearch.page = page
      this.getUserBrowse()
    },
    getUserBrowse () {
      this.browseSearch.id = this.id
      getUserBrowse(this.browseSearch).then(res => {
        this.total = res.data.total
        this.browseList = res.data.lists || []
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
          this.getUserBrowse()
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
