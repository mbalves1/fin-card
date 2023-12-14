<template>
  <v-dialog v-model="hasCards" persistent>
    <div class="flex justify-center">
      <v-card class="w-500px pa-2" color="#f2f2f2">
        <v-row>
          <v-col>
            <div class="py-2 flex gap-2 items-center">
              <v-icon color="orange">mdi-alert</v-icon>
              <div class="">Cartão não cadastrado!</div>
            </div>
            <div class="bg-white pa-2 rounded">Antes de cadastrar um lançamento, é recomendado castrar um cartão para o lançamento. Pelo cartão fazemos o lançamento do banco.
            </div>
            <div
              class="bg-fincard pa-2 flex border rounded mt-3 cursor-pointer"
              @click="goToCardForm"
            >
              <div>Cadastrar cartão</div>
              <v-icon>mdi-arrow-right</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-dialog>
  <v-card
    class="rounded-lg pa-3"
    style="overflow-y: scroll; height: 100vh;"
  >
    <div class="flex justify-between">
      <v-btn variant="text" class="text-green" @click="registerCategory = !registerCategory">
        <div class="capitalize items-center flex">
          <span class="px-2">Adicionar Categoria</span>
          <v-icon class="mr-2">{{registerCategory ? 'mdi-minus-circle-outline' : 'mdi-plus-circle-outline' }}</v-icon>
        </div>
      </v-btn>
  
      <v-icon v-if="hasCloseButton" class="cursor-pointer" @click="closeReleaseModal">mdi-close-circle-outline</v-icon>
    </div>

    <v-row class="d-flex justify-center px-1 sm:px-10" style="background: white !important;">
      <v-col v-if="registerCategory">
        <v-form>
          <div class="flex items-center">
            <v-icon style="width:10px">mdi-tag-text-outline</v-icon>
            <div class="py-3 pl-2 text-sm">Registro de categorias</div>
          </div>

          <v-text-field
            v-model="categoryField"
            label="Nome da categoria"
            density="compact"
            variant="outlined"
            :rules="[v => !!v || 'Nome da categoria é obrigatório!']"
          ></v-text-field>
          <v-btn class="w-100 primary-color mt-5"
            variant="flat"
            color="#74C27F" @click="postCategory"
            :loading="loadingCategory"
            >Salvar</v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" md="12">
        <v-form ref="formRef" class="pb-10 rounded-lg">

          <div class="text-base py-5">Registro de despesa</div>

          <p v-if="hasCardSelected" class="text-red text-xs">Escolha o banco**</p>
          <ListCards
            :data="cards"
            :modal-release="true"
            @selected-card="selectedAttached"
          ></ListCards>

          <v-snackbar
            v-model="snackbar.visible"
            :timeout="3000"
            :location="snackbar.position"
            :color="snackbar.color"
          >
            {{ snackbar.title }}
            <v-icon class="ml-10">{{ snackbar.icon }}</v-icon>
          </v-snackbar>

          <v-radio-group class="py-2" v-model="form.type" inline hide-details="">
            <v-radio label="Saída" value="Saída"></v-radio>
            <v-radio label="Entrada" value="Entrada"></v-radio>
          </v-radio-group>

          <v-row>
            <v-col cols="12" md="6" sm="12">
              <div class="flex justify-center">
                <div class="flex" style="height: 290px; justify-content: center !important;">
                  <VueDatePicker
                    format="dd/MM/yyyy"
                    class="h-40px"
                    locale="pt-br"
                    inline
                    :enable-time-picker = "false"
                    text-input
                    auto-apply
                    v-model="dateSelected"></VueDatePicker>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="12">
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

              <div class="flex gap-2">
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
      
                <v-text-field
                  density="compact"
                  variant="outlined"
                  v-model="form.installment"
                  label="Parcela"
                  required
                  class="my-1"
                  type="number"
                  :disabled="cardType === 'Débito'"
                ></v-text-field>
              </div>

              <v-combobox
                class="my-1"
                :items="categorys"
                @change="postCategory"
                v-model="categoryField"
                item-title="categoryname"
                item-value="category"
                required
                hint="Para cadastrar uma categoria nova, apenas digite!"
                label="Categoria"
                density="compact"
                variant="outlined"
                :rules="[v => !!v || 'Nome da categoria é obrigatório!']"
              ></v-combobox>

              <v-radio-group v-model="form.method_payment" inline hide-details="">
                <v-radio label="Cartão" value="1"></v-radio>
                <v-radio label="Dinheiro" value="2"></v-radio>
                <v-radio label="Pix" value="3"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>

          <v-btn
            @click="postReleases"
            class="w-100 primary-color mt-5 text-capitalize"
            variant="flat"
            color="#74C27F"
            :loading="loading"
          >
            Salvar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';

