<template>
  <div class="sheet-container">

    <div class="btn-close">
      <v-btn @click="close"  icon depressed><v-icon>mdi-close</v-icon></v-btn>
    </div>
    <div>
      <OrderProductItem v-for="item in this.orderDetails.products" :product-item="item" :key="item.name" />
    </div>
    <div>{{this.orderDetails.totalAmount}}</div>
  </div>
</template>

<script>
import OrderProductItem from '@/components/order/OrderProductItem'
import Header from '@/components/header/Header'

export default {
  name: 'OrderDetails',
  props: { orderDetails: Object },
  components: { Header, OrderProductItem },
  methods:{
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.sheet-container{
  background-color: white;
}
.btn-close{
  text-align: right;
  margin-right: 2vw;
}
</style>
