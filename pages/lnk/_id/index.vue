<template>

</template>

<script>


export default {
  name: 'index.vue',

  async mounted() {
    const res = await this.$repositories.product.getShortenLink(this.$route.params.id)
    if (res !== false) {
      if (res.data.result === true){
        this.$router.push("/"+ res.data.msg.replace("/type/","?typeId="))
      }
    }
  }
}
</script>

<style scoped>

</style>
