<template>
  <div :class="prefixCls">
    <div :class="prefixCls + '-box'">
      <!-- 菜单 -->
      <div :class="prefixCls + '-box-left'">
        <div :class="prefixCls + '-box-left-menu'">
          <template v-for="(item, index) of menu">
            <menu-item
              @touchMenu="(val) => touchMenu(index, val)"
              @touchSubMenu="touchSubMenu"
              :key="index"
              :menuDate="item"
              :isSelected="selectIndex === index"
            />
          </template>
          <template v-if="menu.length < 3">
            <div class="add-action" @click="addMenu">添加菜单</div>
          </template>
        </div>
      </div>
      <!-- 菜单信息 -->
      <div :class="prefixCls + '-box-right'">
        <menu-info-component :menuInfo="currentMenuInfo" />
      </div>
    </div>

    <div :class="prefixCls + '-footer'">
      <Button type="primary" @click="confirm">保存配置</Button>
    </div>
  </div>
</template>

<script>
import { setMenu, menuInfo } from '@/api/official'
import menuItem from './components/menu-item.vue'
import menuInfoComponent from './components/menu-info.vue'
const prefixCls = 'menu'
export default {
  name: 'menu',
  components: {
    menuItem,
    menuInfoComponent
  },
  data () {
    return {
      prefixCls,
      menu: [],
      selectIndex: 0,
      currentMenuInfo: {}
    }
  },
  methods: {
    menuInfo () {
      menuInfo().then((res) => {
        this.menu = (res.data && res.data.menu && res.data.menu.button) || []
        // 判断菜单是不是空的
        if (!this.menu.length) {
          let index = this.addMenu()
          this.touchMenu(index, this.menu[index])
        } else {
          this.touchMenu(0, this.menu[0])
        }
      })
    },
    confirm () {
      setMenu({ button: this.menu }).then(() => {
        this.$Message.success('操作成功')
      })
    },
    addMenu () {
      if (this.menu.length > 2) return
      this.menu.push({
        name: '待编辑',
        sub_button: [],
        type: 'view',
        url: ''
      })
      return this.menu.length - 1
    },
    touchMenu (index, val) {
      this.selectIndex = index
      this.$set(this, 'currentMenuInfo', val)
    },
    touchSubMenu (val) {
      this.$set(this, 'currentMenuInfo', val)
    }
  },
  created () {
    this.menuInfo()
  }
}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"menu";
.@{prefix} {
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  &-box {
    display: flex;
    justify-content: center;
    &-left {
      position: relative;
      width: 327px;
      height: 695px;
      background-image: url(//cdn.shanwo.cc/img/phone3.png);
      background-repeat: no-repeat;
      &-menu {
        position: absolute;
        bottom: 114px;
        left: 67px;
        width: 230px;
        display: flex;
        text-align: center;
        cursor: pointer;
        background-color: #fff;
        .add-action {
          flex: 1;
          height: 38px;
          line-height: 38px;
          border-left: 1px solid #e0e0e0;
        }
      }
    }
    &-right {
      padding-bottom: 30px;
      width: 450px;
    }
  }
  &-footer{
    padding: 20px 0;
    text-align: center;
  }
}
</style>
