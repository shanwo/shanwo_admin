<template>
  <div :class="prefixCls">
    <Modal :value="value" title="查看用户信息" @on-cancel="cancel">
      <div :class="prefixCls + '-box'">
        <img :src="userInfo.avatar" style="float: right;width: 128px"/>
        <p>ID：{{userInfo.id}}</p>
        <p>类型：{{userType[userInfo.type].typeName}}</p>
        <p>昵称：{{userInfo.nickname}}</p>
        <p>性别：{{userInfo.sex}}</p>
        <p>生日：{{userInfo.birthday}}</p>
        <p>地区：{{userInfo.merger_name}}</p>
        <p>闪页数：{{userInfo.pages}}</p>
        <p>续费方式：{{userRenewal[userInfo.renewal].typeName}}</p>
        <p>到期时间：{{userInfo.expired_at}}</p>
        <p>更新时间：{{userInfo.updated_at}}</p>
        <p>创建时间：{{userInfo.created_at}}</p>
        <p>绑定账号：{{ userInfo.third }}</p>
        <p>关注的闪页：{{userInfo.attention}}</p>
        <p>看过的闪页：{{userInfo.browse}}</p>
      </div>
      <div slot="footer">
        <Button type="primary" @click="cancel">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { userType, userRenewal } from './../page-info'
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
        third: '',
        attention: '',
        browse: ''
      },
      userType,
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
