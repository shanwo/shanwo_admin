<template>
<div :class="prefixCls">
  <Modal :value="value" title="添加/编辑" @on-cancel="cancel">
    <div :class="prefixCls + '-box'">
      <Form :label-width="100">
        <FormItem label="名称：">
          <Input v-model="venueInfo.name" placeholder="请输入场地名称" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="照片单价(元)：">
          <Input-number :min="0.01" v-model="venueInfo.price" placeholder="照片单价" class="iptWidth"></Input-number>
        </FormItem>
        <FormItem prop="province" label="地区选择">
          <Select v-model="province" @on-change="listenProvince" :disabled="provinceStatus">
            <Option v-for="(item,index) of provinceList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
          <Select v-model="city" @on-change="listenCity"  :disabled="cityStatus">
            <Option v-for="(item,index) of cityList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
          <Select v-model="district" :disabled="areaStatus">
            <Option v-for="(item,index) of districtList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="详细地址：">
          <Input v-model="venueInfo.address" placeholder="详细地址" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="商户号：">
          <Input v-model="venueInfo.sub_mchid" placeholder="商户号" class="iptWidth"></Input>
        </FormItem>
        <FormItem label="图片：">
          <image-upload v-model="venueInfo.image" @on-change="uploadImageChange"/>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <Button type="primary" @click="confirm">确定</Button>
      <Button type="primary" @click="cancel" ghost>取消</Button>
    </div>
  </Modal>
</div>
</template>

<script>
import { getAreaList } from '@/api/admin'
import { venueEdit, venueAdd, getVenueInfo } from '@/api/venue'

const prefixCls = 'edit'
export default {
  name: 'edit',
  components: {
    imageUpload: () => import('@/components/image-upload')
  },
  data () {
    return {
      provinceStatus: false,
      areaStatus: false,
      cityStatus: false,
      prefixCls,
      provinceList: [],
      cityList: [],
      districtList: [],
      province: 0,
      city: 0,
      district: 0,
      province_name: '请选择',
      city_name: '请选择',
      district_name: '请选择',
      venueInfo: {
        name: '',
        price: 0.00,
        area_id: '',
        address: '',
        sub_mchid: '',
        image: ''
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number | String]
    }
  },
  methods: {
    // 监听选中省
    listenProvince (id) {
      console.log(id)
      // this.$set(this, 'cityList', [])
      // this.$set(this, 'districtList', [])
      this.city = ''
      this.district = ''
      this.getAreaList(id, 2)
    },
    listenCity (id) {
      if (id) {
        this.districtList = []
        this.district = ''
        this.getAreaList(id, 3)
      }
    },
    uploadImageChange (arg) {
      this.venueInfo.image = 'https://sw-img-1255862984.cos.ap-beijing.myqcloud.com/picture/7/2022-11/01-thumbnail/DSC03943.JPG' || (arg.data && arg.data.url)
    },
    /**
     * @description 获取地区信息列表
     * @returns { undefined }
     */
    getAreaList (pid, type) {
      console.log('执行了2次', pid, type)
      // if (pid === undefined || pid === 'undefined' || pid === null) {
      //   return
      // }
      getAreaList({ pid: pid }).then(res => {
        console.log('省市区', res)
        if (type === 1) {
          this.$set(this, 'provinceList', res.data.lists || {})
        }
        if (type === 2) {
          this.$set(this, 'cityList', res.data.lists || {})
        }
        if (type === 3) {
          this.$set(this, 'districtList', res.data.lists || {})
        }
      })
    },
    getVenueInfo () {
      getVenueInfo({ id: this.id }).then(res => {
        var merger_name = res.data.merger_name.split('-')
        this.province = 0
        this.city = 0
        this.district = 0
        this.province_name = merger_name[0]
        this.city_name = merger_name[1]
        this.district_name = merger_name[2]
        this.$set(this, 'venueInfo', res.data || {})
      })
    },
    confirm () {
      let actionFn = venueAdd
      let summitInfo = {}
      for (let key in this.venueInfo) {
        if (this.venueInfo[key]) {
          summitInfo[key] = this.venueInfo[key]
        }
      }
      if (this.id) {
        summitInfo.id = this.id
        summitInfo.area_id = this.district
        actionFn = venueEdit
      } else {
        summitInfo.area_id = this.district
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      console.log('点击取消')
      this.$set(this, 'venueInfo', {
        name: '',
        price: 0.00,
        area_id: '',
        address: '',
        sub_mchid: '',
        image: ''
      })
      this.$set(this, 'province', 0)
      this.$set(this, 'city', 0)
      this.$set(this, 'district', 0)
      this.$set(this, 'province_name', '请选择')
      this.$set(this, 'city_name', '请选择')
      this.$set(this, 'district_name', '请选择')
      this.$emit('input', false)
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          console.log('handlerhandler')
          this.getVenueInfo()
          this.getAreaList(0, 1)
        } else {
          console.log('新增')
          this.getAreaList(0, 1)
        }
      },
      immediate: true
    }
  }

}
</script>
