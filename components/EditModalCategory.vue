<template>
  <v-slide-y-reverse-transition hide-on-leave>
    <div>  
      <div class="pt-5 pb-8 px-2">
        Editar nome da categoria
      </div>
      <v-form ref="formRef">

        <v-text-field
          density="compact"
          variant="outlined"
          label="Nome"
          required
          class="my-1"
          v-model="itemToEdit.categoryname"
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
const formRef = ref(null);

const closeModal = () => emit('closeEditModal', false)

const confirm = () => {
  const { isValid } = formRef.value
  if (isValid) {
    emit('saveEditItem', props.itemToEdit)
  }
}

</script>