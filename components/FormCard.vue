<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" lg="3" md="12">
        <v-card
          :color="'black'"
          elevation="10"
          width="320"
          height="200"
          class="rounded-lg pa-4 pt-3 d-flex flex-column justify-space-around"
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
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
const { postCard } = useCardStore()

const card = ref({
  name: null,
  number_card: "",
  bank: null,
  type: null,
  flag: null,
  expiration: null,
  code: null
})

const flagCard = ref(null)

const sendCard = () => {
  card.value = {
    ...card.value,
    flag: flagCard
  }
  postCard(card.value)
}

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