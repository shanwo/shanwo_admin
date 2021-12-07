<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-search'">
      <search v-model="searchData">
        <template slot="btn">
          <Button @click="addIcon" type="primary" class="mr10">添加</Button>
          <Button @click="getConfiglList" type="primary">刷新</Button>
        </template>
      </search>
    </div>
    <div :class="prefixCls + '-table'">
      <table-list @refresh="getConfiglList" :configlList="configlList" @toDetail="toDetail"></table-list>
    </div>
    <div :class="prefixCls + '-page'">
      <Page :total="total" show-sizer @on-change="pageChange"></Page>
    </div>
    <edit v-model="isShowEdit" :id="id" @on-change="editChange"/>
  </div>
</template>

<script>
import { getConfiglList } from '@/api/config-management'

const prefixCls = 'config-management-list'

export default {
  name: 'config-management-list',
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
      isShowEdit: false,
      configlList: [],
      searchData: {
        page: 1,
        size: 10
      }
    }
  },
  methods: {
    /**
     * @description 获取链接白名单列表
     * @returns { undefined }
     */
    getConfiglList () {
      getConfiglList(this.searchData).then(res => {
        this.total = res.data.total
        this.configlList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.value.page = page
      this.getConfiglList()
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
      this.getConfiglList()
    }
  },
  created () {
    this.getConfiglList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"config-management-list";
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
