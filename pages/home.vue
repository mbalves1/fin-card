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

          <!-- <div v-if="releasesIn">
            <BarChart :data="chartDataCard" :options="chartOptions" class="doughnut" ></BarChart>
          </div> -->
          <div v-if="releasesOut" class="mt-10">
            <BarChart :data="chartData" :options="chartOptions" style="height: 300px"></BarChart>
          </div>
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
          <div class="cardlist">
            <ListCards :data="cards" @openModalCard="openModalToRegister" class="ml-10"></ListCards>
          </div>
          <div class="">
            <v-dialog v-model="openModal"
            class="">
              <ModalRegisterCard @closeModal="openModalToRegister" class="d-flex justify-end"></ModalRegisterCard>
            </v-dialog>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col class="wrapper rounded-xl mt-6 pa-5">
        <v-sheet class="text-h4 d-flex px-5" style="">
          Transactions
        </v-sheet>
        <ListRelease
          :data="data">
        </ListRelease>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

  const { getTransactions, transactions } = useTransactions()
  const { getCards } = useCardStore()

  const data = ref()
  const size = ref(0);
  const cards = ref(null)
  const cardsNumber = ref(0)

  const releasesOut = ref([]);
  const releasesIn = ref([]);

  // const cardsNumber = computed(() => cards?.value.length)

  onMounted(async () => {
    try {
      await fetchData()
    } catch (error) {
      console.error(error)
    }
  });
  
  const fetchData = async () => {
    try {
      const transations = await getTransactions()
      const fecthCards = await getCards()
      data.value = await transations
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

  const chartData = computed(() => {

    const releases = releasesOut.value;
    const filledValues = Array(12).fill(0);
    const monthMap = {
      "Janeiro": 0, "Fevereiro": 1, "Março": 2, "Abril": 3, "Maio": 4, "Junho": 5,
      "Julho": 6, "Agosto": 7, "Setembro": 8, "Outubro": 9, "Novembro": 10, "Dezembro": 11
    };

    releases.forEach(rel => {
      const monthIndex = monthMap[rel.month];
      filledValues[monthIndex] += rel.value;
    });
    
    return {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [
        {
          backgroundColor: ['#943021', '#C7402C', '#943021', '#D07A6C', '#471710', '#943021'],
          data: filledValues,
          borderRadius: 5
        }
      ]
    };
  });

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

    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: false,
          filler: {
            propagate: false
          },
          // legend: {
            //   position: 'right',
            //   labels: {
              //     usePointStyle: true
              //   }
              // }
        },
        scales: {
          y: {
            grid: {
              display: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
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
  height: 400px;
  overflow-y: scroll;
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