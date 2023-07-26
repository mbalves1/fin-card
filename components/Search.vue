<template>
  <v-container class="wrapper--search rounded-xl">
    <v-row>
      <v-col>
        <v-text-field
          bg-color="#F0F3F4"
          hide-details="auto"
          placeholder="Search"
          rounded
          variant=""
          append-inner-icon="mdi-magnify"
          v-model="textfield"></v-text-field>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          03/12/2023
        </v-sheet>
      </v-col>
      <v-col class="d-flex justify-end">
        <v-sheet>
          <v-switch
            v-model="model"
            hide-details
            inset
            :append-icon="card"
            :label="model ? 'Delicious' : 'Nope'"
          >
          </v-switch>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    textfield: null,
    model: true
  }),
}
</script>
<style scoped lang="scss">
.wrapper {
  &--search {
    background: white;
  }
}

.v-input.v-input--switch--inset .v-input--switch__track:after {
    content: "No";
    color: #333333;
    font-size: 10px;
}

.v-input.v-input--switch--inset.v-input--is-label-active.v-input--is-dirty .v-input--switch__track:after{
   content: "Yes";
   color: #28A745;
}
</style>