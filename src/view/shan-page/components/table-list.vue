<template>
<div :class="prefixCls">
  <Table :columns="columns" :data="pageList" class="iviewtable">
    <template slot-scope="{ row }" slot="action">
      <a @click="toBrowse(row.id)">浏览</a> |
      <a @click="toAttention(row.id)">关注</a><br>
      <a v-if="row.status === 1" @click="toStatus(row.id,-1)">禁用</a>
      <a v-else @click="toStatus(row.id,1)" style="color: #ff0000">启用</a> |
      <a v-if="row.is_open" @click="toEdit(row.id)">推荐</a>
      <a v-else style="color: #ff0000">-</a>
    </template>
  </Table>
  <browse v-model="browseData" :id="id"/>
  <attention v-model="attentionData" :id="id"/>
</div>
</template>

<script>
import { userType, columns } from '../page-info'
import { statusShanPage } from '@/api/shan-page'

const prefixCls = 'shan-page-management-list'

export default {
  name: 'shan-page-management-list',
  components: {
    browse: () => import('./browse.vue'),
    attention: () => import('./attention.vue')
  },
  data () {
    return {
      prefixCls,
      id: null,
      isShowEdit: false,
      browseData: false,
      attentionData: false,
      userType,
      columns
    }
  },
  props: {
    pageList: {
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
    /**
     * @description 编辑当前数据
     * @param { Number } id 当前数据id
     * @returns { undefined }
     */
    toEdit (id) {
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
    toStatus (id, status) {
      this.$Modal.confirm({
        title: '警告',
        content: '确认启/停用嘛？',
        onOk: () => {
          statusShanPage({ id: id, status: status }).then(() => {
            this.$Message.success('成功')
            this.$emit('refresh')
          })
        }
      })
    }
  }
}
</script>