const { postTransactions } = useTransactions()
const { getCards, registerFirstCard } = useCardStore()
const { postNewCategory, getAllCategory } = useCategory()

defineProps({
  hasCloseButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeModal', 'fetchTransactions'])

const router = useRouter()

const form = ref({
  name: null,
  description: null,
  value: null,
  installment: null,
  installment_total: null,
  month: 'Janeiro',
  type: "Saída",
  method_payment: null,
  attached: null,
  category: null
})

const categoryField = ref(null)

const dateSelected = ref(null)
const hasCards = ref(false)
const hasCardSelected = ref(false)

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
const categorys = ref([])
const formRef = ref(null);
const loading = ref(false)
const loadingCategory = ref(false)
const registerCategory = ref(false)
const itemsMonth = useMonths()
const monthRef = useMonthsRef()

onMounted(async () => {
  await fetchCards()
})

const fetchCards = async () => {
  const card = await getCards()
  const category = await getAllCategory()
  cards.value = card
  if (card.length === 0) {
    hasCards.value = true
  }
  categorys.value = category
}

const resetFormValues = () => {
  form.value = {
    name: null,
    description: null,
    value: null,
    installment: null,
    installment_total: null,
    month: null,
    type: "Saída",
    attached: null
  };
};

const formatDateSelected = () => {
  const date = dateSelected.value
  const formattedDate = date.toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const month = date.toLocaleDateString("pt-BR", {
    month: "numeric"
  });
  const newMonth = +month - 1
  form.value.month = Object.keys(monthRef.value).find((key) => monthRef.value[key] === newMonth)
  return formattedDate
}

const goToCardForm = () => {
  registerFirstCard('option-2')
  hasCards.value = false
  router.push({ path: '/release-register' }
)}

const cardType =  computed(() => {
  const card = cards.value.filter(card => {
    return card.bank === form.value.attached
  })
  return card[0]?.type
})

const postCategory = async () => {
  loadingCategory.value = true
  if (!categoryField.value) {
    loadingCategory.value = false
    snackbar.value = {
      visible: true,
      color: "red",
      position: "top",
      title: "Error occurred during registration!",
      icon: "mdi-close-circle"
    }
  } else {
    try {
      const response = await postNewCategory({categoryname: categoryField.value})
      const category = await getAllCategory()
      categorys.value = category
      loadingCategory.value = false
      categoryField.value = null
      return response
    } catch (error) {
      console.error('error', error)
    }
  }
}

const selectedAttached = (cardBank) => {
  form.value.attached = cardBank.bank
}

const postReleases = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    loading.value = true
    const card = cards.value.filter(item => item.bank === form.value.attached)
    const installment = Number(form.value.installment) || 1
    const installments = Array.from({ length: installment }, (_, i) => i + 1);
    const transactionDate = formatDateSelected()
    const indexMonth = itemsMonth.value.indexOf(form.value.month)
    if (card.length === 0) {
      loading.value = false
      hasCardSelected.value = true
      return
    } else {
      try {
        hasCardSelected.value = false
        let payload
        
        if (cardType.value === 'Crédito') {
          installments.map(i => {
            payload = {
              ...form.value,
              attached: card,
              category: categoryField.value,
              installment_total: form.value.installment,
              installment: i,
              month: itemsMonth.value[[(indexMonth + i) % 12]],
              transaction_date: transactionDate,
              value: form.value.value / installment
            }
            console.log("payload1", payload)
            postTransactions(payload);
          })
        } else {
          payload = {
            ...form.value,
            attached: card,
            category: categoryField.value,
            installment_total: form.value.installment,
            installment: Number(form.value.installment) || 1,
            transaction_date: transactionDate,
            month: form.value.month,
            value: form.value.value
          }
          console.log("payload2", payload)
          postTransactions(payload);
        }
        emit('fetchTransactions', true)
        form.value = { ...form.value }

        resetFormValues();
        snackbar.value = {
          visible: true,
          color: "#74C27F",
          position: "top",
          title: "Registration completed successfully!",
          icon: "mdi-check-circle"
        }
        loading.value = false
      } catch (error) {
        snackbar.value = {
          visible: true,
          color: "red",
          position: "top",
          title: "Error occurred during registration!",
          icon: "mdi-close-circle"
        }
        console.error(error);
        loading.value = false
      }
    }
  } else {
    return;
  }
}

const closeReleaseModal = () => {
  emit('closeModal', false)
}


</script>