<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <Button v-model="searchData" @click="getMaterialList" type="primary">刷新</Button>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getMaterialList" :materialList="materialList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total="total" show-sizer @on-change="pageChange"></Page>
  </div>
</div>
</template>

<script>
import { getMaterialList } from '@/api/official'

const prefixCls = 'article-list'

export default {
  name: 'article-list',
  components: {
    tableList: () => import('./components/table-article.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      isShowEdit: false,
      materialList: [],
      searchData: {
        type: 'news',
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    getMaterialList () {
      getMaterialList(this.searchData).then(res => {
        this.total = res.data.total
        this.materialList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getMaterialList()
    },
    toDetail (id) {
      this.id = id
      this.isShowEdit = true
    }
  },
  created () {
    this.getMaterialList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"article-list";
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
