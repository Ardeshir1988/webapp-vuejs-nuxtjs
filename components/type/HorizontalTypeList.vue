<template>
  <div class="horizontal-type-list">
    <div v-for="type in typeList">
      <v-btn  outlined depressed color="back" class="btn-type" :value="type.id">{{ type.name }}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorizontalTypeList',
  props: { typeList: Array },
  selectedType: { name: 'همه', id: 'ALL' }
}
</script>

<style scoped>
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
.btn-type{
  margin: 0.25vh 0.5vh 0.25vh 0.5vh;

}
</style>
