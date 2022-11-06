<template>
  <div>
    <div>滑呀滑呀</div>
    <div class="img_photo">
        <div class="img_box" v-for="(item,index) in processList" :key="index">
            <div class="jindu_s">
              <Progress :percent="Math.ceil(item.percent*100)"/>
              <div class="pedg_msg" v-if="item.loadingStatus">等待中...</div>
              <div v-if="item.err">
              <div class="err_msg">上传失败</div>
              <div class="reload_btn" @click="handleOneUpload(index)">点击重新上传</div>
            </div>
            </div>
            <img :src="imgList[index].url" v-if="item.percent == 1 && imgList[index].url">
            <div class="mask_box" v-else></div>
        </div>
      </div>
    <div>
      <input id="fileSelector" multiple="multiple" type="file" @change="upload" />
    </div>
  </div>
</template>

<script>
import { ajaxBaseSecret } from '@/api/hxapi.js'
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

export default {
  name: 'feedback-list',
  components: {},
  data () {
    return {
      safeObj: {},
      imgList: [],
      fileListArr: [],
      processList: [],
      cos: ''
    }
  },
  created () {
    this.initNextWork()
    this.getAjaxBaseSecret()
  },
  methods: {
    initNextWork () {
      console.log('监听网络')
      const netWorkDownlink = navigator.connection.downlink // 预估下载速度m/s
      if (navigator.connection && navigator.connection.onchange === null) {
        navigator.connection.onchange = () => {
          if (netWorkDownlink !== navigator.connection.downlink || navigator.connection.rtt === 0) {
            // 网络断开
            this.$Message.error('您的网络已断开,请您检查网络')
          } else if (netWorkDownlink === navigator.connection.downlink || navigator.connection.rtt !== 0) {
            // 连接到网络
            console.log('网络在线')
          }
        }
      }
    },
    upload (e) {
      let that = this
      console.log('e.target', e.target.files)
      const file = e.target.files
      that.fileListArr = file
      console.log(Object.prototype.toString.call(file[0]), '-------')

      // console.log('cos示例', this.cos)
      /* 直接调用cos sdk的方法 */

      let newProcess = []
      for (let i = 0; i < file.length; i++) {
        newProcess.push({
          percent: 0,
          loadingStatus: true
        })
      }
      this.processList = newProcess
      for (let k in file) {
        console.log(Object.prototype.toString.call(file[k]), k)
        if (Object.prototype.toString.call(file[k]) === '[object File]') {
          cos.putObject(
            {
              Bucket: that.safeObj.bucket /* 填写自己的bucket，必须字段 */,
              Region: that.safeObj.region /* 存储桶所在地域，必须字段 */,
              Key: that.safeObj.path + file[k].name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
              Body: file[k], // 上传文件对象
              SliceSize:
            1024 *
            1024 *
            10 /* 触发分块上传的阈值，超过5MB使用分块上传，小20MB使用简单上传。可自行设置，非必须 */,
              onProgress: function (progressData) {
                console.log(`第${k}张的上传进度`, JSON.stringify(progressData))
                that.processList[k] = progressData
                that.processList[k]['loadingStatus'] = false
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
                console.log('上传成功', data)
                console.log('预览的url', data.Location)
                that.$set(that.imgList, k, { 'url': 'http://' + data.Location })
                that.$forceUpdate()
              }
            }
          )
        }
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
              console.log('预览的url', data.Location)
              that.$set(that.imgList, k, { 'url': data.Location })
              that.$forceUpdate()
            })

            console.log('上传成功', data)
            that.$forceUpdate()
          }
        }
      )
    },
    getAjaxBaseSecret () {
      ajaxBaseSecret().then((res) => {
        console.log('res', res.data)
        this.safeObj = res.data
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
  width: 200px;
  height: 200px;
  margin: 10px 10px 0 0;
  position: relative;
}
.img_list{
  position: relative;
  width: 200px;
  height: 200px;
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
</style>
