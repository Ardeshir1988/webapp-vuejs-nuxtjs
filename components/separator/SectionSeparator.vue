<template>
  <v-row class="divider-container" no-gutters>
    <v-col>
      <v-row justify="end" no-gutters>
        <v-col>
          <nuxt-link :to="sectionLinkUrl">
          <div class="section-link-text">مشاهده همه</div>
          </nuxt-link>
        </v-col>
        <v-col>
          <v-row justify="end" no-gutters>
            <v-col cols="10">
              <div class="section-name">{{sectionName}}</div>
            </v-col>
            <v-col cols="auto">
              <CustomIcon24px :icon-src="sectionIcon" />
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
  props: {
    sectionName: String,
    sectionIcon: String,
    sectionLinkUrl: String
  }
}
</script>

<style scoped>
.divider-line {
  background-color: gray;
  height: 0.4vh;
}

.divider-container {
  margin-left: 0.5vh;
  margin-right: 0.5vh;
}

.section-name {
  direction: rtl;
}

.section-link-text {
  color: #41b883;
}
</style>
