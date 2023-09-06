<template>
  <v-card :width="size ? '100%' : '500'" :max-width="isModal ? 500 : ''" height="auto" class="pa-3 px-md-5 ml-auto border rounded-lg" :variant="variant">
    <div class="d-flex flex-row-reverse" v-if="hasCloseButton">
      <v-icon @click="close">mdi-close-circle-outline</v-icon>
    </div>
    <div class="overflow-y-auto py-1">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-card
            :color="color"
            elevation="10"
            width="320"
            height="200"
            class="rounded-lg mx-auto pa-4 pt-3 d-flex flex-column justify-space-around"
            v-bind="props"
          >
            <div class="d-flex align-center justify-space-between">
              <div style="font-size: 13px;">
                {{ card.type || 'Credito' }}
              </div>
              <div style="font-size: 13px;">
                <v-img v-if="card.flag === 'Mastercard' || card.flag === 'Visa'" :src="`/img/${card.flag}.svg`" alt="" width="40"/>
              </div>
            </div>
            <div class="mt-10">
              <div style="font-size: 16px;">{{ formattedNumber(card.number_card )|| '000' }}</div>
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
            <v-radio label="Debito" value="Dábito"></v-radio>
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
          label="Code"
          required
          class="my-1"
          type="date"
          mask="DD/MM"
          :rules="[v => !!v || 'O valor é obrigatório']"
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
        >
          Send
        </v-btn>
      </v-form>
    </div>
  </v-card>
</template>
<script setup>
const { postCard, colorState } = useCardStore()
const emit = defineEmits()
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

const card = ref({
  name: null,
  number_card: "",
  bank: null,
  type: null,
  flag: null,
  expiration: null,
  code: null
})

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

const flagCard = ref(null)

const sendCard = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    try {
      card.value = {
        ...card.value,
        flag: flagCard,
        color: color.value
      }
      await postCard(card.value)
      form.value = { ...form.value }
      console.log("payload", form.value)
      resetFormValues();
      snackbar.value = {
        visible: true,
        color: "#74C27F",
        position: "top",
        title: "Registration completed successfully!",
        icon: "mdi-check-circle"
      }
  
    } catch (error) {
  
    }
  } else {
    return;
  }
}

const color = ref(null)

const close = () => emit("closeModal", false)

const colors = ref([
  {label: "red", value: "red"},
  {label: "blue", value: "blue"},
  {label: "orange", value: "orange"},
  {label: "yellow", value: "yellow"},
  {label: "green", value: "green"},
  {label: "silver", value: "silver"},
  {label: "purple", value: "purple"},
])

</script>