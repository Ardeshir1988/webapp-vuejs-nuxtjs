<template>
  <div>
    <div class="products-container">
      <VerticalProductList :products="products" />
    </div>
    <div class="types-container">
      <div class="horizontal-type-list">
        <div v-for="type in types">
          <v-btn outlined depressed :class="changeActivation(type.id)" :value="type.id"
                 @click="changeSelectedType(type.id)">{{ type.name }}
          </v-btn>
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
  created () {
    if (process.client) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed () {
    if (process.client) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  data() {
    return {
      products: [],
      types: [],
      selectedType: { id: 'ALL' },
      page: 0,
      scrollPosition:0,
      categoryId: ''
    }
  },
  watch: {
    selectedType: '$fetch'
  },
  async fetch() {


    if(this.$route.query.id !== undefined) {
      this.categoryId = this.$route.query.id
    }else{
      this.categoryId = this.$route.query.categoryId
    }
    if(this.$route.query.typeId !== undefined) {
      this.selectedType.id = this.$route.query.typeId
    }

      const productList = await this.$repositories.product.getProductsByCategoryIdAndTypeId(this.categoryId , this.selectedType.id, this.page)
      const typeList = await this.$repositories.product.getTypesByCategoryId(this.categoryId )
      if (productList.status === 200 && productList.data) {
        this.products = productList.data
      } else {

      }
      if (typeList.status === 200 && typeList.data) {
        typeList.data.unshift({ id: 'ALL', name: 'همه' })
        this.types = typeList.data
      } else {
      }
  },
  methods: {
    handleScroll () {
      if (window.scrollY - this.scrollPosition>1500 ) {
        console.log('----GET DATA-------' + window.scrollY+'----Page---'+this.page)
        this.scrollPosition = window.scrollY
        this.getDataPage()
      }
    },
    getDataPage() {
      this.page++
      this.$repositories.product.getProductsByCategoryIdAndTypeId(this.categoryId, this.selectedType.id, this.page)
        .then((response) => {
          if (response.data.length > 1) {
            response.data.forEach((item) => this.products.push(item))

          } else {

          }
        }).catch((err) => {
        console.log(err)
      })
    },
    changeActivation(typeId) {
      if (typeId === this.selectedType.id)
        return 'btn-active'
      else
        return 'btn-type'
    },
    changeSelectedType(typeId) {
      this.page = 0
      this.scrollPosition = 0
      scrollTo(0,0)
      if (process.client) {
        window.addEventListener('scroll', this.handleScroll);
      }
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
  padding-top: 3px;
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
