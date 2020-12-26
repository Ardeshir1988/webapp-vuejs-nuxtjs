<template>
  <v-sheet class="order-status-sheet" rounded outlined>
    <div class="sheet-status"></div>
    <v-row class="row" no-gutters>
      <v-col>
        {{ getPersianDigit(this.order.createdDate) }}
      </v-col>
      <v-col class="sheet-title">
        سفارش باز
      </v-col>
    </v-row>
    <v-row class="row" no-gutters>
      <v-col class="sheet-amount">
        {{ getPersianPrice(this.order.amount) }}
      </v-col>
      <v-col class="sheet-title">
        {{ this.order.reference }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img contain class="img-status" src="/order-delivered.svg" :class="getStateData('DELIVERED') !== '' ? '' :'img-disable'" />
        <div class="state-title">تحویل</div>
        <div class="state-time">{{ getStateData('DELIVERED') }}</div>
      </v-col>
      <v-col>
        <v-img contain class="img-status" src="/order-delivery.svg" :class="getStateData('SHIPPING') !== '' ? '' :'img-disable'" />
        <div class="state-title">ارسال</div>
        <div class="state-time">{{ getStateData('SHIPPING') }}</div>
      </v-col>
      <v-col>
        <v-img contain class="img-status" src="/order-packing.svg" :class="getStateData('PACKED') !== '' ? '' :'img-disable'" />
        <div class="state-title">بسته بندی</div>
        <div class="state-time">{{ getStateData('PACKED') }}</div>
      </v-col>
      <v-col>
        <v-img contain class="img-status" src="/order-approve.svg" :class="getStateData('APPROVED') !== '' ? '' :'img-disable'" />
        <div class="state-title">تایید</div>
        <div class="state-time">{{ getStateData('APPROVED') }}</div>
      </v-col>
    </v-row>

    <v-row no-gutters class="order-info">
      <v-col cols="7">
        <div class="delivery-type">
          <v-row>
            <v-icon>mdi-truck-outline</v-icon>
            <div style="margin-right: 1vw">نحوه ارسال :</div>
            <div style="margin-right: 1vw">{{ getDeliveryType(this.order.deliveryType) }}</div>
          </v-row>
        </div>
        <div class="address">
          <v-row>
            <v-icon>mdi-map-marker</v-icon>
            <div style="margin-right: 1vw">آدرس :</div>
            <div style="margin-right: 1vw">{{ this.order.customerAddress.title }}</div>
          </v-row>
          <div style="margin-right: 2vw">{{ this.order.customerAddress.details }}</div>
        </div>
      </v-col>
      <v-col cols="5">
        <v-img contain class="courier-avatar" src="/avatar.svg" />
        <div class="courier-name">نام سفیر</div>
        <div class="courier-call">
          <v-btn outlined color="accent"> تماس با سفیر</v-btn>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import PersianUtil from '@/utils/PersianUtil'

export default {
  name: 'OrderStatus',
  props: { order: Object },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.order-status-sheet {
  margin: 2vw;
  font-size: 0.9em;
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
.address {
  color: #8E8E8E;
  margin-top: 3vw;
}
</style>
