<template>
    <div :class="prefixCls">
        <div :class="prefixCls + '-search'">
            <search v-model="searchData">
                <template slot="btn">
                    <Button @click="addIcon" type="primary" class="mr10">添加</Button>
                    <Button @click="getTutorialsMannagerList" type="primary">查询</Button>
                </template>
            </search>
        </div>
        <div :class="prefixCls + '-table'">
            <table-list @refresh="getTutorialsMannagerList" :tutorialsMannagerList="tutorialsMannagerList"
                        @toDetail="toDetail"></table-list>
        </div>
        <div :class="prefixCls + '-page'">
            <Page :total="total" show-sizer @on-change="pageChange"></Page>
        </div>
        <edit v-model="addIconStatus" :id="id" @on-change="editChange"/>
    </div>
</template>

<script>
import { getTutorialsMannagerList, getSortList } from '@/api/tutorials-mannager'

const prefixCls = 'tutorials-mannager-list'
export default {
  name: 'tutorials-mannager-list',
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
      addIconStatus: false,
      tutorialsMannagerList: [],
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
    getTutorialsMannagerList () {
      getTutorialsMannagerList(this.searchData).then(res => {
        this.total = res.data.total
        this.tutorialsMannagerList = res.data.lists || []
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
      this.getTutorialsMannagerList()
    },
    addIcon () {
      this.addIconStatus = true
    },
    toDetail (id) {
      this.id = id
      this.addIconStatus = true
    },
    editChange () {
      this.id = 0
      this.getTutorialsMannagerList()
    },
    init () {
      let that = this
      this.getSortList().then(() => {
        that.searchData.sort_id = that.sortList[0].id
        // 执行查询列表
        that.getTutorialsMannagerList()
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

    @prefix: ~"tutorials-mannager-list";
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
