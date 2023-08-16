<template>
  <v-container class="mt-6 mx-auto">
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

          <div v-if="releasesIn">
            <BarChart :data="chartDataIn" :options="chartOptions" class="doughnut" ></BarChart>
          </div>
          <div v-if="releasesOut" class="mt-10">
            <BarChart :data="chartData" :options="chartOptions" class="doughnut" ></BarChart>
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" sm="12" class="pa-5">
        <v-sheet class="text-h4 d-flex px-5" style="">
          Credits cards
        </v-sheet>
        <v-sheet class="wrapper d-sm-flex d-xs-flex flex-lg-column">
          <ListCards :data="cards" @openModalCard="teste"></ListCards>
          <div class="d-flex justify-end">
            <v-dialog v-model="openModal" location-strategy="connected"
            class="d-flex justify-end">
              <ModalRegisterCard class="d-flex justify-end"></ModalRegisterCard>
            </v-dialog>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col class="wrapper rounded-xl mt-6 mr-6 pa-5">
        <v-sheet class="text-h4 d-flex px-5" style="">
          Transactions
        </v-sheet>
        <ListRelease
          @total="totalBalance"
          @releaseLenght="releaseLenght">
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

  const releasesOut = ref([]);
  const releasesIn = ref([]);

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
      return {
        labels: releasesOut.value.map(rel => rel.name),
        datasets: [
          {
            backgroundColor: ['#943021', '#C7402C', '#943021', '#D07A6C', '#471710', '#943021'],
            data: releasesOut.value.map(rel => rel.value),
            borderRadius: 10
          },
        ]
      };
    });

    const chartDataIn = computed(() => {
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

    const teste = (event) => {
      openModal.value = event
      console.log(event);
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
</style>