<template>
    <div :class="prefixCls">
        <div :class="prefixCls + '-left'">
             <Form :label-width="100" inline>
                <FormItem label="类型：">
                    <Select v-model="value.type" class="inputWidth">
                        <Option v-for="item of classificationType" :value="item.type" :key="item.type">{{item.name}}</Option>
                    </Select>
                </FormItem>
            </Form>
        </div>
        <div :class="prefixCls + '-right'">
            <slot name="btn"></slot>
        </div>
    </div>

</template>

<script>
import { classificationType } from './../page-info'
const prefixCls = 'mannager-classification-search'
export default {
  name: 'mannager-classification-search',
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      prefixCls,
      classificationType
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"mannager-classification-search";
.@{prefix}{
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.inputWidth {
  width: 160px;
}
</style>
