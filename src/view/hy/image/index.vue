<template>
  <div>
    <div>
      <div style="display:flex" :class="prefixCls + '-search'">
        <search-vue v-model="searchData">
          <template slot="btn">
            <Button @click="getList()" type="primary">查询</Button>
            <Button style="margin-left:30px" type="error" @click="handleShowModel">上传图片</Button>
          </template>
        </search-vue>

  </div>
    </div>
    <div :class="prefixCls + '-table'">
    <table-list-vue @refresh="getList" :venueList="venueList" ></table-list-vue>
  </div>
  <div :class="prefixCls + '-page'">
    <Page :total=total show-total :page-size=searchData.size @on-change="pageChange"></Page>
  </div>

    <uploadLoadingVue v-if="imgLoadingStatus"/>
    <Modal
        width="80%"
        :closable="false"
        :mask-closable="false"
        :footer-hide="true"
        v-model="dialogStatus"
        title="图片上传">

    <div class="img_photo">
        <div class="img_box" v-for="(item,index) in processList" :key="index">
            <div class="jindu_s">
              <Progress :percent="Math.ceil(item.percent*100)" v-if="item.percent!= 1 "/>
              <div class="pedg_msg" v-if="item.loadingStatus">等待中...</div>
              <div v-if="item.err">
              <div class="err_msg">上传失败</div>
              <div class="reload_btn" @click="handleOneUpload(index)">点击重新上传</div>
            </div>
            </div>
            <div v-if="item.percent == 1">
              <img class="origin_img" :src="item.imgUrl" >
            </div>
            <div class="mask_box" v-else></div>
        </div>
      </div>
      <div>
      <input v-if="finishStatus === 'none'" id="fileSelector" multiple="multiple" type="file" @change="upload" />
      <div  v-if="finishStatus === 'uploading'" class="label_box_text">图片正在上传,请耐心等待</div>
    </div>
  </Modal>
  </div>
</template>

<script>
import { ajaxBaseSecret } from '@/api/hxapi.js'
import { ajaxUploadImg, ajaxUploadLists } from '@/api/venue.js'
import uploadLoadingVue from '../../../components/uploadLoading/uploadLoading.vue'
import tableListVue from './components/table-list.vue'
import searchVue from './components/search.vue'
import COS from 'cos-js-sdk-v5'

var cos = new COS({
  // getAuthorization 必选参数
  getAuthorization: function (options, callback) {
    ajaxBaseSecret().then((res) => {
      let data = res.data
      let credentials = res.data.credentials
      console.log('res', res, credentials)
      // eslint-disable-next-line standard/no-callback-literal
      callback({
        TmpSecretId: credentials.tmpSecretId,
        TmpSecretKey: credentials.tmpSecretKey,
        SecurityToken: credentials.sessionToken,
        // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
        StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
        ExpiredTime: data.expiredTime // 时间戳，单位秒，如：1580000000
      })
    })
  }
})
const prefixCls = 'venue-list'

