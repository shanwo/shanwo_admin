<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="userList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toBrowse(row.id)">浏览</a> |
      <a @click="toAttention(row.id)">关注</a><br>
      <a @click="toDetail(row.id)">详情</a> |
      <a v-if="row.type !==3" @click="toStatus(row.id)">拉黑</a>
      <a v-else style="color: #ff0000">已拉黑</a>
    </template>
  </Table>
  <browse v-model="browseData" :id="id"/>
  <attention v-model="attentionData" :id="id"/>
</div>
</template>
<script>
import { editUserStatus } from '@/api/users'
import { columns } from '../page-info'

const prefixCls = 'users-list'
export default {
  name: 'users-list',
  components: {
    browse: () => import('./browse.vue'),
    attention: () => import('./attention.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      browseData: false,
      attentionData: false,
      columns
    }
  },
  props: {
    userList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    /**
     * @description 刷新列表页数据
     * @returns { undefined }
     */
    refresh () {
      this.$emit('refresh')
    },
    toDetail (id) {
      this.$emit('toDetail', id)
    },
    toBrowse (id) {
      this.id = id
      this.browseData = true
    },
    toAttention (id) {
      this.id = id
      this.attentionData = true
    },
    toStatus (id) {
      this.$Modal.confirm({
        title: '警告',
        content: '拉黑操作不可恢复，用户相关数据全部清除！！！',
        onOk: () => {
          editUserStatus({ id, type: 3 }).then(() => {
            this.$Message.success('拉黑成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
