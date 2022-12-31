<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-left'">
      <Form :label-width="100" inline>
        <FormItem label="场地：">
          <Select v-model="value.venue_id" class="inputWidth" clearable>
            <Option v-for="item in selectArr" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
        <FormItem label="关键字：">
          <Input
            v-model="value.keyword"
            class="inputWidth"
            placeholder="请输入关键字"
            clearable
          ></Input>
        </FormItem>
        <FormItem label="拍摄时间：">
          <Date-picker
            @on-change="timeChange"
            :value="value.time"
            format="yyyy-MM-dd"
            type="daterange"
            placement="top-start"
            placeholder="选择日期"
            style="width: 200px"
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
import { getVenueSelect } from '@/api/venue'

const prefixCls = 'image-list'
export default {
  name: 'image-list',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
    getVenueSelect().then((res) => {
      this.selectArr = res.data.lists
    })
  },
  data () {
    return {
      prefixCls,
      selectArr: []
    }
  },
  methods: {
    timeChange (arg) {
      this.value['start_time'] = arg[0]
      this.value['end_time'] = arg[1]
      this.$emit('input', this.value)
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"image-list";
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