export default {
  name: 'feedback-list',
  components: {
    uploadLoadingVue,
    tableListVue,
    searchVue
  },
  data () {
    return {
      prefixCls,
      searchData: {
        keyword: '',
        venue_id: '',
        size: 10,
        page: 1
      },
      total: 0,
      venueList: [], // 图片列表
      startTime: '', //  获取时间戳的开始时间,默认2个小时有效 运行到1个半小时就重新获取一次
      endTime: '', // 结束时间
      mStatus: false, //  是否重新获取时间戳
      arrIndex: [], // 用来存放已经上传图片的index
      uploadTotal: 0, // 总共上传几次
      finishStatus: 'none', //  图片是否全部上传完
      imgLoadingStatus: false, // 所有图片上传成功的标志
      maxLoadingStatus: false,
      dialogStatus: false,
      safeObj: {},
      imgList: [],
      fileListArr: [],
      processList: [],
      userInfo: '',
      uploadErrList: [],
      shangbaoList: [],
      cos: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('user'))
    this.getList()
    this.initNextWork()
  },
  methods: {
    getList () {
      let params = {
        keyword: this.searchData.keyword,
        venue_id: this.searchData.venue_id,
        user_id: this.userInfo.id,
        page: this.searchData.page,
        size: this.searchData.size

      }
      ajaxUploadLists(params).then(res => {
        console.log('图片列表', res)
        this.venueList = res.data.lists || [] // 图片列表
        this.total = res.data.total
      })
    },
    pageChange (page) {
      this.searchData.page = page
      this.getList()
    },
    initNextWork () {
      console.log('监听网络')
      let arr = []
      const netWorkDownlink = navigator.connection.downlink // 预估下载速度m/s
      if (navigator.connection && navigator.connection.onchange === null) {
        navigator.connection.onchange = () => {
          if (netWorkDownlink !== navigator.connection.downlink || navigator.connection.rtt === 0) {
            // 网络断开
            arr.push(1)
            console.log('断网了', arr)
            if (arr.length === 10) {
              this.$Message.error('您已断开,请检查网络')
            }
          } else if (netWorkDownlink === navigator.connection.downlink || navigator.connection.rtt !== 0) {
            // 连接到网络
            arr = []
            console.log('网络在线')
          }
        }
      }
    },
    upload (e) {
      let that = this
      that.startTime = new Date()
      that.addTime()
      console.log('startTime', that.startTime)
      let fileArr = []
      for (let k in e.target.files) {
        console.log(Object.prototype.toString.call(e.target.files[k]), '-------')
        if (Object.prototype.toString.call(e.target.files[k]) === '[object File]') {
          fileArr.push(e.target.files[k])
        }
      }
      that.fileListArr = that.fileListArr.concat(fileArr)
      that.uploadTotal = parseInt(this.fileListArr / 5) + this.fileListArr % 5 === 0 ? 0 : 1

      let newProcess = []
      for (let i = 0; i < fileArr.length; i++) {
        newProcess.push({
          percent: 0,
          loadingStatus: true
        })
      }
      this.processList = this.processList.concat(newProcess)
      console.log('this.processList', this.processList)
      console.log('this.fileListArr', this.fileListArr)
      for (let k = 0; k < that.fileListArr.length; k++) {
        if (Object.prototype.toString.call(that.fileListArr[k]) === '[object File]') {
          if (that.processList[k]['percent'] && that.processList[k]['percent'] === 1) {
            console.log('进度')
          } else {
            cos.putObject(
              {
                Bucket: that.safeObj.bucket /* 填写自己的bucket，必须字段 */,
                Region: that.safeObj.region /* 存储桶所在地域，必须字段 */,
                Key: that.safeObj.path + that.fileListArr[k].name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
                Body: that.fileListArr[k], // 上传文件对象
                SliceSize:
            1024 *
            1024 *
            10 /* 触发分块上传的阈值，超过5MB使用分块上传，小20MB使用简单上传。可自行设置，非必须 */,
                onProgress: function (progressData) {
                  console.log('速度速度', progressData)
                  that.getTimeCha()
                  that.finishStatus = 'uploading'
                  progressData['waitUrl'] = ''
                  progressData['imgUrl'] = ''
                  that.processList[k] = progressData
                  that.processList[k]['loadingStatus'] = false
                  var percent = parseInt(progressData.percent * 10000) / 100
                  var speed = parseInt(progressData.speed / 1024 / 1024 * 100) / 100
                  console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;')
                  that.maxLoadingStatus = true
                  that.$forceUpdate()
                }
              },
              function (err, data) {
                if (err) {
                // 网络异常 Error: CORS blocked or network error
                  console.log('上传失败', err)
                  if (err === 'Error: CORS blocked or network error') {
                    console.log('网络异常')
                    this.$set(that.processList[k], 'err', true)
                  }
                  that.maxLoadingStatus = false
                  that.$set(that.processList[k], 'err', true)
                  this.uploadErrList.push({
                    [k]: this.fileListArr[k]
                  })
                } else {
                  that.processList[k]['waitUrl'] = data.Location
                  that.processList[k]['imgUrl'] = 'http://' + data.Location + '?imageView2/1/w/200/h/200/q/50'
                  that.imgList.push({
                    index: k,
                    url: data.Location
                  })
                  console.log('开始时间', that.startTime)
                  // that.getTimeCha(that.startTime, new Date())
                  that.$forceUpdate()
                  that.getImgListStatus()
                  that.getUploadStatus()
                  console.log('that.imgList', that.imgList)
                }
              }
            )
          }
        }
      }
    },
    getImgListStatus () {
      let that = this
      if (this.imgList.length === 5) {
        this.uploadTotal = this.uploadTotal - 1
        let newImgList = JSON.parse(JSON.stringify(this.imgList))
        for (let i = 0; i < newImgList.length; i++) {
          that.arrIndex.push(newImgList[i].index)
        }
        this.imgList = []
        console.log(' this.imgList', newImgList)
        let imgs = []
        for (let i = 0; i < newImgList.length; i++) {
          imgs.push(newImgList[i].url)
        }
        that.postImg(imgs)
      }
    },
    // 获取是否全部上窜完成
    getUploadStatus () {
      let num = 0
      let arr = []
      this.processList.forEach((val, index) => {
        if (val.err) {
          console.log('第' + index + '张图片上传失败')
        } else {
          if (val.percent === 1) {
            num += 1
          }
        }
      })
      if (num === this.processList.length) {
        console.log('所有图片上传完成')
        for (let i = 0; i < this.fileListArr.length; i++) {
          if (this.arrIndex.includes(i)) {

          } else {
            arr.push(i)
          }
        }
        console.log('最后没上传的', arr)
        let imgs = []
        arr.forEach(val => {
          imgs.push(this.processList[val].waitUrl)
        })
        this.postImg(imgs)
        this.finishStatus = 'finish'
      }
    },
    // 上报图片
    postImg (imgs) {
      let params = {
        venue_id: 1,
        images: imgs
      }
      console.log('入参', params)
      if (imgs.length === 0) {
        return
      }
      ajaxUploadImg(params).then(res => {
        console.log('图片上报', res)
        this.shangbaoList = this.shangbaoList.concat(res.data.images)
        if (this.shangbaoList.length === this.fileListArr.length) {
          this.$Message.success('图片上传成功')
          this.dialogStatus = false
        }
      })
    },
    handleOneUpload (index) {
      let that = this
      let fileObj = that.fileListArr[index]
      let k = index
      cos.putObject(
        {
          Bucket: that.safeObj.bucket /* 填写自己的bucket，必须字段 */,
          Region: that.safeObj.region /* 存储桶所在地域，必须字段 */,
          Key: that.safeObj.path + fileObj.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          Body: fileObj, // 上传文件对象
          SliceSize:
            1024 *
            1024 *
            10 /* 触发分块上传的阈值，超过5MB使用分块上传，小20MB使用简单上传。可自行设置，非必须 */,
          onProgress: function (progressData) {
            console.log(`第${k}张的上传进度`, JSON.stringify(progressData))
            that.processList[k] = progressData
            that.$forceUpdate()

            var percent = parseInt(info.percent * 10000) / 100
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100
            console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;')
          }
        },
        function (err, data) {
          if (err) {
            // 网络异常 Error: CORS blocked or network error
            console.log('上传失败', err)
            // if (err === 'Error: CORS blocked or network error') {
            //   console.log('网络异常')
            //   this.$set(that.processList[k], 'err', true)
            // }
            that.$set(that.processList[k], 'err', true)
          } else {
            cos.getObjectUrl({
              Bucket: that.safeObj.bucket /* 填写自己的bucket，必须字段 */,
              Region: that.safeObj.region /* 存储桶所在地域，必须字段 */,
              Key: that.safeObj.path,
              Sign: true /* 获取带签名的对象URL */
            }, function (err, data) {
              console.log('上传成功3', data)
              if (err) return console.log(err)
              /* url为对象访问url */
              that.imgList.push({ 'url': data.Location })
              that.$forceUpdate()
            })
            console.log('上传成功', data)
            that.$forceUpdate()
          }
        }
      )
    },
    async handleShowModel () {
      await this.getAjaxBaseSecret()
      this.dialogStatus = true
    },
    // 时间戳2小时过期,利用当前时间加上 90分钟 一个半小时
    addTime () {
      const date1 = this.$moment(this.startTime).format('YYYY-MM-DD HH:mm:ss')
      let minTime = this.$moment(date1).add(2, 'm')// 加上30分钟
      const endTime = this.$moment(minTime).format('YYYY-MM-DD HH:mm:ss')
      this.endTime = endTime
      console.log('endTime', endTime)
    },

    getTimeCha () {
      let currentTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      if (currentTime === this.endTime) {
        const date1 = this.$moment(this.endTime).format('YYYY-MM-DD HH:mm:ss')
        let minTime = this.$moment(date1).add(2, 'm')// 加上30分钟
        const endTime = this.$moment(minTime).format('YYYY-MM-DD HH:mm:ss')
        this.endTime = endTime
        // console.log('下次结束的时间', this.endTime)
        this.getAjaxBaseSecret()
      }
    },

    getAjaxBaseSecret () {
      console.log('重新获取时间重新获取时间', this.endTime)
      return new Promise((resolve, reject) => {
        ajaxBaseSecret().then((res) => {
          console.log('res', res.data)
          this.safeObj = res.data
          resolve()
        })
      })
    }
  }

}
</script>

