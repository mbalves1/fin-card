<template>
  <v-dialog
    :model-value="initialLoading"
    @update:model-value="initialLoading"
    hide-overlay
    persistent
    width="300"
    lazy          
  >
    <v-card
      color="#74C27F"
      dark
    >
      <v-card-text>
        <div class="text-white mb-2">Carregando informações</div>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>
<script setup>
defineProps({
  initialLoading: { type: Boolean, default: false },
})
</script>