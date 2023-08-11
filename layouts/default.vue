<template>
  <v-app>
    <v-container class="mx-0">
      <v-row>
        <v-col>
          <side-bar />
          <div>
            <slot></slot>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>