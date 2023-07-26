<template>
  <v-list
    v-for="item in data"
    :key="item.id"
    :title="item.name"
    subtitle="..."
    class="d-flex justify-space-between align-center mx-5"
    >
    <v-sheet class="d-flex flex-column" @click="ola(item._id)">
      <sup class="mt-2"><b>{{ formatDate(item.createdAt) }}</b></sup>
      <v-list-item>
        <v-icon class="mr-3" :color="inOut(item.type)">{{ item.type === 'Saída' ? 'mdi-cash-minus' : 'mdi-cash-plus'}}</v-icon>
        {{ item.name }}
      </v-list-item>
    </v-sheet>
    <v-list-item :style="`color: ${inOut(item.type)}`">
      {{ formatCurrency(item.value) }}
      <v-icon color="grey" class="ml-5">
        mdi-delete
      </v-icon>
    </v-list-item>
  </v-list>
</template>
<script setup>
  const store = useCounterStore()
  const data = ref([])
  const emit = defineEmits();

  const ola = (id) => {
    console.log("ola", id);
  }
  
  onMounted(async () => {
    try {
      await store.getReleases();
      data.value = store.release
      totalValue()
    } catch (error) {
      console.error(error);
    }
  })

  const totalValue = () => {
    const totalBalance = data.value.reduce((acc, { value, type }) => {
      return type === "Entrada" ? acc + value : acc - value;
    }, 0);
    emit('total', totalBalance)
    emit('releaseLenght', data.value.length)
  }

</script>

