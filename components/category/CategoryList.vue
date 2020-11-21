<template>
  <div class="categories">
    <div v-for="category in categories" class="categories_item">
      <CategoryItem :category="category" :key="category.id" />
    </div>
  </div>
</template>

<script>
import CategoryItem from '@/components/category/CategoryItem'

export default {
  name: 'CategoryList',
  components: { CategoryItem },
  props: { categories: Array }
}
</script>

<style scoped>
.categories {
  display: flex;
  flex-wrap: wrap;
}

.categories_item {
  margin-bottom: 2vh;
  margin-right: auto;
  margin-left: auto;
}
</style>
