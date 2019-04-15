<template>
  <page>
    <header-title title="实名认证" backIcon="icon-allow"></header-title>
    <mt-field class="input-wrapper" label="收货人" placeholder="请输入收货人姓名..." v-model="username"></mt-field>
    <mt-field
      class="input-wrapper"
      label="联系方式"
      placeholder="请输入联系方式..."
      :attr="{ maxlength: 11 }"
      v-model="telephone"
    ></mt-field>
    <div @click="popupVisible=true">
      <mt-cell class="input-wrapper" title="所在地区" is-link>
        <div class="aa">
          <span>{{myAddressProvince}}</span>
          <span>{{myAddressCity}}</span>
          <span>{{myAddressCounty}}</span>
        </div>
      </mt-cell>
    </div>
    <textarea class="textarea-wrapper" v-model="address" placeholder="请输入详细地址" cols="30" rows="10"></textarea>
    <mt-cell class="input-wrapper" title="设为默认地址">
      <mt-switch v-model="defAddress"></mt-switch>
    </mt-cell>
    <mt-popup
      v-if="myAddressSlots"
      class="address-wrapper"
      v-model="popupVisible"
      position="bottom"
    >
      <div class="address-wrapper">
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
      </div>
    </mt-popup>
    <div style="flex:1"></div>
    <mt-button type="primary" @click="commit">确定</mt-button>
  </page>
</template>

<script>
import requset from '@/http'
import { CreateAddressUrl, EditAddressUrl } from '@/http/api'
import { Toast } from 'mint-ui'
import addressJSON from '@/common/address.json'

export default {
  data () {
    return {
      popupVisible: false,
      edit: false,
      username: '',
      telephone: '',
      address: '',
      defAddress: true,
      firmid: '',
      addressid: '',

      initAddress: '',
      initProvinceIndex: '',
      initCityIndex: '',
      initCountIndex: '',
      initProvince: '',
      initCity: '',
      initCount: '',

      myAddressProvince: '',
      myAddressCity: '',
      myAddressCounty: '',
      myAddressSlots: ''
    }
  },
  methods: {
    onMyAddressChange (picker, values) {
      if (this.initAddress) {
        values = this.initAddress
        this.initAddress = null
      } else if (this.initAddress === '') {
        values = []
        this.initAddress = null
      }
      if (addressJSON[values[0]]) {
        picker.setSlotValues(1, Object.keys(addressJSON[values[0]])) // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, addressJSON[values[0]][values[1]]) // 区/县数据就是一个数组
        this.myAddressProvince = values[0]
        this.myAddressCity = values[1]
        this.myAddressCounty = values[2]
      }
    },
    commit () {
      if (!this.username) {
        Toast({ message: '请输入收货人', duration: 1000 })
        return
      }
      if (!this.telephone) {
        Toast({ message: '请输入联系方式', duration: 1000 })
        return
      }
      if (!/^1\d{10}/.test(this.telephone)) {
        Toast({ message: '请输入正确联系方式', duration: 1000 })
        return
      }
      if (
        !(this.myAddressProvince && this.myAddressCity && this.myAddressCounty)
      ) {
        Toast({ message: '请选择地区', duration: 1000 })
        return
      }
      if (!this.address) {
        Toast({ message: '请输入详细地址', duration: 1000 })
        return
      }
      let url = CreateAddressUrl
      let data = {
        addressee: this.username,
        phone: this.telephone,
        address: this.address,
        location: JSON.stringify([
          this.myAddressProvince,
          this.myAddressCity,
          this.myAddressCounty
        ]),
        status: Number(this.defAddress)
      }
      if (this.edit) {
        url = EditAddressUrl
        data.firmid = this.firmid
        data.addressid = this.addressid
      }
      requset
        .post(url, data)
        .then(res => {
          this.$router.back()
          this.$emit('goback')
        })
    }
  },
  beforeRouteEnter (to, from, next) {
    function initAddressFn (vm) {
      if (vm.initAddress) {
        vm.initProvince = Object.keys(addressJSON)
        vm.initCity = Object.keys(addressJSON[vm.initAddress[0]])
        vm.initCount = addressJSON[vm.initAddress[0]][vm.initAddress[1]]
        vm.initProvinceIndex = Object.keys(addressJSON).indexOf(
          vm.initAddress[0]
        )
        vm.initCityIndex = Object.keys(addressJSON[vm.initAddress[0]]).indexOf(
          vm.initAddress[1]
        )
        // eslint-disable-next-line standard/computed-property-even-spacing
        vm.initCountIndex = addressJSON[vm.initAddress[0]][
          vm.initAddress[1]
        ].indexOf(vm.initAddress[2])
      } else {
        vm.initProvince = Object.keys(addressJSON)
        vm.initCity = Object.keys(addressJSON[vm.initProvince[0]])
        vm.initCount = addressJSON[vm.initProvince[0]][vm.initCity[0]]
        vm.initProvinceIndex = 0
        vm.initCityIndex = 0
        vm.initCountIndex = 0
      }

      vm.myAddressSlots = [
        {
          flex: 1,
          defaultIndex: vm.initProvinceIndex,
          values: vm.initProvince, // 省份数组
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          defaultIndex: vm.initCityIndex,
          values: vm.initCity,
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          defaultIndex: vm.initCountIndex,
          values: vm.initCount,
          className: 'slot5',
          textAlign: 'center'
        }
      ]
    }
    if (to.params.addressid) {
      next(vm => {
        vm.edit = true
        vm.username = to.params.addressee
        vm.telephone = to.params.phone
        vm.address = to.params.address
        vm.initAddress = JSON.parse(to.params.location)
        vm.defAddress = Boolean(to.params.status)
        vm.firmid = to.params.firmid
        vm.addressid = to.params.addressid
        initAddressFn(vm)
      })
    }
    next(vm => {
      initAddressFn(vm)
      console.log('fff')
    })
  }
}
</script>
<style lang='scss' scoped>
.aa {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 10px 0;
  color: $font-light-color;
}
.input-wrapper /deep/ {
  margin-top: 3px;
  background-color: $item-color;
  color: $font-light-color;
  font-size: $font-size;
  .mint-switch-input:checked + .mint-switch-core {
    border-color: $buttom-color;
    background-color: $buttom-color;
  }
  input {
    color: $font-light-color;
  }
}
.textarea-wrapper /deep/ {
  background-color: $item-color;
  margin-top: 3px;
  padding: 10px 10px;
  color: $font-light-color;
  outline: none;
  border: none;
}
.announcement {
  font-size: 12px;
  line-height: 14px;
  color: $font-color;
  padding: 10px;
  flex: 1;
}
.address-wrapper /deep/ {
  width: 100%;
  .mint-popup .mint-popup-bottom {
    width: 100%;
  }
}
</style>
