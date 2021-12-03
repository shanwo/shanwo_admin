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
            <table-list :userList="userList" @refresh="getUserList"></table-list>
        </div>
        <div :class="prefixCls + '-page'">
            <Page :total="total" show-sizer @on-change="pageChange"></Page>
        </div>
    </div>
</template>

<script>
import { getUserList } from '@/api/user-management'

const prefixCls = 'user-management-list'
export default {
  name: 'user-management-list',
  components: {
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      total: 0,
      userList: [],
      userType: [
        {
          type: 0,
          typeName: '全部'
        },
        {
          type: 1,
          typeName: '普通'
        },
        {
          type: 2,
          typeName: '会员'
        },
        {
          type: 3,
          typeName: '黑名单'
        }
      ],
      searchData: {
        type: 0,
        keyword: '',
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
      this.value.page = page
      this.getUserList()
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

    @prefix: ~"user-management-list";
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
