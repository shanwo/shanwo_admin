<template>
  <div class="home bck-color">
    <Divider orientation="left">整体数据</Divider>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Divider orientation="left">数据明细</Divider>
    <Row :gutter="20">
      <i-col :md="24" :lg="24">
        <Form :label-width="80" inline>
          <FormItem label="时间区间：">
              <Date-picker @on-change="timeChange" :value="searchInfo.time" format="yyyy-MM-dd" type="daterange" placement="top-start" placeholder="选择日期" style="width: 200px"></Date-picker>
          </FormItem>
          <FormItem label="查询类型：">
              <Select v-model="searchInfo.type" class="ipt-width">
                <Option v-for="item in typeList" :value="item.value" :key="item.key"></Option>
              </Select>
          </FormItem>
          <FormItem :label-width="0">
              <Button type="primary">查询</Button>
          </FormItem>
        </Form>
      </i-col>
      <i-col :md="24" :lg="24">
        <Card shadow>
          <example style="height: 300px"/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '累计用户', icon: 'md-person', count: 803, color: '#2d8cf0' },
        { title: '累计收益', icon: 'social-yen', count: 232, color: '#19be6b' },
        { title: '会员用户', icon: 'md-ribbon-a', count: 142, color: '#ff9900' },
        { title: '累计闪页', icon: 'md-paper', count: 657, color: '#ed3f14' },
        { title: '昨日新增', icon: 'md-person-add', count: 12, color: '#E46CBB' },
        { title: '昨日日活', icon: 'md-map', count: 14, color: '#9A66E4' },
        { title: '今日新增', icon: 'md-person-add', count: 12, color: '#E46CBB' },
        { title: '今日日活', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      typeList: [
        {
          value: '新增用户数',
          key: 1
        },
        {
          value: '活跃用户',
          key: 2
        },
        {
          value: '会员增长',
          key: 3
        },
        {
          value: '闪页增长',
          key: 4
        }
      ],
      searchInfo: {
        type: 1,
        time: []
      }
    }
  },
  methods: {
    timeChange (arg) {
      this.$set(this, 'searchTimeRange', arg);
    },
    searchEchartDataList () {

    }
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
.bck-color{
  padding: 0 20px;
  overflow: hidden;
  background-color: #fff;
}
.ipt-width{
  width: 200px;
}
</style>
