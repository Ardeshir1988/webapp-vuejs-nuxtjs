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
  flex-direction: row-reverse;
}

.categories_item {
  margin-bottom: 0.5vw;
  margin-right: 0.5vw;
  margin-left: 0.5vw;
}
</style>
