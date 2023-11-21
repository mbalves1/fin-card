<template>
  <div class="mx-auto">
    <div class="py-10 ml-10 text-lg sm:text-3xl mx-auto flex justify-start">Transactions</div>
    <v-tabs
      v-model="tab"
      color="#74C27F"
    >
      <v-tab value="option-1">
          <v-icon start>
            mdi-checkbook-arrow-right
          </v-icon>
          <div class="capitalize">Tabela de transações</div>
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-credit-card
          </v-icon>
          <div class="capitalize">Tabela de cartões</div>
        </v-tab>
    </v-tabs>
    <v-divider></v-divider>
  </div>

  <v-window v-model="tab">
    <v-window-item value="option-1">
      <TableReleases :hasSpacing="true"></TableReleases>
    </v-window-item>
    <v-window-item value="option-2">
      Table Card
    </v-window-item>
  </v-window>
</template>
<script setup>
  const tab = ref("option-1");
</script>