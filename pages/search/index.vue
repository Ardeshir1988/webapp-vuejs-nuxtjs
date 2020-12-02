<template>
  <div>
    <div class="search-header">
      <v-row no-gutters>
        <v-col>
          <v-text-field
            class="text-field"
            placeholder="جستجو کنید"
            hide-details
            single-line
            filled
            dense
            rounded>
          </v-text-field>
        </v-col>
        <v-col class="search-btn">
          <v-btn icon>
            <v-icon color="primary">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <!--    <VerticalProductList :products="" />-->
  </div>
</template>

<script>
import VerticalProductList from '@/components/products/vertical/VerticalProductList'

export default {
  name: 'index.vue',
  components: { VerticalProductList }
}
</script>

<style scoped>
.search-header {
  position: fixed;
  position: -webkit-sticky;
  top: 0;
  display: flex;
  width: 100%;
  z-index: 7;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: white;
  direction: rtl;
}

.text-field {
  width: 80vw;
  max-width: 89vw;
  padding: 0;
  margin: 1.5vh;

}

.search-btn {
  margin: auto;
  text-align: center;
}
</style>
