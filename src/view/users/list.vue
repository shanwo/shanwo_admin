<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="getUserList">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list :userList="userList" @refresh="getUserList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
  <info v-model="infoData" :id="id"/>
</div>
</template>

<script>
import { getUserList } from '@/api/users'

const prefixCls = 'users-list'
export default {
  name: 'users-list',
  components: {
    info: () => import('./components/info.vue'),
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      userList: [],
      userType: [],
      infoData: false,
      searchData: {
        type: '',
        keyword: '',
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
    getUserList () {
      getUserList(this.searchData).then(res => {
        this.total = res.data.total
        this.userList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getUserList()
    },
    toDetail (id) {
      this.id = id
      this.infoData = true
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"users-list";
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
