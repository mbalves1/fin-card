<template>
  <v-container class="mt-6 sm:mx-auto w-100 align-center">
    <div class="flex justify-between">
      <v-btn variant="text" class="text-green" @click="registerCategory = !registerCategory">
        <div class="capitalize items-center flex">
          <span class="px-2">Adicionar Categoria</span>
          <v-icon class="mr-2">{{registerCategory ? 'mdi-minus-circle-outline' : 'mdi-plus-circle-outline' }}</v-icon>
        </div>
      </v-btn>
  
      <v-icon v-if="hasCloseButton" class="cursor-pointer" @click="closeReleaseModal">mdi-close-circle-outline</v-icon>
    </div>

    <v-row class="d-flex justify-center">
      <v-col v-if="registerCategory" cols="12" lg="3" md="12">
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
      <v-col cols="12" lg="6" md="12">
        <v-form ref="formRef" class="pb-10 rounded-lg" >

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

          <v-radio-group class="py-2" v-model="form.type" inline hide-details="">
            <v-radio label="Saída" value="Saída"></v-radio>
            <v-radio label="Entrada" value="Entrada"></v-radio>
          </v-radio-group>

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
            v-model="form.attached"
            :items="cards"
            item-title="bank"
            item-value="bank"
            label="Banco"
            required
            class="my-1"
            :rules="[v => !!v || 'O valor é obrigatório']"
          ></v-select>

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

          <v-select
            density="compact"
            variant="outlined"
            v-model="form.month"
            :items="items"
            label="Mês"
            required
            class="my-1"
          ></v-select>

          <v-select
            density="compact"
            variant="outlined"
            v-model="form.category"
            :items="categorys"
            item-title="categoryname"
            item-value="category"
            label="Categoria"
            required
            class="my-1"
          ></v-select>

          <v-radio-group v-model="form.method_payment" inline hide-details="">
            <v-radio label="Cartão" value="1"></v-radio>
            <v-radio label="Dinheiro" value="2"></v-radio>
            <v-radio label="Pix" value="3"></v-radio>
          </v-radio-group>

          <v-btn
            @click="postReleases"
            class="w-100 primary-color mt-5"
            variant="flat"
            color="#74C27F"
            :loading="loading"
          >
            Salvar
          </v-btn>
        </v-form>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
const { postTransactions } = useTransactions()
const { getCards } = useCardStore()
const { postNewCategory, getAllCategory } = useCategory()

defineProps({
  hasCloseButton: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['closeModal', 'fetchTransactions'])

const form = ref({
  name: null,
  description: null,
  value: null,
  installment: null,
  month: 'Janeiro',
  type: "Saída",
  method_payment: null,
  attached: null,
  category: null
})

const categoryField = ref(null)

const items = useMonths()

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

onMounted(async () => {
  await fetchCards()
})

const fetchCards = async () => {
  const card = await getCards()
  const category = await getAllCategory()
  cards.value = card
  categorys.value = category
}

const resetFormValues = () => {
  form.value = {
    name: null,
    description: null,
    value: null,
    installment: null,
    month: 'Janeiro',
    type: "Saída",
    attached: null
  };
};

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

const postReleases = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    loading.value = true
    const card = cards.value.filter(item => item.bank === form.value.attached)
    const category = categorys.value.filter(item => item.categoryname === form.value.category)
    const installment = Number(form.value.installment) || 1
    const installments = Array.from({ length: installment }, (_, i) => i + 1);
    const indexMonth = itemsMonth.value.indexOf(form.value.month)

    try {
      let payload
      if (cardType.value === 'Crédito') {
        installments.map(i => {
          payload = {
            ...form.value,
            attached: card,
            category: category,
            installment: i,
            month: itemsMonth.value[[(indexMonth + i) % 12]],
            value: form.value.value / installment
          }
          postTransactions(payload);
        })
      } else {
        payload = {
          ...form.value,
          attached: card,
          category: category,
          installment: Number(form.value.installment) || 1,
          month: form.value.month,
          value: form.value.value
        }
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
  } else {
    return;
  }
}

const closeReleaseModal = () => {
  emit('closeModal', false)
}


</script>