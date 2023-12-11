<template>
  <v-app>
    <side-bar></side-bar>
    <bottom-navigation></bottom-navigation>
    <v-main style="overflow-x: hidden; background-color: #f2f2f2;">
      <slot></slot>
    </v-main>
  </v-app>
</template>