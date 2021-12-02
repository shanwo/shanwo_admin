<template>
    <Modal :value="param" title="编辑用户信息" >
       <Form>
           <FormItem label="用户类型：" :label-width="100">
                <Select v-model="userInfo.type">
                    <Option v-for="item of userType" :value="item.type" :key="item.type">{{item.typeName}}</Option>
                </Select>
           </FormItem>
       </Form>
       <div slot="footer">
           <Button type="primary" @click="confirm">确定</Button>
           <Button type="primary" @click="cancel" ghost>取消</Button>
       </div>
    </Modal>

</template>

<script>
import { userType } from './../page-info'
import { getUserInfo, eidtUserStatus } from '@/api/user-management'
const prefixCls = 'user-management-edit'
export default {
  name: 'user-management-edit',
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
      userInfo: {},
      userType
    }
  },
  computed: {
    param: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    /**
         * @description 确认修改用用户状态
         * @returns { undefined }
        */
    confirm () {
      eidtUserStatus({ id: this.id, type: this.userInfo.type }).then(() => {
        this.$Message.success('修改成功')
        this.$emit('refresh')
        this.cancel()
      })
    },
    /**
         * @description 取消弹层
         * @returns { undefined }
        */
    cancel () {
      this.$set(this, 'userInfo', {})
      this.param = false
    },
    /**
         * @description 获取用户信息
         * @returns { undefined }
        */
    getUserInfo () {
      getUserInfo({ id: this.id }).then(res => {
        this.userInfo = res.data || {}
      })
    },
    /**
         * @description 控制弹出层的显示隐藏
         * @param { Boolearn } 是否显示
         * @returns { undefined }
        */
    modelValChange (val) {
      if (val) {
        this.getUserInfo()
      }
    }
  },
  watch: {
    value: {
      handler: 'modelValChange',
      immediate: true
    }
  }
}
</script>
