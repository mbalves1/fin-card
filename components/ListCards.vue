<template>
  <div
    class="border rounded overflow-x-scroll sm:overflow-y-scroll  sm:has-vertical-scroll"
    :class="[modalRelease ? 'h-auto' : 'sm:h-610px']"
  >
    <div
      class="gap-2 py-5 flex nowrap"
      :class="[modalRelease ? '' : 'sm:flex-wrap sm:justify-center']"
    >
      <div
        v-for="(card, cardx) in data"
        :key="cardx"
        class="pa-0"
      >
        <div>
          <Card
            class="mx-2"
            height="145"
            width="145"
            min-width="145px"
            elevation="0"
            :card="card"
            :modalRelease="modalRelease"
            @select-bank="selectedCard"
          >
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: {
    type: [Array, Object]
  },
  modalRelease: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['selectedCard'])

const selectedCard = (cardBank) => {
  emit('selectedCard', cardBank)
}
</script>
<style lang="scss">
.has-vertical-scroll::-webkit-scrollbar {
  width: 2px;
  background-color: rgba(0, 0, 0, 0.2);
}

.has-vertical-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 5px;
}
</style>

