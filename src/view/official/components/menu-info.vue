<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-title'">
      <span>菜单信息</span>
      <div @click="saveMenuInfo" style="width: 100px">保存</div>
    </div>
    <div :class="prefixCls + '-content'">
      <Form :label-width="100">
        <FormItem label="菜单名称:">
          <Input v-model="cloneMenuInfo.name" placeholder=""></Input>
        </FormItem>
        <FormItem label="菜单类型:">
          <RadioGroup
            v-model="cloneMenuInfo.type"
            @on-change="(val) => menuTypeHandle(val, cloneMenuInfo)"
          >
            <Radio label="media_id">素材消息</Radio>
            <Radio label="article_id">图文消息</Radio>
            <Radio label="view">跳转网页</Radio>
            <Radio label="miniprogram">跳转小程序</Radio>
          </RadioGroup>
        </FormItem>
        <template v-if="menuTypeInfo[cloneMenuInfo.type]">
          <template v-for="(item, index) of menuTypeInfo[cloneMenuInfo.type]">
            <FormItem :label="item.title + ':'" :key="index">
              <Input v-model="cloneMenuInfo[item.key]" placeholder=""></Input>
            </FormItem>
          </template>
        </template>
      </Form>
    </div>
    <div :class="prefixCls + 'subContent'"></div>
  </div>
</template>

<script>
import _ from 'loadsh'
import { menuTypeInfo, menuTypeKey } from '../page-info'
const prefixCls = 'menu-info'
export default {
  name: 'menu-info',
  data () {
    return {
      prefixCls,
      menuTypeInfo,
      menuTypeKey,
      cloneMenuInfo: {}
    }
  },
  props: {
    menuInfo: Object
  },
  watch: {
    menuInfo: {
      handler (val) {
        this.$set(this, 'cloneMenuInfo', _.cloneDeep(val || {}))
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    menuTypeHandle (val, target) {
      this.menuTypeKey.allKey &&
        this.menuTypeKey.allKey.forEach((key) => {
          this.$delete(target, key)
        })
      this.menuTypeKey[val] &&
        this.menuTypeKey[val].forEach((key) => {
          this.$set(target, key, '')
        })
      return target
    },
    saveMenuInfo () {
      _.assign(
        this.menuTypeHandle(this.cloneMenuInfo.type, this.menuInfo),
        this.cloneMenuInfo
      )
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"menu-info";
.@{prefix} {
  height: 100%;
  border: 1px solid #e0e0e0;
  &-title {
    position: relative;
    height: 38px;
    line-height: 38px;
    font-size: 20px;
    border-bottom: 1px solid #e0e0e0;
    text-align: center;
    > div {
      position: absolute;
      top: 0;
      right: 0;
      border-left: 1px solid #e0e0e0;
      line-height: 37px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  &-content {
    padding: 10px;
  }
}
</style>
