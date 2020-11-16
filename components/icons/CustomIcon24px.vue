<template>
  <v-img class="new-icon" :src="iconSrc" alt="" />
</template>

<script>
export default {
  name: 'CustomIcon24px',
  props: { iconSrc : String}
}
</script>

<style scoped>
.new-icon {
  height: 24px;
  width: 24px;
}

</style>
