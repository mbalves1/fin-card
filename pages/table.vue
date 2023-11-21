<template>
  <div class="mx-auto">
    <div class="py-6 sm:py-10 pl-10 text-lg sm:text-3xl mx-auto flex justify-start bg-fincard sm:bg-transparent">Tabelas</div>
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
      <TableReleases :hasSpacing="true"></TableReleases>
    </v-window-item>
    <v-window-item value="option-2">
      <TableCards></TableCards>
    </v-window-item>
    <v-window-item value="option-3">
      Categorias
    </v-window-item>
  </v-window>
</template>
<script setup>
  const tab = ref("option-1")
</script>
