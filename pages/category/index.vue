<template>
  <CategoryList class="category" :categories="categories" />
</template>

<script>
import CategoryList from '@/components/category/CategoryList'

export default {
  name: 'index',
  components: { CategoryList },
  data() {
    return {
      categories: []
    }
  },
  async fetch() {
    const categoryList = await this.$repositories.product.getCategories()
    if (categoryList !== false) {
      this.categories = categoryList.data
    } else {
    }
  }
}
</script>

<style scoped>
.category {
  margin-top: 1vh;
}
</style>
