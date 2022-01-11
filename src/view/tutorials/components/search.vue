<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-left'">
    <Form :label-width="100" inline>
      <FormItem label="分类：">
        <Select v-model="value.sort_id" class="inputWidth">
          <Option v-for="item of getSortList" :value="item.id" :key="item.id">{{ item.name }}</Option>
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
const prefixCls = 'tutorials-list'
export default {
  name: 'tutorials-list',
  data () {
    return {
      prefixCls
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  inject: [ 'sortList' ],
  computed: {
    getSortList () {
      return this.sortList()
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"tutorials-list";
.@{prefix} {
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.inputWidth {
  width: 160px;
}</style>
