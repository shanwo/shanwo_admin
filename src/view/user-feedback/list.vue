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
    <Page :total="total" show-sizer @on-change="pageChange"></Page>
  </div>
</div>
</template>

<script>
import { getUserFeedbackList } from '@/api/user-feedback'

const prefixCls = 'user-feedback-list'
export default {
  name: 'user-feedback-list',
  components: {
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      editId: null,
      total: 0,
      userFeedbackList: [],
      infoData: false,
      searchData: {
        type: '',
        nickname: '',
        page: 1,
        size: 10
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
      this.value.page = page
      this.getUserFeedbackList()
    },
    toDetail (id) {
      this.id = id
      this.infoData = true
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

@prefix: ~"user-feedback-list";
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
