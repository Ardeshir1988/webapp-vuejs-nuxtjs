<template>
  <v-sheet class="address-item-sheet" rounded outlined>
    <div class="address-item-container">
      <div>
        <v-radio-group :value="getSelected" hide-details>
          <v-radio
            @click="selectAddress"
            :value="getSelected"
            class="address-item-radio"
            color="accent">
            <template v-slot:label>
              <div style="color: black">{{ address.title }}</div>
            </template>
          </v-radio>
        </v-radio-group>
        <div class="address-item-details">آدرس: {{ address.details }}</div>
        <div class="address-item-details">تلفن: {{ address.number }}</div>
      </div>
      <v-divider vertical />
      <div class="address-item-operations">
        <v-btn @click="editAddress" class="op" icon depressed block>
          <v-icon size="24" dense color="secondary">
            mdi-eye
          </v-icon>
        </v-btn>
        <v-divider />
        <v-btn @click="deleteAddress" class="op" icon depressed block>
          <v-icon size="24" dense color="error">
            mdi-delete-sweep
          </v-icon>
        </v-btn>
      </div>
    </div>

  </v-sheet>
</template>

<script>
export default {
  name: 'AddressItem',
  props: { address: Object },
  data() {
    return {
      selected: this.address.selected
    }
  },
  computed: {
    getSelected() {
      if (this.address.selected) {
        return '1'
      } else return ''
    }
  },
  methods: {
    selectAddress() {
      this.$emit('selectAddress', this.address.id)
    },
    editAddress() {
      this.$emit('editAddress', this.address.id)
    },
    deleteAddress() {
      this.$emit('deleteAddress', this.address.id)
    }
  }
}
</script>

<style scoped>
.address-item-sheet {
  margin: 2vw;
  height: 20vh;
  max-height: 20vh;
  direction: rtl;
}

.address-item-container {
  display: flex;
  flex-flow: row;
  height: 100%;
}

.address-item-details {
  font-size: 0.9em;
  direction: rtl;
  margin: 2vw 3vw 2vw 2vw;
  color: #8E8E8E;
  width: 80vw;
}

.address-item-operations {
  height: 100%;
  display: flex;
  flex-flow: column;
  width: 100%;
}

.op {
  margin-top: 2.5vh;
  margin-bottom: 2.5vh;
}
</style>
