<template>
  <v-app>
    <side-bar></side-bar>
    <bottom-navigation></bottom-navigation>
    <v-main style="overflow-x: hidden;">
      <slot></slot>
    </v-main>
  </v-app>
</template>