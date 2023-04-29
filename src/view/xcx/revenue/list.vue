<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="getRevenueList">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getRevenueList" :revenueList="revenueList"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
</div>
</template>

<script>
import { getRevenueList } from '@/api/hy_revenue'

const prefixCls = 'revenue-list'

export default {
  name: 'revenue-list',
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
      revenueList: [],
      searchData: {
        venue_id: 1,
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    getRevenueList () {
      getRevenueList(this.searchData).then(res => {
        this.total = res.data.total
        this.revenueList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getRevenueList()
    }
  },
  created () {
    this.getRevenueList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"revenue-list";
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
