<template>
  <v-list
    v-for="(card, cardx) in data"
    :key="cardx"
    class=""
  >
    <div class="d-flex">
      <Card
        class="mx-3 rr-2"
        height="145"
        width="100%"
        min-width="330px"
        max-width="330px"
        elevation="3"
        :card="card"
      >
      </Card>
    </div>
  </v-list>
  <div class="d-flex mt-2">
    <v-card
      class="mx-3 rr-2 d-flex justify-center align-center"
      height="100"
      width="100%"
      min-width="330px"
      max-width="330px"
      elevation="0"
      border
      @click="registerCard"
    >
      <v-icon color="gray">mdi-plus-circle-outline</v-icon>
    </v-card>
  </div>
</template>
<script setup>
const emit = defineEmits(['openModalCard'])

defineProps({
  data: {
    type: [Array, Object]
  }
})

const registerCard = () => emit('openModalCard', true) 

</script>