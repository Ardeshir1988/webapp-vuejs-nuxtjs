<template>

  <v-sheet @click="gotoCategoryProduct" class="category" outlined rounded>

    <v-img
      :src="require('assets/category-lazyload.png')"
    >

    <v-img class="img-category" :src="imageUrl" height='100%' :lazy-src="require('assets/category-lazyload.png')">
      <div class="name-category">
        {{ category.name }}
      </div>
    </v-img>

    </v-img>

  </v-sheet>

</template>

<script>
import { FILES_URL } from '@/constants'

export default {
  name: 'CategoryItem',
  props: { category: Object },
  computed: {
    imageUrl: function() {
      return FILES_URL + this.category.picture
    }
  },
  methods:{
    gotoCategoryProduct(){
      this.$router.push('/category/'+this.category.name+'?id='+this.category.id)
    }
  }
}
</script>

<style scoped>
.img-category{
  display: flex;
  align-items: baseline;
  text-align: center;
}
.name-category {
  font-size: 10pt;
  align-items: center;
}
.category{
  text-align: center;
  width: 32vw;
}
</style>
