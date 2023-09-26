<template>
  <v-row>
    <v-col cols="12" lg="12" md="12" xs="11" class="d-flex">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="end"
      >
      <template v-slot:activator="{ props }">
        <v-btn
          color="indigo"
          v-bind="props"
          variant="text"
          class="text-capitalize"
        >
          Filtros
        </v-btn>
      </template>

      <v-card min-width="300">
        <p class="pa-2">Choise</p>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-select
              density="compact"
              variant="outlined"
              :items="items"
              v-model="item"
              rounded="full"
              item-title="name"
              item-value="value"
              :return-object="false"
              hide-details
            ></v-select>
          </v-list-item>

          <v-list-item>
            <v-select
              v-if="item === 'bank'"
              density="compact"
              variant="outlined"
              :items="itemsBank"
              rounded="full"
              hide-details
              v-model="itemSearch"
            ></v-select>

            <v-select
              v-if="item === 'month'"
              density="compact"
              variant="outlined"
              :items="itemsMonth"
              rounded="full"
              hide-details
              v-model="itemSearch"
            ></v-select>

            <v-select
              v-if="item === 'type'"
              density="compact"
              variant="outlined"
              :items="['Saída', 'Entrada']"
              rounded="full"
              hide-details
              v-model="itemSearch"
            ></v-select>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            color="grey"
            @click="menu = false"
            class="text-capitalize"
            append-icon="mdi-close"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green"
            variant="text"
            class="text-capitalize"
            append-icon="mdi-send"
            @click="search"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

    </v-col>
  </v-row>
</template>
<script setup>
const items = ref([
  { name: "Bank", value: "bank" },
  { name: "Month", value: "month" },
  { name: "Type", value: "type" }
])
const itemsMonth = useMonths()
const itemSearch = ref(null)
const fav = ref(true)
const menu = ref(false)
const message = ref(false)
const hints = ref(true)

const item = ref(null)

const emit = defineEmits(['getFilter'])

const search = () => {
  menu.value = false
  emit('getFilter', {item: item.value, value: itemSearch.value})
}
</script>