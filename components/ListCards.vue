<template>
  <v-list
    v-for="(card, cardx) in dataCards"
    :key="cardx"
    class=""
  >
    <div class="d-flex">
      <Card
        class="mx-3 rr-2"
        height="100"
        width="100%"
        elevation="3"
        :card="card"
      >
      </Card>
    </div>
  </v-list>
</template>
<script setup>
  const store = useCounterStore()
  const dataCards = ref([])

  
  onMounted(async () => {
    try {
      await store.getCards();
      dataCards.value = store.cards
    } catch (error) {
      console.error(error);
    }
  })

</script>