<template>
<div :class="prefixCls">
  <div :class="prefixCls + '-search'">
    <search v-model="searchData">
      <template slot="btn">
        <Button @click="handleShowModel" type="error" class="mr10">上传图片</Button>
        <Button @click="getList()" type="primary" class="mr10">查询</Button>
        <Button @click="clean()" type="primary">清图片</Button>
      </template>
    </search>
  </div>
  <div :class="prefixCls + '-table'">
    <table-list @refresh="getList" :imageList="imageList"></table-list>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>
  <Modal v-model="dialogStatus" :closable="false" :mask-closable="false" :footer-hide="true" width="60%" title="图片上传">
    <div v-if="dialogStatus">
      <uploadFileCom @listenCancel="cancel" :selectArr="selectArr" ref="uploadFileComRef"/>
    </div>
  </Modal>
</div>
</template>

<script>
import { getVenueList } from '@/api/venue.js'
import { uploadLists, uploadClean } from '@/api/hy_upload.js'

const prefixCls = 'image-list'

export default {
  name: 'image-list',
  components: {
    uploadFileCom: () => import('./components/uploadFileCom.vue'),
    search: () => import('./components/search.vue'),
    tableList: () => import('./components/table-list.vue')
  },
  data () {
    return {
      selectArr: [],
      imageList: [],
      prefixCls,
      searchData: {
        keyword: '',
        venue_id: '',
        size: 10,
        page: 1
      },
      total: 0,
      dialogStatus: false,
      safeObj: {},
      userInfo: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('user'))
    this.getVenList()
    this.getList()
  },
  methods: {
    cancel () {
      this.dialogStatus = false
      this.getList()
    },
    // 获取雪场
    getVenList () {
      getVenueList({ status: 1 }).then(res => {
        this.selectArr = res.data.lists
      })
    },
    getList () {
      let params = {
        keyword: this.searchData.keyword,
        venue_id: this.searchData.venue_id,
        user_id: this.userInfo.id,
        page: this.searchData.page,
        size: this.searchData.size

      }
      uploadLists(params).then(res => {
        this.imageList = res.data.lists || [] // 图片列表
        this.total = res.data.total
      })
    },
    clean () {
      if (!this.searchData.venue_id) {
        this.$Modal.confirm({
          title: '警告',
          content: '请选择要清理的雪场',
          onOk: () => {
          }
        })
      } else {
        this.$Modal.confirm({
          title: '警告',
          content: '将清理拍摄时间早于3个月前的图片，清理后不再显示。若3个月内无照片，将只保留最后一周的照片。',
          onOk: () => {
            uploadClean({ venue_id: this.searchData.venue_id }).then(res => {
              this.$Message.success(res.msg ? res.msg : '本次清理' + Object.keys(res.data).length + '张照片')
              this.$emit('refresh')
              this.getList()
            })
          }
        })
      }
    },
    pageChange (page) {
      this.searchData.page = page
      this.getList()
    },

    handleShowModel () {
      this.dialogStatus = true
      setTimeout(async() => {
        await this.$refs['uploadFileComRef'].getAjaxBaseSecret()
      }, 1000)
    }
  }

}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"image-list";

.@{prefix} {
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;

  &-page {
    padding: 8px;
    text-align: right;
  }

  &-footer {
    padding: 20px 0;
    text-align: center;
  }
}

.img_photo {
  overflow: hidden;
}

.img_box {
  float: left;
  width: 150px;
  height: 150px;
  margin: 10px 10px 0 0;
  position: relative;
}

.img_list {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 10px 10px 0 0;
}

.jindu_box {
  width: 100%;
  position: absolute;
  top: 20px;
  left: 0;
  z-index: 3;
}

.mask_box {
  width: 100%;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.jindu_s {
  width: 100%;
  position: absolute;
  left: 0;
  top: 40px;
  z-index: 2;
}

.err_msg {
  text-align: center;
  font-size: 12px;
  color: #fa4535;
}

.reload_btn {
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: blue;
}

.pedg_msg {
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: #ff9a01;
}

.origin_img {
  width: 150px;
  height: 150px;
  left: 0;
  top: 0;
  object-fit: contain;
  background: #ddd;
}
</style>
