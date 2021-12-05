<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="getPageList">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list :pageList="pageList" @refresh="getPageList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total="total" show-sizer @on-change="pageChange"></Page>
  </div>
  <edit v-model="isShowEdit" :id="id" @on-change="editChange"/>
</div>
</template>

<script>
import { userType } from './page-info'
import { getPageList } from '@/api/shan-page-management'

const prefixCls = 'shan-page-management-list'
export default {
  name: 'shan-page-management-list',
  components: {
    edit: () => import('./components/edit.vue'),
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      pageList: [],
      isShowEdit: false,
      userType,
      searchData: {
        nickname: '',
        open: '',
        keyword: '',
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    /**
     * @description 获取闪页列表
     * @returns { undefined }
     */
    getPageList () {
      getPageList(this.searchData).then(res => {
        this.total = res.data.total
        this.pageList = res.data.lists || []
      })
    },
    toDetail (id) {
      this.id = id
      this.isShowEdit = true
    },
    editChange () {
      this.id = 0
      this.getPageList()
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.value.page = page
      this.getPageList()
    }
  },
  created () {
    this.getPageList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"shan-page-management-list";
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
