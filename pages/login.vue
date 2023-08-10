<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        Aqui caralo
        <form @submit.prevent="submit">
          <v-text-field
            v-model="form"
            :counter="10"
            label="Name"
            variant="outlined"
          ></v-text-field>
      
          <v-text-field
          variant="outlined"
            :counter="7"
            label="Phone Number"
          ></v-text-field>
      
          <v-select
          variant="outlined"
            :items="items"
            label="Select"
          ></v-select>
      
          <v-checkbox
          variant="outlined"
            value="1"
            label="Option"
            type="checkbox"
          ></v-checkbox>
      
          <v-btn
            class="me-4"
            type="submit"
            @click="clickme"
          >
            submit
          </v-btn>
      
          <v-btn>
            clear
          </v-btn>
        </form>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
</script>