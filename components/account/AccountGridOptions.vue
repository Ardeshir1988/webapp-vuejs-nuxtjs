<template>
  <div class="option-list">
    <div v-for="op in getOptions">
      <AccountOption @chooseOp="clickOp" :op="op" :key="op.id" />
    </div>
  </div>
</template>

<script>
import AccountOption from '@/components/account/AccountOption'

export default {
  name: 'AccountGridOptions',
  props: { registered: Boolean },
  components: { AccountOption },
  data() {
    return {
      options: [
        { id: 'op1', name: 'وضعیت سفارش', iconName: 'order-status-24px.svg', disable: true },
        { id: 'op2', name: 'خریدهای گذشته', iconName: 'orders-24px.svg', disable: true },
        { id: 'op3', name: 'آدرس ها', iconName: 'addresses-24px.svg', disable: true },
        { id: 'op4', name: 'پشتیبانی', iconName: 'call-24px.svg', disable: false },
        { id: 'op5', name: 'معرفی به دوستان', iconName: 'share-24px.svg', disable: false },
        { id: 'op6', name: 'ارسال پیام', iconName: 'send-message-24px.svg', disable: true },
        { id: 'op7', name: 'قوانین', iconName: 'rules-24px.svg', disable: false },
        { id: 'op8', name: 'راهنما', iconName: 'info-24px.svg', disable: false },
        { id: 'op9', name: 'خروج', iconName: 'logout-24px.svg', disable: true }
      ]
    }
  },
  computed: {
    getOptions() {
      if (this.registered)
        return [
          { id: 'op1', name: 'وضعیت سفارش', iconName: 'order-status-24px.svg', disable: false },
          { id: 'op2', name: 'خریدهای گذشته', iconName: 'orders-24px.svg', disable: false },
          { id: 'op3', name: 'آدرس ها', iconName: 'addresses-24px.svg', disable: false },
          { id: 'op4', name: 'پشتیبانی', iconName: 'call-24px.svg', disable: false },
          { id: 'op5', name: 'معرفی به دوستان', iconName: 'share-24px.svg', disable: false },
          { id: 'op6', name: 'ارسال پیام', iconName: 'send-message-24px.svg', disable: false },
          { id: 'op7', name: 'قوانین', iconName: 'rules-24px.svg', disable: false },
          { id: 'op8', name: 'راهنما', iconName: 'info-24px.svg', disable: false },
          { id: 'op9', name: 'خروج', iconName: 'logout-24px.svg', disable: false }
        ]
      else return this.options
    }
  },
  methods: {
    clickOp(opId) {
      switch (opId) {
        case 'op1': {
          this.$router.push('/orders/status')
          break
        }
        case 'op2': {
          this.$router.push('/orders/transaction')
          break
        }
        case 'op3': {
          this.$router.push('/address')
          break
        }
        case 'op4': {
          break
        }
        case 'op9': {
          this.$cookies.removeAll()
          $nuxt.refresh()
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.option-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
