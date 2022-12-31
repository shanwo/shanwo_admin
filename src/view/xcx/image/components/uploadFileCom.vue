<template>
  <div>
    <Modal
        v-model="errorUploadStatus"
        title="上传通知" @on-ok="cancel"
        @on-cancel="cancel">
       <p v-html="errorUploadMsg"></p>
    </Modal>

    <globalLoading v-if="globalLoadingStatus" />
    <uploadLoadingVue v-if="imgLoadingStatus" />
    <div>
      <Form :label-width="100">
        <FormItem label="场地：">
          <Select v-model="venue_id" class="inputWidth" clearable>
            <Option v-for="item in selectArr" :value="item.id" :key="item.id">{{
              item.name
            }}</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
    <div class="img_photo">
      <div class="img_box" v-for="(item, index) in processList" :key="index">
        <div class="jindu_s">
          <Progress
            :percent="Math.ceil(item.percent * 100)"
            v-if="item.percent != 1"
          />
          <div class="pedg_msg" v-if="item.loadingStatus">等待中...</div>
          <div v-if="item.err">
            <div class="err_msg">上传失败</div>
            <!-- <div class="reload_btn" @click="handleOneUpload(index)">点击重新上传</div> -->
          </div>
        </div>
        <div v-if="item.percent == 1">
          <img class="origin_img" :src="item.imgUrl" />
        </div>
        <div v-else class="mask_box"></div>
      </div>
    </div>
    <div :class="prefixCls + '-footer'">
      <div v-if="finishStatus === 'uploading'">图片正在上传,请耐心等待</div>
      <div v-else>
        <input
          v-if="finishStatus !== 'uploading'"
          id="fileSelector"
          accept="image/jpg, image/png,image/jpeg,image/JPG, image/PNG,image/JPEG"
          multiple="multiple"
          :disabled="venue_id ? false : 'disabled'"
          type="file"
          @change="upload"
        />
        <Button
          v-if="finishStatus !== 'uploading'"
          type="primary"
          @click="cancel"
          ghost
          >关闭</Button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg,ajaxBaseSecret } from '@/api/hy_upload'
import COS from 'cos-js-sdk-v5'
import globalLoading from '@/components/uploadLoading/globalLoading.vue'
import uploadLoading from '@/components/uploadLoading/uploadLoading.vue'

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
const prefixCls = 'image-list'

