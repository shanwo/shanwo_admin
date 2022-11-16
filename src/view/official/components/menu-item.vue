<template>
<div :class="prefixCls" @click="touchMenu">
  <div :class="{ selected: isSelected }">{{ menuDate.name }}</div>
  <div :class="prefixCls + '-submenu'" v-if="isSelected">
    <template v-for="(item, subIndex) of menuDate.sub_button">
      <div
          :class="{
            [`${prefixCls}-submenu-item`]: true,
            selected: selectSubIndex === subIndex
          }"
          :key="subIndex"
          @click.stop="() => touchSubMenu(subIndex)"
      >
        {{ item.name }}
      </div>
    </template>
    <template v-if="menuDate.sub_button.length < 5">
      <div :class="prefixCls + '-submenu-item'" @click.stop="addSubmenu">添加子菜单</div>
    </template>
  </div>
</div>
</template>

<script>
const prefixCls = 'menu-item'
export default {
  name: 'menu-item',
  data () {
    return {
      prefixCls,
      selectSubIndex: 0
    }
  },
  props: {
    menuDate: Object,
    isSelected: Boolean
  },
  methods: {
    touchMenu () {
      this.$emit('touchMenu', this.menuDate)
    },
    touchSubMenu (subIndex) {
      this.selectSubIndex = subIndex
      this.$emit('touchSubMenu', this.menuDate.sub_button[subIndex])
    },
    addSubmenu () {
      let menuInfo = {
        name: '待编辑',
        sub_button: [],
        type: 'view',
        url: ''
      }
      this.menuDate.sub_button.push(menuInfo)
      this.$emit('touchSubMenu', menuInfo)
    }
  }
}
</script>

<style lang="less" scoped>
@prefix: ~"menu-item";
.@{prefix} {
  position: relative;
  flex: 1;
  height: 36px;
  line-height: 36px;
  background: #fff;
  border-left: 1px solid #e0e0e0;

  &-submenu {
    position: absolute;
    bottom: 36px;
    width: 100%;
    line-height: 36px;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
  }

  .selected {
    color: cornflowerblue;
  }
}
</style>
