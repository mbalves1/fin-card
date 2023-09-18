<template>
  <v-app>
    <v-row class="flex-row">
      <v-col cols="12" col="6">
        <slot></slot>
      </v-col>
      <v-col cols="12" col="6" class="bg-green">
        <v-img src="/img/creditcard.gif" class="w-500px"></v-img>
      </v-col>
    </v-row>
  </v-app>
</template>