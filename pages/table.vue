<template>
  <v-snackbar
    v-model="snackbar.visible"
    :timeout="3000"
    location="top"
    :color="snackbar.color"
  >
    {{ snackbar.title }}
    <v-icon class="ml-10">{{ snackbar.icon }}</v-icon>
  </v-snackbar>

  <loading-global
    :initialLoading="initialLoading"
  ></loading-global>

  <div class="mx-auto">
    <div
      class="py-6 sm:py-10 pl-10 text-lg sm:text-3xl mx-auto flex justify-start items-center bg-fincard sm:bg-transparent">
      <v-icon class="mr-3">mdi-table</v-icon>Tabelas</div>
    <v-tabs
      v-model="tab"
      color="#74C27F"
      align-tabs="center"
    >
      <v-tab value="option-1">
          <v-icon start>
            mdi-checkbook-arrow-right
          </v-icon>
          <div class="capitalize">Transações</div>
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-credit-card
          </v-icon>
          <div class="capitalize">Cartões</div>
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            mdi-tag-text-outline
          </v-icon>
          <div class="capitalize">Categorias</div>
        </v-tab>
    </v-tabs>
    <v-divider></v-divider>
  </div>

  <v-window v-model="tab">
    <v-window-item value="option-1">
      <TableReleases
        :hasSpacing="true"
        @initial-loading-emits="loadingHandle"
      ></TableReleases>
    </v-window-item>
    <v-window-item value="option-2">
      <TableCards @sendSnackbar="snackSuccess"></TableCards>
    </v-window-item>
    <v-window-item value="option-3">
      <TableCategorys></TableCategorys>
    </v-window-item>
  </v-window>
</template>
<script setup>
  const tab = ref("option-1")
  const snackbar = ref({
    color: null,
    icon: null,
    mode: null,
    position: "top",
    text: null,
    timeout: 7500,
    title: null,
    visible: false,
    icon: null
  })

  const initialLoading = ref(false)

  const snackSuccess = (item) => {
    snackbar.value = {
      color: item.value.color,
      icon: item.value.icon,
      position: item.value.top,
      title: item.value.title,
      visible: item.value.visible
    }
  }

  const loadingHandle = (event) => {
    initialLoading.value = event
  }
</script>
