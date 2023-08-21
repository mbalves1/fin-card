<template>
  <v-list
    v-for="item in data"
    :key="item.id"
    :title="item.name"
    subtitle="..."
    class="d-flex justify-space-between align-center"
    >
      <div class="d-flex justify-space-between">
        <v-icon class="mr-3" :color="inOut(item.type)">{{ item.type === 'Saída' ? 'mdi-cash-minus' : 'mdi-cash-plus'}}</v-icon>
        <p>{{ item.name }}</p>
        <!-- <p class="ml-10 fs-12" v-if="item.createdAt">{{ formatDate(item.createdAt) }}</p> -->
      </div>
      <p :style="`color: ${inOut(item.type)}`">{{ formatCurrency(item.value) }}</p>
  </v-list>
</template>
<script setup>
  // const store = useCounterStore()
  const emit = defineEmits();
  defineProps({
    data: {
      type: Object
    }
  })
  

</script>

