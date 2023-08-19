<template>
  <v-card :width="size ? '100%' : '500'" max-width="500" height="auto" class="pa-3 px-md-5 ml-auto">
    <div class="d-flex flex-row-reverse">
      <v-icon @click="close">mdi-close-circle-outline</v-icon>
    </div>
    <div class="overflow-y-auto py-1">
      <v-menu>
        <template v-slot:activator="{ props }">
          {{ color }}
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
                <v-img v-if="flagCard === 'Mastercard' || flagCard === 'Visa'" :src="`/img/${flagCard}.svg`" alt="" width="40"/>
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
      <form>
        <v-text-title>Cartão</v-text-title>
  
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
          v-model="card.number_card"
          :rules="[(v) => v.length < 17 || 'Number invalid']"
          type="number"
          label="Numero do cartão"
          required
          class="my-1"
        ></v-text-field>
  
        <v-text-field
          density="compact"
          variant="outlined"
          v-model="card.code"
          label="Code"
          required
          class="my-1"
          type="number"
          :rules="[v => !!v || 'O valor é obrigatório']"
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
  
        <v-btn
          @click="sendCard"
        >
          Send
        </v-btn>
      </form>
    </div>
  </v-card>
</template>
<script setup>
const { postCard, colorState } = useCardStore()
const emit = defineEmits()

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

const openMenu = ref(false)

const flagCard = ref(null)

const sendCard = () => {
  card.value = {
    ...card.value,
    flag: flagCard,
    color: color.value
  }
  postCard(card.value)
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

watch(
  () => card.value.number_card,
  (numberCard) => {
    const cardNumberStr = Number(numberCard)
    const firstDigit = parseInt(cardNumberStr.toString()[0]);
    const firstTwoDigits = parseInt(cardNumberStr.toString().substring(0, 2));
    const firstFourDigits = parseInt(cardNumberStr.toString().substring(0, 2));

  if (firstDigit === 4) {
    return flagCard.value = 'Visa';
    } else if ([51, 52, 53, 54, 55].includes(firstTwoDigits)) {
      return flagCard.value = 'Mastercard';
    } else if ([36, 38].includes(firstTwoDigits)) {
      return flagCard.value = 'Diners Club';
    } else if ([6011, 65].includes(firstFourDigits)) {
      return flagCard.value = 'Discover';
    } else if (firstTwoDigits === 65) {
      return flagCard.value = 'JCB';
    } else if ([34, 37].includes(firstTwoDigits)) {
      return flagCard.value = 'American Express';
    } else {
      return flagCard.value = card.type;
    }
  }
)
</script>