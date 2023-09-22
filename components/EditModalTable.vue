<template>
  <pre>{{ itemToEdit }}</pre>
  <div>
    <v-radio-group class="py-2" v-model="itemToEdit.type" inline hide-details="">
      <v-radio label="Saída" value="Saída"></v-radio>
      <v-radio label="Entrada" value="Entrada"></v-radio>
    </v-radio-group>

    <v-text-field
      density="compact"
      variant="outlined"
      v-model="itemToEdit.name"
      class="my-1"
      :counter="10"
      label="Name"
      required
      :rules="[v => !!v || 'O nome é obrigatório']"
    ></v-text-field>

    <v-text-field
      density="compact"
      variant="outlined"
      v-model="itemToEdit.description"
      label="Descrição"
      class="my-1"
    ></v-text-field>

    <v-text-field
      density="compact"
      variant="outlined"
      v-model="itemToEdit.value"
      label="Valor"
      required
      class="my-1"
      type="number"
      :rules="[v => !!v || 'O valor é obrigatório']"
    ></v-text-field>

    <v-select
      density="compact"
      variant="outlined"
      v-model="itemToEdit.month"
      :items="items"
      label="Mês"
      required
      class="my-1"
      hide-details
    ></v-select>

    <v-radio-group v-model="itemToEdit.method_payment" inline hide-details="">
      <template v-slot:label>
        <div><strong>Metodo de pagamento</strong></div>
      </template>
      <v-radio label="Cartão" value="1"></v-radio>
      <v-radio label="Dinheiro" value="2"></v-radio>
      <v-radio label="Pix" value="3"></v-radio>
    </v-radio-group>

    <v-btn
      class="w-100 primary-color mt-5"
      variant="flat"
      color="#74C27F"
    >
      Send
    </v-btn>
  </div>
</template>
<script setup>
defineProps({
  itemToEdit: {
    type: Object,
    default: {}
  }
})
</script>