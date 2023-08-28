<template>
  <div
    class="card"
  >
    <v-list
      v-for="(card, cardx) in data"
      :key="cardx"
    >
      <div class="">
        <Card
          class="mx-3 rr-2"
          height="145"
          width="100%"
          min-width="300px"
          max-width="300px"
          elevation="3"
          :card="card"
        >
        </Card>
      </div>
    </v-list>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: [Array, Object]
  }
})

</script>
<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  @media screen and (max-width:600px) {
    display: flex;
    flex-direction: row;
  }
}


</style>