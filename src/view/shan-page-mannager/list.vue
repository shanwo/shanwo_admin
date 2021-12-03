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
            <table-list :pageList="pageList" @refresh="getPageList"></table-list>
        </div>
        <div :class="prefixCls + '-page'">
            <Page :total="total" show-sizer @on-change="pageChange"></Page>
        </div>
    </div>
</template>

<script>
import { userType } from './page-info'
import { getPageList } from '@/api/shan-page-mannager'

const prefixCls = 'shan-page-mannager-list'
export default {
  name: 'shan-page-mannager-list',
  components: {
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      prefixCls,
      total: 0,
      pageList: [],
      userType,
      searchData: {
        nickname: '',
        open: 0,
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

    @prefix: ~"shan-page-mannager-list";
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
