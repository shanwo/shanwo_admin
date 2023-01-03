<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button type="primary" @click="getOrderList" class="mr10">查询</Button>
        <Button type="primary" @click="orderExport">导出</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list :orderList="orderList" @refresh="getOrderList"  @toDetail="toDetail"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
  <refund v-model="isShowEdit" :order_sn="order_sn" @on-change="editChange"/>
  <info v-model="isShowInfo" :order_sn="order_sn"/>
</div>
</template>

<script>
import { getOrderList,orderExport } from '@/api/hy_order'

import info from './components/info.vue'
import refund from './components/refund.vue'
import search from './components/search.vue'
import tableList from './components/table-list.vue'

const prefixCls = 'order-list'
export default {
  name: 'order-list',
  components: {
    info,
    refund,
    search,
    tableList
  },
  data () {
    return {
      prefixCls,
      order_sn: null,
      total: 0,
      orderList: [],
      isShowEdit: false,
      isShowInfo: false,
      searchData: {
        venue_id: 1,
        order_sn: '',
        third_sn: '',
        user_id: '',
        status: 30,
        page: 1,
        size: 20
      }
    }
  },
  methods: {
    /**
     * @description 获取订单列表
     * @returns { undefined }
     */
    getOrderList () {
      getOrderList(this.searchData).then(res => {
        this.total = res.data.total
        this.orderList = res.data.lists || []
      })
    },
    orderExport () {
      orderExport(this.searchData).then()
    },
    toRefund (order_sn) {
      this.order_sn = order_sn
      this.isShowEdit = true
    },
    toDetail (order_sn) {
      this.order_sn = order_sn
      this.isShowInfo = true
    },
    editChange () {
      this.order_sn = ''
      this.getOrderList()
    },
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
     */
    pageChange (page) {
      this.searchData.page = page
      this.getOrderList()
    }
  },
  created () {
    this.getOrderList()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"order-list";
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
