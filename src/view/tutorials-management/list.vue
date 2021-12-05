<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button @click="addIcon" type="primary" class="mr10">添加</Button>
        <Button @click="getTutorialsManagementList" type="primary">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getTutorialsManagementList" :tutorialsManagementList="tutorialsManagementList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total="total" show-sizer @on-change="pageChange"></Page>
  </div>
  <edit v-model="isShowEdit" :id="id" @on-change="editChange"/>
</div>
</template>

<script>
import { getTutorialsManagementList, getSortList } from '@/api/tutorials-management'

const prefixCls = 'tutorials-management-list'
export default {
  name: 'tutorials-management-list',
  components: {
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue'),
    edit: () => import('./components/edit.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      sortType: 2,
      isShowEdit: false,
      tutorialsManagementList: [],
      sortList: [],
      searchData: {
        sort_id: 0,
        page: 1,
        size: 10
      }
    }
  },
  provide () {
    return {
      sortList: () => this.sortList
    }
  },
  methods: {
    /**
     * @description 获取教程列表
     * @returns { undefined }
     */
    getTutorialsManagementList () {
      getTutorialsManagementList(this.searchData).then(res => {
        this.total = res.data.total
        this.tutorialsManagementList = res.data.lists || []
      })
    },
    /**
     * @description 获取sort列表
     * @returns { undefined }
     */
    getSortList () {
      return getSortList({ type: this.sortType }).then(res => {
        this.sortList = res.data && res.data.lists
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getTutorialsManagementList()
    },
    addIcon () {
      this.isShowEdit = true
    },
    toDetail (id) {
      this.id = id
      this.isShowEdit = true
    },
    editChange () {
      this.id = 0
      this.getTutorialsManagementList()
    },
    init () {
      let that = this
      this.getSortList().then(() => {
        that.searchData.sort_id = that.sortList[0].id
        // 执行查询列表
        that.getTutorialsManagementList()
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"tutorials-management-list";
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
