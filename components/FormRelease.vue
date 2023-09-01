<template>
  <v-container class="mt-6 mx-auto w-100 align-center">
    <v-row class="d-flex justify-center">
      <v-col cols="12" lg="6" md="12">  
        <v-form ref="formRef" class="px-5 pb-10 border rounded-lg" >

          <v-card-title class="py-5">Registration</v-card-title>

          <v-snackbar
            v-model="snackbar.visible"
            :timeout="3000"
            :location="snackbar.position"
            :color="snackbar.color"
          >
            {{ snackbar.title }}
            <v-icon class="ml-10">{{ snackbar.icon }}</v-icon>
          </v-snackbar>

          <v-text-field
            density="compact"
            variant="outlined"
            v-model="form.name"
            class="my-1"
            :counter="10"
            label="Name"
            required
            :rules="[v => !!v || 'O nome é obrigatório']"
          ></v-text-field>

          <v-text-field
            density="compact"
            variant="outlined"
            v-model="form.description"
            label="Descrição"
            class="my-1"
          ></v-text-field>

          <v-text-field
            density="compact"
            variant="outlined"
            v-model="form.value"
            label="Valor"
            required
            class="my-1"
            type="number"
            :rules="[v => !!v || 'O valor é obrigatório']"
          ></v-text-field>

          <v-select
            density="compact"
            variant="outlined"
            v-model="form.month"
            :items="items"
            label="Mês"
            required
            class="my-1"
            hide-details
          ></v-select>

          <v-radio-group inline hide-details="">
            <template v-slot:label>
              <div><strong>Metodo de pagamento</strong></div>
            </template>
            <v-radio label="Cartão" value="1"></v-radio>
            <v-radio label="Dinheiro" value="2"></v-radio>
            <v-radio label="Pix" value="3"></v-radio>
          </v-radio-group>

          <v-select
            density="compact"
            variant="outlined"
            v-model="form.attached"
            :items="cards"
            item-title="bank"
            item-value="bank"
            label="Card"
            required
            class="my-1"
            hide-details
            :rules="[v => !!v || 'O valor é obrigatório']"
          ></v-select>

          <v-btn
            @click="postReleases"
            class="w-100 primary-color mt-5"
            variant="flat"
            color="#74C27F"
          >
            Send
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
const { postTransactions } = useTransactions()
const { getCards } = useCardStore()

const form = ref({
  name: null,
  description: null,
  value: null,
  month: 'Janeiro',
  type: "Saída",
  attached: null
})

const items = ref([
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
])

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

const cards = ref([])
const formRef = ref(null);

onMounted(async () => {
  await fetchCards()
})

const fetchCards = async () => {
  const card = await getCards()
  cards.value = card
}

const resetFormValues = () => {
  form.value = {
    name: null,
    description: null,
    value: null,
    month: 'Janeiro',
    type: "Saída",
    attached: null
  };
};

const postReleases = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    const card = cards.value.filter(item => item.bank === form.value.attached)
    const payload = {
      ...form.value, attached: card
    }
    
    try {
      await postTransactions(payload);
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
      snackbar.value = {
        visible: true,
        color: "red",
        position: "top",
        title: "Error occurred during registration!",
        icon: "mdi-close-circle"
      }
      console.error(error);
    }
  } else {
    return;
  }

}


</script>