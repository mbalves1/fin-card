<template>
  <v-card>
    <v-img src="/img/mastercard.svg" alt="" width="40"/>
    {{ card.bank }}
    {{ card.name }}
    {{ card.type }}
    {{ card.flag }}
    {{ card.expiration }}
  </v-card>
</template>
<script setup>
defineProps({
  card: {
    type: Object
  },
})


</script>
