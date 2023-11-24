<template>
  <v-snackbar
    v-model="snackbar.visible"
    :timeout="3000"
    :location="snackbar.position"
    :color="snackbar.color"
  >
    <div class="flex">
      <v-icon class="mr-2">{{ snackbar.icon }}</v-icon>
      <div>{{ snackbar.title }}</div>
    </div>
  </v-snackbar>
  <div class="flex justify-center">

    <v-card :width="size ? '100%' : '500'" :max-width="isModal ? 500 : ''" height="auto" class="rounded-lg pa-3" :variant="variant">
      <div class="d-flex flex-row-reverse" v-if="hasCloseButton">
        <v-icon @click="close">mdi-close-circle-outline</v-icon>
      </div>
      <div class="overflow-y-auto py-1">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-card
              variant="flat"
              :color="color"
  
              class="rounded-lg border mx-auto pa-4 pt-3 d-flex flex-column justify-space-around mb-3 sm:mb-0 w-280px sm:w-310px"
              v-bind="props"
            >
              <div class="d-flex align-center justify-space-between">
                <div style="font-size: 13px;">
                  {{ card.type || 'Credito' }}
                </div>
                <div style="font-size: 13px;">
                  <span v-if="card.flag === 'Mastercard' || card.flag === 'mastercard' || card.flag === 'visa' || card.flag === 'Visa'">
                    <v-img
                      v-if="card.flag === 'Mastercard' || card.flag === 'mastercard' || card.flag === 'visa' || card.flag === 'Visa'"
                      :src="`/img/${card.flag}.svg`"
                      alt="" width="40"
                    />
                  </span>
                  <div v-else>{{ card.flag }}</div>
                </div>
              </div>
              <div class="mt-10">
                <div style="font-size: 16px;">***</div>
                <div class="" style="font-size: 13px;">{{card.name || 'Joao Silva'}}</div>
              
                <v-row no-gutters class="pt-5">
                  <v-col class="">
                    <div style="font-size: 8px;">Data</div>
                    <div style="font-size: 10px;">{{ card.expiration }}</div>
                  </v-col>
                  <v-col class="">
                    <div style="font-size: 8px;">code</div>
                    <div style="font-size: 10px;">{{ card.code }}</div>
                  </v-col>
                </v-row>
              </div>
            </v-card>

            <div class="flex text-right justify-end mb-5">
              <sub class="text-xs"><i>Para definir a cor do cartão, clique no cartão</i></sub>
            </div>
            
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in colors"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-radio-group hide-details v-model="color">
                <v-radio :label="item.label" :value="item.value"></v-radio>
              </v-radio-group>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-form ref="formRef">
          <v-radio-group v-model="card.type" class="d-flex">
            <div class="d-flex" style="width: 250px;">
              <v-radio label="Crédito" value="Crédito"></v-radio>
              <v-radio label="Débito" value="Débito"></v-radio>
            </div>
          </v-radio-group>
    
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="card.bank"
            class="my-1"
            label="Nome do banco"
            required
            :rules="[v => !!v || 'O nome é obrigatório']"
          ></v-text-field>
    
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="card.name"
            class="my-1"
            label="Nome no cartão"
            required
            :rules="[v => !!v || 'O nome é obrigatório']"
          ></v-text-field>
    
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="card.expiration"
            label="Mês"
            required
            class="my-1"
            type="date"
            mask="MM/YY"
            :rules="[v => !!v || 'O mês é obrigatório']"
          ></v-text-field>
  
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="card.flag"
            label="Bandeira"
            required
            class="my-1"
            type="string"
            :rules="[v => !!v || 'O valor é obrigatório']"
          ></v-text-field>
    
          <v-btn
            @click="sendCard"
            class="w-100 primary-color"
            variant="flat"
            color="#74C27F"
            :loading="loading"
          >
            Send
          </v-btn>
        </v-form>
      </div>
    </v-card>
  </div>
</template>
<script setup>
const { postCard, colorState } = useCardStore()
const emit = defineEmits(['loadingCards'])
defineProps({
  variant: {
    type: String,
    default: "flat"
  },
  hasCloseButton: {
    type: Boolean,
    default: true
  },
  isModal: {
    type: Boolean,
    default: true
  }
})

const snackbar = ref({
  color: null,
  icon: null,
  mode: null,
  position: "top",
  text: null,
  timeout: 7500,
  title: null,
  visible: false,
  icon: null
})

const card = ref({
  name: null,
  bank: null,
  type: 'Crédito',
  flag: null,
  expiration: null
})
const loading = ref(false)
const size = ref(true)
const formRef = ref(null);

onMounted(() => {
  size.value = window.innerWidth
  window.addEventListener('resize', updatesizeValue);
});

const updatesizeValue = () => {
  size.value = window.innerWidth;
};

onBeforeUnmount(() => {
  window.removeEventListener('resize', updatesizeValue);
});

const resetFormValues = () => {
  card.value = {
    name: null,
    bank: null,
    type: 'Crédito',
    flag: null,
    expiration: null
  };
};

const sendCard = async () => {
  loading.value = true
  const { valid } = await formRef.value.validate();
  if (valid) {
    try {
      card.value = {
        ...card.value,
        color: color.value
      }
      await postCard(card.value)
      card.value = { ...card.value }
      
      resetFormValues();
      emit('loadingCards', true)
      snackbar.value = {
        visible: true,
        color: "#74C27F",
        position: "top",
        title: "Registration completed successfully!",
        icon: "mdi-check-circle"
      }
      loading.value = false
    } catch (error) {
      loading.value = false
    }
  } else {
    loading.value = false
    return;
  }
}

const color = ref(null)

const close = () => emit("closeModal", false)

const colors = ref([
  {label: "Vermelho", value: "red"},
  {label: "Azul", value: "blue"},
  {label: "Laranja", value: "orange"},
  {label: "Amarelo", value: "yellow"},
  {label: "Verde", value: "green"},
  {label: "Prata", value: "silver"},
  {label: "Roxo", value: "purple"},
])
</script>