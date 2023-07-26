<template>
  <v-container class=" mt-6">
    <v-row class="wrapper rounded-xl">
      <v-col class="pa-5">
        <v-sheet class="d-flex px-5" style="">
          <v-sheet class="me-auto">
            <p><strong>Total balance</strong></p>
            <h2 class="ml-5">{{ formatCurrency(balance) }}</h2>
            <p class="fs-10">Number of financial postings {{ len }}</p>
          </v-sheet>
          <v-sheet class="mx-2">
            <h3>In</h3>
            <p>30</p>
          </v-sheet>
          <v-sheet class="mx-2">
            <h3>Out</h3>
            <p>30</p>
          </v-sheet>
        </v-sheet>

        <v-divider class="mt-5 mb-1"></v-divider>

        <v-sheet class="wrapper--list">
          <ListRelease
            @total="totalBalance"
            @releaseLenght="releaseLenght">
          </ListRelease>

          <!-- <TableRelease></TableRelease> -->
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="mt-6">
      <v-col class="wrapper rounded-xl mt-6 mr-6 pa-5">
        <div>
          <v-sheet class="d-flex justify-space-between">
            <h3 class="ml-3">Dashboard</h3>
            <v-icon>mdi-arrow-bottom-left</v-icon>
          </v-sheet>
          <v-divider class="my-2 mb-5"></v-divider>
          <div>
            <DonutChart :data="chartDataIn" :options="chartOptions" class="doughnut" ></DonutChart>
          </div>
        </div>
      </v-col>
      <v-col class="wrapper rounded-xl mt-6">
        ola
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

export default {
  data: () => ({
    textfield: null,
    model: true
  }),
  setup() {
    const store = useCounterStore()
    const balance = ref(0);
    const len = ref(0);

    const totalBalance = (valor) => balance.value = valor

    const releaseLenght = (valor) => len.value = valor

    const releasesOut = ref([]);
    const releasesIn = ref([]);

    onMounted(async () => {
      await store.getReleases();
      releasesOut.value = store.release.filter(rel => rel.type === 'Saída');
      releasesIn.value = store.release.filter(rel => rel.type === 'Entrada');
    });

    const chartData = computed(() => {
      return {
        labels: releasesOut.value.map(rel => rel.name),
        datasets: [
          {
            backgroundColor: ['#943021', '#C7402C', '#943021', '#D07A6C', '#471710', '#943021'],
            data: releasesOut.value.map(rel => rel.value)
          }
        ]
      };
    });

    const chartDataIn = computed(() => {
      return {
        labels: releasesIn.value.map(rel => rel.name),
        datasets: [
          {
            backgroundColor: ['#D8F5B5', '#536955', '#336939', '#8FB593', '#B9E9BF', '#74EC82'],
            data: releasesIn.value.map(rel => rel.value)
          }
        ]
      };
    });
    

    const chartOptions = computed(() => {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              usePointStyle: true
            }
          }
        }
      };
    });

    return { totalBalance, balance, releaseLenght, len, chartData, chartOptions, chartDataIn }
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  background-color: white;
  &--list {
    height: 350px;
    overflow-y: scroll;
  }
}
</style>