<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="addIcon" class="mr10">添加</Button>
        <Button type="primary" @click="getAvatarPendantList">查询</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getAvatarPendantList" :avatarPendantList="avatarPendantList" @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
  <edit v-model="isShowEdit" :id="id" @on-change="editChange"/>
</div>
</template>

<script>
import { getAvatarPendantList, getSortList } from '@/api/avatar-pendant'

const prefixCls = 'avatar-pendant-list'
export default {
  name: 'avatar-pendant-list',
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
      sortType: 1,
      isShowEdit: false,
      avatarPendantList: [],
      sortList: [],
      searchData: {
        sort_id: 0,
        page: 1,
        size: 20
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
     * @description 获取挂件列表列表
     * @returns { undefined }
     */
    getAvatarPendantList () {
      getAvatarPendantList(this.searchData).then(res => {
        this.total = res.data.total
        this.avatarPendantList = res.data.lists || []
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
      this.getAvatarPendantList()
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
      this.getAvatarPendantList()
    },
    init () {
      let that = this
      this.getSortList().then(() => {
        that.searchData.sort_id = that.sortList[0].id
        // 执行查询列表
        that.getAvatarPendantList()
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

@prefix: ~"avatar-pendant-list";
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
