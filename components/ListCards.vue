<template>
  <v-list
    v-for="(card, cardx) in 5"
    :key="cardx"
    class=""
  >
    <div class="d-flex">
      <Card class="mx-3 rr-2" height="100" width="100%" elevation="3">{{ card }}</Card>
    </div>
  </v-list>
</template>