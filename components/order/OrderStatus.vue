<template>
  <div>
    <v-sheet class="order-status-sheet" rounded outlined>
      <div class="content">
          <v-row class="row" no-gutters @click="getOrderProducts">
            <v-col>
              {{ getPersianDigit(this.order.createdDate) }}
            </v-col>
            <v-col class="sheet-title">
              سفارش باز
            </v-col>
          </v-row>
          <v-row class="row" @click="getOrderProducts" no-gutters>
            <v-col class="sheet-amount">
              {{ getPersianPrice(this.order.amount) }}
            </v-col>
            <v-col class="sheet-title">
              {{ this.order.reference }}
            </v-col>
          </v-row>
          <v-row @click="getOrderProducts">
            <v-col>
              <v-img contain class="img-status" :src="require('~/assets/icon/order-delivered.svg')"
                     :class="getStateData('DELIVERED') !== '' ? '' :'img-disable'" />
              <div class="state-title">تحویل</div>
              <div class="state-time">{{ getStateData('DELIVERED') }}</div>
            </v-col>
            <v-col>
              <v-img contain class="img-status" :src="require('~/assets/icon/order-delivery.svg')"
                     :class="getStateData('SHIPPING') !== '' ? '' :'img-disable'" />
              <div class="state-title">ارسال</div>
              <div class="state-time">{{ getStateData('SHIPPING') }}</div>
            </v-col>
            <v-col>
              <v-img contain class="img-status" :src="require('~/assets/icon/order-packing.svg')"
                     :class="getStateData('PACKED') !== '' ? '' :'img-disable'" />
              <div class="state-title">بسته بندی</div>
              <div class="state-time">{{ getStateData('PACKED') }}</div>
            </v-col>
            <v-col>
              <v-img contain class="img-status" :src="require('~/assets/icon/order-approve.svg')"
                     :class="getStateData('APPROVED') !== '' ? '' :'img-disable'" />
              <div class="state-title">تایید</div>
              <div class="state-time">{{ getStateData('APPROVED') }}</div>
            </v-col>
          </v-row>
        <div style="direction: rtl">
          <v-chip pill class="ma-2" :color="getPaymentStatusColor(this.order.paymentStatus)" text-color="white">
            {{translatePaymentStatus(this.order.paymentStatus)}}
          </v-chip>
        </div>
          <v-row no-gutters class="order-info">
            <v-col cols="7">
              <div class="delivery-type">
                <v-row>
                  <v-icon>{{mdiTruckOutline}}</v-icon>
                  <div style="margin-right: 1vw">نحوه ارسال :</div>
                  <div style="margin-right: 1vw">{{ getDeliveryType(this.order.deliveryType) }}</div>
                </v-row>
              </div>
              <div class="address">
                <v-row>
                  <v-icon>{{mdiMapMarker}}</v-icon>
                  <div style="margin-right: 1vw">آدرس :</div>
                  <div style="margin-right: 1vw">{{ this.order.customerAddress.title }}</div>
                </v-row>
                <div style="margin-right: 2vw">{{ this.order.customerAddress.details }}</div>
              </div>
            </v-col>
            <v-col cols="5">
              <v-img contain class="courier-avatar" :src="deliveryAvatar" />
              <div class="courier-name">{{this.deliveryName}}</div>
              <div class="courier-call">
                <v-btn outlined color="accent" @click="dial(deliveryMobile)">تماس با سفیر</v-btn>
              </div>
            </v-col>
          </v-row>
      </div>
      <div class="item-indicator"></div>
    </v-sheet>
    <v-bottom-sheet fullscreen class="bottom-sheet" scrollable v-model="sheet">
      <OrderDetails @close="closeSheet" class="order-details" :order-details="orderDetails" />
    </v-bottom-sheet>
  </div>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'
import OrderDetails from '@/components/order/OrderDetails'
import { FILES_URL } from '@/constants'
import { mdiTruckOutline,  mdiMapMarker} from '@mdi/js'

export default {
  name: 'OrderStatus',
  components: { OrderDetails },
  props: { order: Object },
  computed:{
    deliveryName:function(){
      if (this.onShipping()){
        return this.order.deliveryName
      }else return 'مشخص نشده'
    },
    deliveryAvatar:function(){
      if (this.onShipping()){
        return FILES_URL + this.order.deliveryAvatar
      }else return '/avatar.svg'
    },
    deliveryMobile:function(){
      if (this.onShipping()){
        return this.order.deliveryMobile
      }else return ''
    }
  },
  data() {
    return {
      mdiTruckOutline: mdiTruckOutline,
      mdiMapMarker: mdiMapMarker,
      sheet: false,
      orderDetails: {}
    }
  },
  methods: {
    dial(number){
      window.location ='tel:'+number;
    },
    onShipping(){
      console.log(this.order.orderStates)
      console.log('this.order.orderStates')
      return this.order.orderStates.find(state => state.type === 'SHIPPING') !== undefined
    },
    translatePaymentStatus(paymentStatus){
      if (paymentStatus === 'PAID')
        return 'پرداخت شده'
      else if (paymentStatus === 'ENOUGH_CREDIT')
        return 'اعتبار کافی'
      else
      return 'در انتظار تکمیل وجه'
    },
    getPaymentStatusColor(paymentStatus){
      if (paymentStatus === 'PAID')
        return 'accent'
      else if (paymentStatus === 'ENOUGH_CREDIT')
        return 'accent'
      else
        return 'warning'
    },
    getPersianDigit(val) {
      return PersianUtil.covertEngDigitToPersianDigit(val)
    },
    getPersianPrice(val) {
      return PersianUtil.makePersianPrice(val)
    },
    getDeliveryType(val) {
      if (val === 'EXPRESS')
        return 'اکسپرس'
      else
        return 'معمولی'
    },
    getStateData: function(val) {
      const index = this.order.orderStates.findIndex(state => state.type === val)
      if (index !== -1) {
        return this.order.orderStates[index].time
      } else {
        return ''
      }
    },
    closeSheet() {
      this.sheet = false
    },
    async getOrderProducts() {
      this.$repositories.order.getCurrentOrderDetail(this.order.reference)
        .then(res => {
          if (res.data !== false) {
            this.orderDetails = res.data
            this.sheet = true
          }
        })
    }
  }
}
</script>

<style scoped>
.order-status-sheet {
  margin: 2vw;
  font-size: 0.9em;
  display: flex;
  flex-flow: row;

}
.content{
  display: inline;
  width: 94vw;
}
.sheet-status {
  background-color: #0BCE83;
  width: 8px;
  border-bottom-right-radius: 2px;
  border-top-right-radius: 2px;
}

.img-status {
  height: 13vw;
}

.row {
  margin: 2vw;
}

.sheet-title {
  text-align: right;
}

.sheet-amount {
  direction: rtl;
  text-align: left;
}

.state-time {
  text-align: center;
  font-size: 0.85em;
}

.state-title {
  text-align: center;
  font-size: 0.85em;
}

.order-info {
  direction: rtl;
}

.courier-avatar {
  height: 12vh;
}

.courier-name {
  text-align: center;
}

.courier-call {
  text-align: center;
}

.delivery-type {
  color: #8E8E8E;
  margin-top: 3vw;
}

.img-disable {
  filter: grayscale(0.9) opacity(0.3);
}

.order-details {
  padding-top: 1vh;
  overflow: auto;
}

.address {
  color: #8E8E8E;
  margin-top: 3vw;
}

.bottom-sheet {
  height: 100%;
}

.item-indicator {
  background-color: #0BCE83;
  width: 1.25vw;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
</style>
