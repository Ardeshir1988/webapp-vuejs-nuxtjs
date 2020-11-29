<template>
  <div>
    <div class="products-container">
      <VerticalProductList :products="products" />
    </div>
    <div class="types-container">
      <div class="horizontal-type-list">
        <div v-for="type in types">
          <v-btn outlined depressed :class="changeActivation(type.id)" :value="type.id" @click="changeSelectedType(type.id)">{{ type.name }}</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalProductList from '@/components/products/vertical/VerticalProductList'
import HorizontalTypeList from '@/components/type/HorizontalTypeList'

export default {
  name: 'index.vue',
  components: { HorizontalTypeList, VerticalProductList },
  data() {
    return {
      products: [],
      types: [],
      selectedType: { id: 'ALL'}
    }
  },
  watch: {
    selectedType: '$fetch'
  },
  async fetch() {
    const productList = await this.$repositories.product.getProductsByCategoryIdAndTypeId(this.$route.query.id, this.selectedType.id)
    const typeList = await this.$repositories.product.getTypesByCategoryId(this.$route.query.id)
    if (productList.status === 200 && productList.data) {
      this.products = productList.data
    } else {
      // Handle error here
    }
    if (typeList.status === 200 && typeList.data) {
      typeList.data.unshift({ id: 'ALL', name: 'همه' })
      this.types = typeList.data
    } else {
      // Handle error here
    }
  },
  methods: {
    changeActivation(typeId) {
      if (typeId === this.selectedType.id)
        return 'btn-active'
      else
        return 'btn-type'
    },
    changeSelectedType(typeId) {
      this.selectedType = { id: typeId }
    }
  }
}
</script>

<style scoped>
.types-container {
  position: fixed;
  position: -ms-device-fixed;
  bottom: 56px;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: flex-end;
  background-color: white;
}

.products-container {
  margin-bottom: 6vh;
}

.horizontal-type-list::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.horizontal-type-list {
  flex-direction: row-reverse;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  display: flex;
  overflow-x: auto;
}

.btn-type {
  margin: 0.25vh 0.5vh 0.25vh 0.5vh;
  border-color: gainsboro;

}

.btn-active {
  margin: 0.25vh 0.5vh 0.25vh 0.5vh;
  border-color: #8629FD;
  color: #8629FD;
}
</style>
