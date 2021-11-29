<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-search'">
      <search v-model="searchData">
        <template slot="btn">
          <Button @click="getOrderList" type="primary">查询</Button>
        </template>
      </search>
    </div>
    <div :class="prefixCls + '-table'">
      <table-list @refresh="getOrderList" :orderList="orderList"></table-list>
    </div>
    <div :class="prefixCls + '-page'">
      <Page :total="total" show-sizer @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api/order-data'
const prefixCls = 'order-data-list'
export default {
  name: 'order-data-list',
  components: {

  },
  data () {
    return {
      prefixCls,
      id: null,
      total: 0,
      orderList: [],
      searchData: {
        page: 1,
        size: 10
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
    /**
     * @description 分页参数发生变化时调用
     * @param { Number } page 当前页码
     * @returns { undefined }
    */
    pageChange (page) {
      this.searchData.page = page
      this.getOrderList()
    },
    init () {
      this.getOrderList()
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.mr10{
  margin-right: 10px;
}
@prefix: ~"order_data_list";
.@{prefix}{
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  &-page{
    padding: 8px;
    text-align: right;
  }
}
</style>
