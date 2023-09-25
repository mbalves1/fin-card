<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <div v-if="formEdit">
      <v-radio-group class="py-2" v-model="itemEdit.type" inline hide-details="">
        <v-radio label="Saída" value="Saída"></v-radio>
        <v-radio label="Entrada" value="Entrada"></v-radio>
      </v-radio-group>
  
      <v-text-field
        density="compact"
        variant="outlined"
        v-model="itemEdit.name"
        class="my-1"
        :counter="10"
        label="Name"
        required
        :rules="[v => !!v || 'O nome é obrigatório']"
      ></v-text-field>
  
      <v-text-field
        density="compact"
        variant="outlined"
        v-model="itemEdit.description"
        label="Descrição"
        class="my-1"
      ></v-text-field>
  
      <v-text-field
        density="compact"
        variant="outlined"
        v-model="itemEdit.value"
        label="Valor"
        required
        class="my-1"
        :rules="[v => !!v || 'O valor é obrigatório']"
      ></v-text-field>
  
      <v-select
        density="compact"
        variant="outlined"
        v-model="itemEdit.month"
        :items="itemsMonth"
        label="Mês"
        required
        class="my-1"
        hide-details
      ></v-select>
  
      <v-radio-group v-model="itemEdit.method_payment" inline hide-details="">
        <template v-slot:label>
          <div><strong>Metodo de pagamento</strong></div>
        </template>
        <v-radio label="Cartão" value="1"></v-radio>
        <v-radio label="Dinheiro" value="2"></v-radio>
        <v-radio label="Pix" value="3"></v-radio>
      </v-radio-group>
  
      <div class="flex flex-row items-center mt-5 gap-2">
        <v-btn
          class="w-49% bg-fincard"
          variant="flat"
          color="#74C27F"
          @click="formEdit = !formEdit"
        >
          Send
        </v-btn>
        <v-btn @click="closeModal" class="w-49%"
          variant="flat" color="#f2f2f2">Fechar</v-btn>
      </div>
    </div>

    <div v-if="!formEdit">
      <div class="font-bold">Deseja editar esse lançamento?</div>
      <v-row class="border pa-3 my-2 text-sm">
        <v-col>
          <div class="flex">
            <div class="font-bold mr-2">Nome:</div><span>{{ itemEdit.name }}</span>
          </div>
          <div class="flex">
            <div class="font-bold mr-2">Mês:</div><span>{{ itemEdit.month }}</span>
          </div>
        </v-col>
        <v-col>
          <div class="flex">
            <div class="font-bold mr-2">Valor:</div><span>{{ formatCurrency(itemEdit.value) }}</span>
          </div>
          <div class="flex">
            <div class="font-bold mr-2">Tipo:</div> <span>{{ itemEdit.type }}</span>
          </div>
        </v-col>
      </v-row>

      <v-btn
        class="w-49% bg-fincard mr-2 text-normal"
        variant="flat"
        color="#74C27F"
        prepend-icon="mdi-save"
        @click="saveEditItem"
        :loading="loading"
      >
        Salvar
      </v-btn>
      <v-btn @click="closeModal" class="w-49%"
        variant="flat" color="#f2f2f2">Cancelar</v-btn>
    </div>
  </v-slide-y-reverse-transition>
</template>
<script setup>
const props = defineProps({
  itemEdit: {
    type: Object,
    default: {}
  },
  loading: {
    type: Boolean,
    ddfault: false
  }
})
const formEdit = ref(true)
const itemsMonth = ref(["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"])
const emit = defineEmits(['closeEditModal', 'saveEditItem'])

const closeModal = () => emit('closeEditModal', false)

const saveEditItem = () => {
  console.log("props.itemEdit", props.itemEdit)
  emit('saveEditItem', props.itemEdit)
}

</script>