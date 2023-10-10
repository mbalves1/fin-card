<template>
  <div class="card border rounded gap-2 py-5 sm:w-full sm:justify-center">
    <div
      v-for="(card, cardx) in data"
      :key="cardx"
      class="pa-0 flex justify-center"
    >
      <div class="flex sm:gap-2 bg-#f2f2f2 justify-center align-center">
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
  flex-direction: row;
  flex-wrap: wrap;
  // width: 100%;
  // justify-content: center;
  margin-top: 37px;
  background: #f2f2f2;
  max-height: 607px;
  @media screen and (max-width:800px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: auto;
    flex-wrap: nowrap;
    margin-top: 10px;
    max-height: auto;
  }
}


</style>