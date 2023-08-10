<template>
  <v-list
    v-for="item in data"
    :key="item.id"
    :title="item.name"
    subtitle="..."
    class="d-flex justify-space-between align-center"
    >
      <v-icon class="mr-3" :color="inOut(item.type)">{{ item.type === 'Saída' ? 'mdi-cash-minus' : 'mdi-cash-plus'}}</v-icon>
      <p>{{ item.name }}</p>
      <p :style="`color: ${inOut(item.type)}`">{{ formatCurrency(item.value) }}</p>
      <p v-if="item.createdAt">{{ formatDate(item.createdAt) }}</p>
  </v-list>
</template>
<script setup>
  // const store = useCounterStore()
  const data = ref([])
  const emit = defineEmits();
  

  // const totalValue = () => {
  //   const totalBalance = data.value.reduce((acc, { value, type }) => {
  //     return type === "Entrada" ? acc + value : acc - value;
  //   }, 0);
  //   emit('total', totalBalance)
  //   emit('releaseLenght', data.value.length)
  // }

</script>

