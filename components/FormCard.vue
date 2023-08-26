<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" lg="6" md="12">
        <modal-register-card :hasCloseButton="false" :isModal="false"></modal-register-card>
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