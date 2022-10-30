<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="getUserFeedbackList">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list :userFeedbackList="userFeedbackList" @refresh="getUserFeedbackList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
  <result v-model="isShowEdit" :id="id" @on-change="editChange"/>
</div>
</template>

<script>
import { getUserFeedbackList } from '@/api/feedback'

const prefixCls = 'feedback-list'
export default {
  name: 'feedback-list',
  components: {
    result: () => import('./components/result.vue'),
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      isShowEdit: false,
      userFeedbackList: [],
      searchData: {
        type: '',
        user_id: 0,
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    /**
     * @description 获取用户列表
     * @returns { undefined }
     */
    getUserFeedbackList () {
      getUserFeedbackList(this.searchData).then(res => {
        this.total = res.data.total
        this.userFeedbackList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getUserFeedbackList()
    },
    toDetail (id) {
      this.id = id
      this.isShowEdit = true
    },
    editChange () {
      this.id = 0
      this.getUserFeedbackList()
    }
  },
  created () {
    this.getUserFeedbackList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"feedback-list";
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
