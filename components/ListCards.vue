<template>
  <div class="border rounded overflow-x-scroll sm:overflow-y-scroll sm:h-610px sm:has-vertical-scroll">
    <div class="gap-2 py-5 flex nowrap sm:flex-wrap sm:justify-center">
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
  }
})
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

