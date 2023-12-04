<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <div v-if="formEdit">  
      <div class="pt-5 pb-8 px-2">
        Editar informações do cartão
      </div>
      <v-form ref="formRef">
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="itemToEdit.name"
          class="my-1"
          :counter="10"
          label="Nome do cartão"
          required
          :rules="[v => !!v || 'O nome é obrigatório']"
        ></v-text-field>
    
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="itemToEdit.flag"
          label="Bandeira"
          class="my-1"
          :rules="[v => !!v || 'A bandeira é obrigatório']"
        ></v-text-field>
  
        <v-select
          density="compact"
          variant="outlined"
          v-model="itemToEdit.type"
          label="Tipo"
          :items="['Crédito', 'Débito']"
          required
          class="my-1"
          :rules="[v => !!v || 'O tipo é obrigatório']"
        ></v-select>
    
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="itemToEdit.expiration"
          label="Mês"
          required
          class="my-1"
          type="date"
        ></v-text-field>
  
        <div class="flex flex-row items-center mt-5 gap-2">
          <v-btn
            @click="closeModal"
            class="w-49% text-capitalize"
            variant="flat"
            color="#f2f2f2"
            append-icon="mdi-close"
          >Fechar</v-btn>
          <v-btn
            class="w-49% bg-fincard text-capitalize"
            variant="flat"
            color="#74C27F"
            append-icon="mdi-content-save"
            @click="confirm"
          >
            Salvar
          </v-btn>
        </div>
      </v-form>
    </div>

    <div v-if="!formEdit">
      <div class="font-bold">Deseja editar esse lançamento?</div>
      <v-row class="border pa-3 my-2 text-sm">
        <v-col>
          <div class="flex">
            <div class="font-bold mr-2">Nome:</div><span>{{ itemToEdit.name }}</span>
          </div>
          <div class="flex">
            <div class="font-bold mr-2">Mês:</div><span>{{ itemToEdit.expiration }}</span>
          </div>
        </v-col>
        <v-col>
          <div class="flex">
            <div class="font-bold mr-2">Tipo:</div><span>{{ itemToEdit.type }}</span>
          </div>
          <div class="flex">
            <div class="font-bold mr-2">Bandeira:</div> <span>{{ itemToEdit.flag }}</span>
          </div>
        </v-col>
      </v-row>

      <v-btn @click="formEdit = !formEdit"
        class="mr-2 w-49% text-capitalize"
        variant="flat"
        color="#f2f2f2"
        append-icon="mdi-close"
      >
        Cancelar
      </v-btn>
      <v-btn
        class="w-49% bg-fincard text-normal"
        variant="flat"
        color="#74C27F"
        @click="saveEditItem"
        :loading="loading"
      >
        <div class="capitalize">Confirmar</div>
        <v-icon class="pl-2">mdi-content-save</v-icon>
      </v-btn>
    </div>
  </v-slide-y-reverse-transition>
</template>
<script setup>
const props = defineProps({
  itemToEdit: {
    type: Object,
    default: {}
  },
  loading: {
    type: Boolean,
    ddfault: false
  }
})
const emit = defineEmits(['closeModal', 'saveEditItem'])
const formEdit = ref(true)
const formRef = ref(null);

const closeModal = () => emit('closeEditModal', false)

const confirm = () => {
  const { isValid } = formRef.value
  if (isValid) {
    formEdit.value = !formEdit.value
  }
}

const saveEditItem = () => {
  emit('saveEditItem', props.itemToEdit)
}
</script>