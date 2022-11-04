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
          <Select v-model="province" style="width:200px" @on-change="getAreaList(0)"  :disabled="city != 0">
            <Option v-for="(item, index) of areaList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>{{ province }}
        </FormItem>
        <FormItem prop="province" label="地区选择">
          <Select v-model="city" style="width:200px" @on-change="getAreaList(province)" :disabled="province == 0 || district != 0">
            <Option v-for="(item, index) of areaList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>{{ city }}
        </FormItem>
        <FormItem prop="province" label="地区选择">
          <Select v-model="district" style="width:200px" @on-change="getAreaList(city)" :disabled="city == 0">
            <Option v-for="(item, index) of areaList" :value="item.id" :key="index">{{ item.name }}</Option>
          </Select>{{ district}}
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
      prefixCls,
      areaList: {},
      province: 0,
      city: 0,
      district: 0,
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
      type: Number
    }
  },
  methods: {
    uploadImageChange (arg) {
      this.venueInfo.image = arg.data && arg.data.url
    },
    /**
     * @description 获取地区信息列表
     * @returns { undefined }
     */
    getAreaList (pid) {
      console.log(pid)
      console.log('--------------------------')
      getAreaList({ pid: pid }).then(res => {
        this.$set(this, 'areaList', res.data.lists || {})
      })
    },
    getVenueInfo () {
      getVenueInfo({ id: this.id }).then(res => {
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
      }
      actionFn(summitInfo).then(() => {
        this.cancel()
        this.$Message.success('操作成功')
      })
    },
    cancel () {
      this.$set(this, 'venueInfo', {
        name: '',
        price: 0.00,
        area_id: '',
        address: '',
        sub_mchid: '',
        image: ''
      })
      this.$emit('input', false)
      this.$emit('on-change')
    }
  },
  watch: {
    id: {
      handler (val, oldVal) {
        if (val && val !== oldVal) {
          this.getVenueInfo()
          this.getAreaList()
        }
      },
      immediate: true
    }
  }

}
</script>
