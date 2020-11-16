<template>
  <v-row class="divider-container" no-gutters>
      <v-col>
        <v-row  justify="end" no-gutters>
        <v-col>
          <div class="section-link-text">مشاهده همه</div>
        </v-col>
          <v-col>
            <v-row  justify="end" no-gutters>
              <v-col cols="10">
            <div class="section-name">محصولات جدید</div>
              </v-col>
              <v-col cols="auto">
                <CustomIcon24px  icon-src="/storefront-24px.svg" />
              </v-col>

            </v-row>
          </v-col>

        </v-row>

        <div class="divider-line" />
    </v-col>

  </v-row>
</template>

<script>
import CustomIcon24px from '@/components/icons/CustomIcon24px'
export default {
  name: 'SectionSeparator',
  components: { CustomIcon24px },
  props: ['section-name', 'section-icon', 'section-link-url']
}
</script>

<style scoped>
.divider-line {
  background-color: gray;
  height: 0.4vh;
}
.divider-container{
  margin-left: 0.5vh;
  margin-right: 0.5vh;
}
.section-name{
  direction: rtl;
}
.section-link-text{
  color: #41b883;
}
</style>
