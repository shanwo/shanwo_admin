<template>
    <div :class="prefixCls">
        <div :class="prefixCls + '-search'">
            <search v-model="searchData">
                <template slot="btn">
                    <Button type="primary" @click="addClassification" class="mr10">创建分类</Button>
                    <Button type="primary" @click="getClassificationList">查询</Button>
                </template>
            </search>
        </div>
        <div :class="prefixCls + '-table'">
            <table-list :userList="userList" @refresh="getClassificationList"></table-list>
        </div>
        <edit v-model="isShowEdit" :id="editId" @refresh="refresh"></edit>
    </div>
</template>

<script>
import { getClassificationList } from '@/api/mannager-classification'
const prefixCls = 'mannager-classification-list'

export default {
  name: 'mannager-classification-list',
  components: {
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue'),
    edit: () => import('./components/edit.vue')
  },
  data () {
    return {
      prefixCls,
      total: 0,
      editId: 0,
      userList: [],
      isShowEdit: false,
      addClassificationStatus: false,
      searchData: {
        type: 0
      }
    }
  },
  methods: {
    /**
         * @description 获取分类列表
         * @returns { undefined }
         */
    getClassificationList () {
      getClassificationList(this.searchData).then(res => {
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
      this.getClassificationList()
    },
    addClassification () {
      this.isShowEdit = true
    },
    refresh () {
      this.getClassificationList()
    }
  },
  created () {
    this.getClassificationList()
  }
}
</script>

<style lang="less" scoped>
    .mr10 {
        margin-right: 10px;
    }

    @prefix: ~"mannager-classification-list";
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
