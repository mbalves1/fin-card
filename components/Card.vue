<template>
  <v-card
    :color="card.color"
    elevation="10"
    class="rounded-lg pa-4 pt-3 d-flex flex-column justify-space-around"
  >
    <div class="d-flex align-center justify-space-between">
      <div style="font-size: 11px;">
        {{ card.type }}
      </div>
      <div style="font-size: 13px;">
        <v-img v-if="card.flag === 'Mastercard' || card.flag === 'Visa'" :src="`/img/${card.flag}.svg`" alt="" width="40"/>
      </div>
    </div>
    <div class="mt-2">
      <div style="font-size: 16px;"> ***...***</div>
      <div class="" style="font-size: 13px;">{{ card.name }}</div>
    
      <v-row no-gutters class="pt-2">
        <v-col class="">
          <div style="font-size: 8px;">Data</div>
          <div style="font-size: 10px;">{{ card.expiration }}</div>
        </v-col>
        <v-col class="">
          <div style="font-size: 8px;">code</div>
          <div style="font-size: 10px;">***</div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script setup>
defineProps({
  card: {
    type: Object
  },
})

const { colorState } = useCardStore()


</script>
