<template>
  <v-card
    elevation="0"
    class="bg-#f2f2f2 rounded-lg pa-4 pt-3 d-flex flex-column justify-space-around"

    :style="cardSelecBorder === card.bank ? 'border: 2px solid green; background: #f2f2f2' : 'border: 1px solid #c1c1c1; background: white'"
    @click="selectBank"
  >
    {{ card.bank === cardSelecBorder }}
    <div class="d-flex align-center justify-space-between">
      <div class="fs-10">
        {{ card.type }}
      </div>
      <div class="fs-13">
        <v-img v-if="card.flag === 'Mastercard' || card.flag === 'Visa'" :src="`/img/${card.flag}.svg`" alt="" width="40"/>
      </div>
    </div>
    <div class="mt-2">
      <v-chip :color="card.color" class="fs-10">{{ card.bank }}</v-chip>
      <div class="fs-10 font-bold">{{ card.name }}</div>
    
      <v-row no-gutters class="pt-2">
        <v-col class="">
          <div style="font-size: 8px;">Data</div>
          <div style="font-size: 10px;">{{ card.expiration }}</div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>
<script setup>
const props = defineProps({
  card: {
    type: Object
  },
  modalRelease: {
    type: Boolean,
    default: false
  },
})
const emit = defineEmits(['selectBank'])
const cardSelecBorder = ref(null)


const { colorState } = useCardStore()

const selectBank = () => {
  console.log(props.card.bank)
  if (cardSelecBorder.value !== props.card.bank) {
    console.log("togfgle")
    cardSelecBorder.value = props.card.bank
    emit('selectBank', props.card)
  } else {
    cardSelecBorder.value = null
  }
}

</script>
