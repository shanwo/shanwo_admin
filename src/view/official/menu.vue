<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-table'">
    <Form :label-width="100">
      <textarea @refresh="menuInfo" :rows="32" v-model="menu" class="ivu-input"/>
    </Form>
  </div>
  <div slot="footer">
    <Button type="primary" @click="confirm">更新</Button>
  </div>
</div>
</template>

<script>
import { setMenu, menuInfo } from '@/api/official'

const prefixCls = 'menu'
export default {
  name: 'menu',
  data () {
    return {
      prefixCls,
      menu: {}
    }
  },
  methods: {
    menuInfo () {
      menuInfo().then(res => {
        this.menu = JSON.stringify(res.data, null, 4)
      })
    },
    confirm () {
      let summitInfo = {}
      summitInfo['menu'] = JSON.parse(this.menu)
      setMenu(summitInfo).then(() => {
        this.$Message.success('操作成功')
      })
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

  &-page {
    padding: 8px;
    text-align: right;
  }
}
</style>
