<template>
<div :class="prefixCls">
  <Modal :value="value" title="查看用户信息" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form>
        <FormItem style="right: 8px;position: absolute;">
          <img :src="userInfo.avatar" style="width: 120px"/>
        </FormItem>
        <FormItem label="ID：" style="width:200px;float: left">
          <p>{{ userInfo.id }}</p>
        </FormItem>
        <FormItem label="昵称：">
          <p>{{ userInfo.nickname }}</p>
        </FormItem>
        <FormItem label="性别：" v-if="userSex[userInfo.sex]" style="width:200px;float: left">
          <p>{{ userSex[userInfo.sex].name }}</p>
        </FormItem>
        <FormItem label="生日：">
          <p>{{ userInfo.birthday }}</p>
        </FormItem>
        <FormItem label="关注数：" style="width:200px;float: left">
          {{ userInfo.attention.total }}
        </FormItem>
        <FormItem label="浏览数：">
          {{ userInfo.browse.total }}
        </FormItem>
        <FormItem label="闪页数：" style="width:200px;float: left">
          {{ userInfo.pages }}
        </FormItem>
        <FormItem label="地区：">
          <p>{{ userInfo.merger_name }}</p>
        </FormItem>
        <div v-if="userInfo.type == 2">
          <FormItem label="用户类型：" v-if="userType[userInfo.type]" style="width:200px;float: left">
            <p>{{ userType[userInfo.type].name }}</p>
          </FormItem>
          <FormItem label="购买类型：">
            <p v-if="userVipType[userInfo.vip_type]">{{ userVipType[userInfo.vip_type].name }}</p>
          </FormItem>
          <FormItem label="到期时间：" v-if="userInfo.vip_type">
            <p>{{ userInfo.expired_at }}</p>
          </FormItem>
        </div>
        <FormItem label="注册时间：" style="width:200px;float: left">
          <p>{{ userInfo.created_at }}</p>
        </FormItem>
        <FormItem label="更新时间：">
          <p>{{ userInfo.updated_at }}</p>
        </FormItem>
        <FormItem label="关联账号：">
        </FormItem>
        <FormItem>
          <Table :columns="userThird" :data="userInfo.third" class="iviewtable"></Table>
        </FormItem>
        <FormItem label="标签">
          <p v-for="tag in userInfo.tags" :key="tag.id" style="background:#ccc;padding:0 8px;  margin-right: 8px;border-radius:5px; float: left;">
            {{ tag.name }} : {{ tag.value }}
          </p>
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
import { userSex, userType, userThird, userVipType } from '../page-info'
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
        vip_type: '',
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
      userVipType
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
