<template>
  <v-container class="mt-6 mx-auto w-100">
    <v-row class="wrapper rounded-xl flex-column flex-sm-row">
      <v-col cols="12" md="8" sm="12">
        <v-sheet class="me-auto">
           <p><strong>Total balance</strong></p>
          <h2 class="ml-5">{{ totalBalance || "R$ 00,00" }}</h2>
        </v-sheet>
        <div>
          <v-sheet class="d-flex justify-space-between align-center">
            <h3 class="ml-3">Dashboard</h3>
            <p class="fs-10">Number of financial postings {{ size || 0 }}</p>
            <!-- <v-icon>mdi-arrow-bottom-left</v-icon> -->
          </v-sheet>
          <v-divider class="my-2 mb-5"></v-divider>

        
        </div>
      </v-col>
      <v-col cols="12" lg="4" sm="12" class="pa-5 d-flex flex-column align-center">
        <v-sheet class="text-h4 d-flex px-5 align-center" style="">
          <v-chip>{{ cardsNumber }}</v-chip>
          <v-title class="mx-2">Credits cards</v-title>
          <!-- <span class="fs-10">{{ cardsNumber }} cards</span> -->
          <v-icon size="20" @click="openModalToRegister">mdi-plus-circle-outline</v-icon>
        </v-sheet>
        <v-sheet class="">
          <div class="cardlist mt-8">
            <ListCards :data="cards" @openModalCard="openModalToRegister" class="ml-10"></ListCards>
          </div>
          <div class="">
            <v-dialog v-model="openModal"
            class="">
              <ModalRegisterCard @closeModal="openModalToRegister" class="d-flex justify-end" :isModal="true"></ModalRegisterCard>
            </v-dialog>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col class="wrapper rounded-xl mt-6 pa-5 mx-auto">
        <v-sheet class="text-h4 d-flex px-5" style="">
          Transactions
        </v-sheet>

        <Table
          :hasSpacing="false"
          :hasPagination="false"
          :hasSearch="false"
          :data="data"
        >
        </Table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

  const { getTransactions, transactions } = useTransactions()
  const { getCards } = useCardStore()
  const { getUser } = useUserStore()

  const data = ref()
  const size = ref(0);
  const cards = ref(null)
  const cardsNumber = ref(0)

  const releasesOut = ref([]);
  const releasesIn = ref([]);

  const page = ref({
    page: 1,
    perPage: 1000
  })

  // const cardsNumber = computed(() => cards?.value.length)

  onMounted(async () => {
    try {
      await fetchData()
      await fecthUser()
    } catch (error) {
      console.error(error)
    }
  });

  const fecthUser = async () => {
    try {
      await getUser()
    } catch (error) {
      console.error(error)
    }
  }
  
  const fetchData = async () => {
    try {
      const fecthCards = await getCards()
      const transations = await getTransactions(page.value)
      data.value = await transations.transactions
      cards.value = fecthCards
      cardsNumber.value = cards?.value.length 

      totalBalance
      releasesOut.value = await data.value.filter(rel => rel.type === 'Saída');
      releasesIn.value = await data.value.filter(rel => rel.type === 'Entrada');
    } catch (error) {
      console.error(error)
    }
  }

  const totalBalance = computed(() => {
    const out = releasesOut.value.map(i => i.value)
    const inRel = releasesIn.value.map(i => i.value)

    size.value = out.length + inRel.length

    const total = (inRel.reduce((accumulator, currentValue) => accumulator + currentValue, 0) - out.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    return formatCurrency(total)
  })



  const chartDataCard = computed(() => {

    return {
      labels: releasesIn.value.map(rel => rel.name),
      datasets: [
        {
          label: 'Entradas',
          backgroundColor: ['#D8F5B5', '#536955', '#336939', '#8FB593', '#B9E9BF', '#74EC82'],
          // backgroundColor: ['#943021', '#C7402C', '#943021', '#D07A6C', '#471710', '#943021'],
          minBarLength: 10,
          fill: 'origin',
          borderRadius: 10,
          data: releasesIn.value.map(rel => rel.value)
        },
      ]
    };
  });



    const openModal = ref(false);

    const openModalToRegister = (event) => {
      openModal.value = event
    };
</script>
<style scoped lang="scss">
.wrapper {
  background-color: white;
  &--list {
    height: 400px;
    overflow-y: scroll;
  }
}

.cardlist {
  height: 500px;
  overflow-y: scroll;
}

.cardlist::-webkit-scrollbar {
  width: 2px; /* largura da barra de rolagem */
  border-radius: 10px;
}

.cardlist::-webkit-scrollbar-thumb {
  background-color: white; /* cor do "polegar" (a parte da barra de rolagem que você arrasta) */
}

.cardlist::-webkit-scrollbar-thumb:hover {
  background-color: white; /* cor do "polegar" ao passar o mouse por cima */
}

.cardlist::-webkit-scrollbar-track {
  background-color: #f2f2f2; /* cor da trilha (fundo da barra de rolagem) */
}

@media screen and (max-width: 600px) {
  .cardlist {
    height: auto;
    width: 500px;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
  }
}
</style>