export default {
  name: 'image-list',
  components: {
    globalLoading: globalLoading,
    uploadLoadingVue: uploadLoading
  },
  props: {
    selectArr: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {
      shangbaoErrorIndexList: [], // 上报失败的索引数组
      shangbaoStatus: 0,
      shangbaoCishu: 0,
      errorUploadMsg: '',
      errorUploadStatus: false,
      globalLoadingStatus: false,
      shangbaoNum: 0,
      prefixCls,
      venue_id: '', // 场地id
      total: 0,
      startTime: '', //  获取时间戳的开始时间,默认2个小时有效 运行到1个半小时就重新获取一次
      endTime: '', // 结束时间
      mStatus: false, //  是否重新获取时间戳
      arrIndex: [], // 用来存放已经上传图片的index
      uploadTotal: 0, // 总共上传几次
      finishStatus: 'none', //  图片是否全部上传完
      imgLoadingStatus: false, // 所有图片上传成功的标志
      safeObj: {},

      fileListArr: [],
      processList: [],
      uploadErrList: [],
      shangbaoErrorList: [],
      shangbaoList: [],
      imageList: [], // 图片列表
      userInfo: '',
      cos: ''
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    errorUploadCancel () {
      this.$emit('listenCancel')
    },
    uploadOneImg () {

    },
    errorUploadOk () {
      let errorSum = 0
      this.processList.forEach((val, index) => {
        if (val.shangbaoStatus === 0) {
          errorSum += 1
          let params = {
            venue_id: this.venue_id,
            image: val.shangbaoSrc
          }
          try {
            uploadImg(params).then((res) => {
              console.log('上报单张图片', res.data)
              this.shangbaoCishu += 1
              if (res.data.code === 200) {
              } else if (res.data.code === 400) {
              } else {
                this.shangbaoErrorIndexList.push(index)
              }
              console.log('错误的图片上传索引', this.shangbaoErrorIndexList)
              if (this.shangbaoCishu === errorSum) {
                console.log('错误的图片全部上传了')
                if (this.shangbaoErrorIndexList.length === 0) {
                  this.errorUploadMsg = ''
                  this.errorUploadStatus = false
                } else {
                  this.errorUploadStatus = true
                  this.errorUploadMsg = '<span>您的</span>'
                  console.log('您的第', this.shangbaoErrorIndexList)
                  let msg = ''

                  this.shangbaoErrorIndexList.forEach((val) => {
                    msg += `<div> 第<span style="color:red">${(val * 1 + 1)}</span>张,<span style="color:red">${this.fileListArr[val].name}上传失败</span>,失败原因:<span style="color:red">${this.processList[val].errorMsg}</span></div>`
                  })
                  this.errorUploadMsg = `${this.errorUploadMsg}${msg},<div>请重新上传错误图片</div>"`
                  console.log('有部分图片上报失败了,', this.shangbaoErrorIndexList)
                }
              }
            }).catch(err => {
              console.log(err)
              this.shangbaoCishu += 1
              this.shangbaoErrorIndexList.push(val)
            })
          } catch (err) {
            console.log('单张捕获异常错误了')
            this.shangbaoCishu += 1
            this.shangbaoErrorIndexList.push(val)
          }
        }
      })
    },
    cancel () {
      this.$emit('listenCancel')
    },
    upload (e) {
      let that = this
      if (!this.venue_id) {
        this.$Message.error('请选择雪场')
        return
      }
      that.startTime = new Date() // 上传开始时间
      that.addTime() // 时间戳 计算上传时间用的
      console.log('startTime', that.startTime)
      let fileArr = []
      for (let k in e.target.files) {
        console.log(
          Object.prototype.toString.call(e.target.files[k]),
          '-------'
        )
        if (
          Object.prototype.toString.call(e.target.files[k]) === '[object File]'
        ) {
          fileArr.push(e.target.files[k])
        }
      }
      that.fileListArr = that.fileListArr.concat(fileArr)
      that.uploadTotal =
        parseInt(this.fileListArr / 5) + (this.fileListArr % 5) === 0 ? 0 : 1

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
        if (
          Object.prototype.toString.call(that.fileListArr[k]) ===
          '[object File]'
        ) {
          if (
            that.processList[k]['percent'] &&
            that.processList[k]['percent'] === 1
          ) {
            console.log('进度')
          } else {
            cos.putObject(
              {
                Bucket: that.safeObj.bucket /* 填写自己的bucket，必须字段 */,
                Region: that.safeObj.region /* 存储桶所在地域，必须字段 */,
                Key:
                  that.safeObj.path +
                  that.fileListArr[k]
                    .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
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
                  var speed =
                    parseInt((progressData.speed / 1024 / 1024) * 100) / 100
                  console.log(
                    '进度：' + percent + '%; 速度：' + speed + 'Mb/s;'
                  )
                  that.$forceUpdate()
                }
              },
              function (err, data) {
                if (err) {
                  // 网络异常 Error: CORS blocked or network error
                  console.log('上传失败', err)
                  if (
                    err === 'Error: CORS blocked or network error' ||
                    err === 'Error: timeout'
                  ) {
                    console.log('网络异常')
                  }
                  that.$Message.error('网络异常,请您检查当前网络')
                  that.$set(that.processList[k], 'err', true)
                  that.cancel()
                } else {
                  that.processList[k]['waitUrl'] = 'https://' + data.Location
                  that.processList[k]['imgUrl'] =
                    'http://' +
                    data.Location +
                    '?imageView2/1/w/200/h/200/q/50'
                  console.log('开始时间', that.startTime)
                  that.$forceUpdate()
                  that.postOneImg(k, data.Location)
                }
              }
            )
          }
        }
      }
    },
    postOneImg (index, imgUrl) {
      let params = {
        venue_id: this.venue_id,
        image: 'https://' + imgUrl
      }
      try {
        uploadImg(params).then((res) => {
          console.log('上报单张图片', res.data)
          if (res.data.code === 200) {
            this.shangbaoCishu += 1
            this.getUploadStatus(index)
          } else if (res.data.code === 400) {
            this.shangbaoCishu += 1
            this.getUploadStatus(index)
          } else {
            this.shangbaoCishu += 1
            this.shangbaoErrorIndexList.push(index)
            this.$set(this.processList[index], 'shangbaoStatus', 0)
            this.$set(this.processList[index], 'shangbaoSrc', 'https://' + imgUrl)
            this.$set(this.processList[index], 'errorMsg', res.data.msg)
            this.getUploadStatus(index)
          }
        }).catch(err => {
          console.log(err)
          console.warn('上报失败了', index)
          this.shangbaoCishu += 1
          this.shangbaoErrorIndexList.push(index)
          this.getUploadStatus(index)
        })
      } catch (err) {
        this.shangbaoCishu += 1
        console.log('多张捕获异常错误了异常错误')
        this.$set(this.processList[index], 'shangbaoStatus', 0)
        this.$set(this.processList[index], 'shangbaoSrc', 'https://' + imgUrl)
        this.getUploadStatus(index)
      }
    },
    // 获取图片的上报状态
    getUploadStatus () {
      // 如果上报的次数长度 等于 总进度的数组长度 就代表都上报了
      if (this.shangbaoCishu === this.processList.length) {
        console.log('所有图片都上报了')
        if (this.shangbaoErrorIndexList.length === 0) {
          console.log('所有图片都上报成功了,没有失败')
          this.errorUploadMsg = '所有图片已全部上传'
          this.errorUploadStatus = false
          this.cancel()
        } else {
          console.log('所有图片第一次都上报成功了,有失败')
          this.shangbaoCishu = 0
          this.shangbaoErrorIndexList = []
          this.errorUploadOk()
          console.log('processList', this.processList)
        }
      } else {

      }
    },
    handleOneUpload (index) {
      let that = this
      let fileObj = that.fileListArr[index]
      let k = index
      cos.putObject(
        {
          Bucket: that.safeObj.bucket /* 填写自己的bucket，必须字段 */,
          Region: that.safeObj.region /* 存储桶所在地域，必须字段 */,
          Key:
            that.safeObj.path +
            fileObj.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
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
            var speed = parseInt((info.speed / 1024 / 1024) * 100) / 100
            console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;')
          }
        },
        function (err, data) {
          if (err) {
            // 网络异常 Error: CORS blocked or network error
            console.log('上传失败', err)
            that.$set(that.processList[k], 'err', false)
          } else {
            that.postOneImg(k, data.Location)
            that.$forceUpdate()
          }
        }
      )
    },
    // 时间戳2小时过期,利用当前时间加上 90分钟 一个半小时
    addTime () {
      const date1 = this.$moment(this.startTime).format('YYYY-MM-DD HH:mm:ss')
      let minTime = this.$moment(date1).add(90, 'm') // 加上30分钟
      const endTime = this.$moment(minTime).format('YYYY-MM-DD HH:mm:ss')
      this.endTime = endTime
      console.log('endTime', endTime)
    },

    // 获取当前时间与下次获取签名的时间
    getTimeCha () {
      let currentTime = this.$moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      if (currentTime === this.endTime) {
        const date1 = this.$moment(this.endTime).format('YYYY-MM-DD HH:mm:ss')
        let minTime = this.$moment(date1).add(90, 'm') // 加上30分钟
        const endTime = this.$moment(minTime).format('YYYY-MM-DD HH:mm:ss')
        this.endTime = endTime
        // console.log('下次结束的时间', this.endTime)
        this.getAjaxBaseSecret()
      }
    },
    // 获取签名
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
