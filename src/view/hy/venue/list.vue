<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button @click="addIcon" type="primary" class="mr10">添加</Button>
        <Button @click="getVenueList" type="primary">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getVenueList" :venueList="venueList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
  <edit v-model="isShowEdit" :id="id" @on-change="editVenue"/>
</div>
</template>

<script>
import { getVenueList } from '@/api/venue'

const prefixCls = 'pay-list'

export default {
  name: 'pay-list',
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
      venueList: [],
      searchData: {
        keyword: '',
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    /**
     * @description 获取链接白名单列表
     * @returns { undefined }
     */
    getVenueList () {
      getVenueList(this.searchData).then(res => {
        this.total = res.data.total
        this.venueList = res.data.lists || []
      })
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getVenueList()
    },
    addIcon () {
      this.id = ''
      this.isShowEdit = true
    },
    toDetail (id) {
      this.id = id
      this.isShowEdit = true
    },
    editVenue () {
      this.id = 0
      this.getVenueList()
    }
  },
  created () {
    this.getVenueList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"pay-list";
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
