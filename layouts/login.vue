<template>
  <v-app>
    <v-row class="background flex-row" :class="{ 'reverse-order': expand2, 'reverse-order-mobile': expand1 || expand3 }">
      <v-col xs="12" md="6" lg="6" col="12" class="left-col d-flex justify-center align-center">
        <slot></slot>
      </v-col>
      <v-col xs="12" md="6" lg="6" col="12" class="right-col hid"></v-col>
    </v-row>
  </v-app>
</template>

<style scoped lang="scss">
.background {
  display: flex;
}

.left-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.right-col {
  flex: 1;
  background-color: #74C27F;
  background-image: url('img/credit.gif');
  background-position: center;
}

.reverse-order {
  flex-direction: row-reverse;
}

.reverse-order-mobile {
  flex-direction: column-reverse;
}

@media screen and (max-width: 425px) {
  .hid {
    display: none;
  }
}
</style>