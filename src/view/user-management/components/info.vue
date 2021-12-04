<template>
<div :class="prefixCls">
  <Modal :value="value" title="查看用户信息" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem style="right: 32px;position: absolute;">
          <img :src="userInfo.avatar" style="width: 128px"/>
        </FormItem>
        <FormItem label="ID：">
          <p>{{ userInfo.id }}</p>
        </FormItem>
        <FormItem label="用户类型：" v-if="userType[userInfo.type]">
          <p>{{ userType[userInfo.type].name }}</p>
        </FormItem>
        <FormItem label="昵称：">
          <p>{{ userInfo.nickname }}</p>
        </FormItem>
        <FormItem label="性别：" v-if="userSex[userInfo.sex]">
          <p>{{ userSex[userInfo.sex].name }}</p>
        </FormItem>
        <FormItem label="生日：">
          <p>{{ userInfo.birthday }}</p>
        </FormItem>
        <FormItem label="地区：">
          <p>{{ userInfo.merger_name }}</p>
        </FormItem>
        <FormItem label="到期时间：" v-if="userInfo.renewal">
          <p>{{ userInfo.expired_at }}</p>
        </FormItem>
        <FormItem label="关联账号：">
          <Table :columns="userThird" :data="userInfo.third" class="iviewtable"></Table>
        </FormItem>
        <FormItem label="用户闪页数：">
          <p>{{ userInfo.pages }}</p>
        </FormItem>
        <FormItem label="关注的页数：">
          {{ userInfo.attention.total }}
        </FormItem>
        <FormItem label="看过的页数：">
          {{ userInfo.browse.total }}
        </FormItem>
        <FormItem label="续费方式：">
          <p v-if="userRenewal[userInfo.renewal]">{{ userRenewal[userInfo.renewal].name }}</p>
        </FormItem>
        <FormItem label="更新时间：">
          <p>{{ userInfo.updated_at }}</p>
        </FormItem>
        <FormItem label="注册时间：">
          <p>{{ userInfo.created_at }}</p>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" @click="cancel">关闭</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { userSex, userType, userThird, userRenewal } from './../page-info'
import { getUserInfo } from '@/api/user-management'

const prefixCls = 'user-management-info'
export default {
  name: 'user-management-info',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: Number
  },
  data () {
    return {
      prefixCls,
      userInfo: {
        nickname: '',
        sex: '',
        birthday: '-',
        merger_name: '',
        pages: '',
        renewal: '',
        expired_at: '',
        updated_at: '',
        created_at: '',
        third: [],
        attention: [],
        browse: []
      },
      userSex,
      userType,
      userThird,
      userRenewal
    }
  },
  methods: {
    /**
     * @description 获取用户信息
     * @returns { undefined }
     */
    getUserInfo () {
      getUserInfo({ id: this.id }).then(res => {
        this.userInfo = res.data || {}
      })
    },
    cancel () {
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getUserInfo()
        }
      },
      immediate: true
    }
  }
}
</script>
<style lang="less">
.ivu-modal-body {
  padding: 8px;
}

.ivu-form-item {
  margin-bottom: 4px;
}

.ivu-table-cell {
  padding-left: 8px;
  padding-right: 8px;
}
</style>