<style lang="less" scoped>
.mr10 {
  margin-right: 10px;
}

@prefix: ~"feedback-list";

.@{prefix} {
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;

  &-page {
    padding: 8px;
    text-align: right;
  }
}
.img_photo{
  overflow: hidden;
}
.img_box{
  float: left;
  width: 150px;
  height: 150px;
  margin: 10px 10px 0 0;
  position: relative;
}
.img_list{
  position: relative;
  width: 150px;
  height: 150px;
  margin: 10px 10px 0 0;
}
.jindu_box{
  width: 100%;
  position: absolute;
  top:20px;
  left: 0;
  z-index: 3;
}
.mask_box{
  width: 100%;
  height: 100%;
  background: #ddd;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.jindu_s{
  width: 100%;
  position: absolute;
  left: 0;
  top: 40px;
  z-index: 2;
}
.err_msg{
  text-align: center;
  font-size: 12px;
  color: #fa4535;
}
.reload_btn{
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: blue;
}
.pedg_msg{
  width: 100%;
  font-size: 12px;
  text-align: center;
  color: #ff9a01;
}
.origin_img{
  width: 150px;
  height: 150px;
  left: 0;
  top: 0;
  object-fit: contain;
  background:#ddd;
}
.label_box_text{
  color: #409eff;
  font-size: 14px;
  margin: 20px auto;
  text-align: center;
}
</style>
