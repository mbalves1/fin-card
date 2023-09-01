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
              hide-details
            ></v-select>
          </v-list-item>

          <v-list-item>
            <v-select
              v-if="item === 'Card'"
              density="compact"
              variant="outlined"
              :items="itemsCard"
              rounded="full"
              hide-details
            ></v-select>

            <v-select
              v-if="item === 'Bank'"
              density="compact"
              variant="outlined"
              :items="itemsBank"
              rounded="full"
              hide-details
            ></v-select>

            <v-select
              v-if="item === 'Month'"
              density="compact"
              variant="outlined"
              :items="itemsMonth"
              rounded="full"
              hide-details
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
            @click="menu = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

      <!-- <v-select
        density="compact"
        rounded="full"
        variant="outlined"
        class="rounded-lg"
        label="Month"
        :items="['Janeiro', 'Novembro']"
        hide-details
        height=""></v-select>
      <v-select
        density="compact"
        rounded="full"
        variant="outlined"
        class="rounded-lg"
        label="Bank"
        :items="items"
        hide-details
        height=""></v-select>
      <v-select
        density="compact"
        rounded="full"
        variant="outlined"
        class="rounded-lg"
        label="Type"
        :items="['Crédito', 'Débito']"
        hide-details
        height=""></v-select> -->
    </v-col>
  </v-row>
</template>
<script setup>
const items = ref(["Card", "Bank", "Month"])
const fav = ref(true)
const menu = ref(false)
const message = ref(false)
const hints = ref(true)

const item = ref(null)
</script>