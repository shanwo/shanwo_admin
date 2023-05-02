<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="场地：">
        <Select v-model="value.venue_id" class="inputWidth" clearable>
          <Option v-for="item in selectArr" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="摄影师ID：">
        <Input v-model="value.user_id" class="inputWidth" placeholder="摄影师ID" clearable></Input>
      </FormItem>
      <FormItem label="统计时间：">
        <Date-picker
            @on-change="timeChange"
            :value="this.start_end"
            format="yyyy-MM-dd"
            type="daterange"
            placement="top-start"
            placeholder="选择日期"
        ></Date-picker>
      </FormItem>
    </Form>
  </div>
  <div :class="prefixCls + '-right'">
    <slot name="btn"></slot>
  </div>
</div>

</template>

<script>
import { getVenueSelect } from '@/api/hy_venue'

const prefixCls = 'order-list'
export default {
  name: 'order-list',
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  mounted () {
    getVenueSelect().then(res => {
      this.selectArr = res.data.lists
    })
  },
  data () {
    return {
      prefixCls,
      selectArr: [],
      start_end:[]
    }
  },
  methods: {
    timeChange (arg) {
      this.value['start_time'] = arg[0]
      this.value['end_time'] = arg[1]
      this.$emit('input', this.value)
    },
    // 获取当前日期
    getToday() {
      //获取当前日期
      let myDate = new Date();
      let nowY = myDate.getFullYear();
      let nowM = myDate.getMonth() + 1;
      let nowD = myDate.getDate();
      let endDate =
          nowY +
          "-" +
          (nowM < 10 ? "0" + nowM : nowM) +
          "-" +
          (nowD < 10 ? "0" + nowD : nowD); //当前日期
      return endDate;
    },

    // 获取三十天之前的日期
    getThreeDaysAgo() {
      let myDate = new Date();
      let lw = new Date(myDate - 1000 * 60 * 60 * 24 * 30); //最后一个数字30可改，30天的意思
      let lastY = lw.getFullYear();
      let lastM = lw.getMonth() + 1;
      let lastD = lw.getDate();
      let startData =
          lastY +
          "-" +
          (lastM < 10 ? "0" + lastM : lastM) +
          "-" +
          (lastD < 10 ? "0" + lastD : lastD); //三十天之前日期
      return startData;
    },
  },
  created () {
    // 设置开始日期为前30天,结束日期是当前日期,注意使用$set来设置!
    let startDate = this.getThreeDaysAgo();
    let endDate = this.getToday();
    this.start_end = [startDate, endDate];
    this.$set(this.value, "start_time",startDate);
    this.$set(this.value, "end_time",endDate);
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"order-list";
.@{prefix} {
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.inputWidth {
  width: 160px;
}
</style>
