<template>
  <div class="option-list">
    <div v-for="op in options">
    <AccountOption :op="op"/>
    </div>
  </div>
</template>

<script>
import AccountOption from '@/components/acount/AccountOption'
export default {
  name: 'AccountGridOptions',
  components: { AccountOption },
  data() {
    return {
      options: [
        { name: 'وضعیت سفارش', iconName: 'order-status-24px.svg' },
        { name: 'خریدهای گذشته', iconName: 'orders-24px.svg' },
        { name: 'پشتیبانی', iconName: 'call-24px.svg' },
        { name: 'آدرس ها', iconName: 'addresses-24px.svg' },
        { name: 'معرفی به دوستان', iconName: 'share-24px.svg' },
        { name: 'ارسال پیام', iconName: 'send-message-24px.svg' },
        { name: 'قوانین', iconName: 'rules-24px.svg' },
        { name: 'راهنما', iconName: 'info-24px.svg' },
        { name: 'خروج', iconName: 'logout-24px.svg' }
      ]
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
