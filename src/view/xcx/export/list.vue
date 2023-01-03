<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="getExportList">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getExportList" :exportList="exportList"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
</div>
</template>

<script>
import { getExportList } from '@/api/hy_export'

const prefixCls = 'export-list'

export default {
  name: 'export-list',
  components: {
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      isShowEdit: false,
      exportList: [],
      searchData: {
        venue_id: 1,
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    getExportList () {
      getExportList(this.searchData).then(res => {
        this.total = res.data.total
        this.exportList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getExportList()
    }
  },
  created () {
    this.getExportList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"export-list";
.@{prefix} {
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;

  &-page {
    padding: 8px;
    text-align: right;
  }
}
</style>
