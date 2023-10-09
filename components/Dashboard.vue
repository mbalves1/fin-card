<template>
  <div class="mt-6 mx-auto w-100 ">
    <div class="py-10 ml-10 text-lg sm:text-3xl mx-auto flex justify-start">Dashboard</div>
    <v-divider class="mb-10"></v-divider>
    <v-container>
      <v-row>
        <v-col>
          <div class=" bg-fincardsecondary border rounded-lg pa-10">
            <div class="font-bold text-2xl text-center">Transações por mês</div>
            <div v-if="releasesOut" class="mt-10">
              <BarChart :data="chartDataBar" :options="chartOptions" style="height: 300px"></BarChart>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6">
          <div class="border rounded-lg pa-10 bg-fincardsecondary">
            <div class="font-bold">Transações por cartão</div>
            <div v-if="releasesIn">
              <DoughnutChart :data="chartData" :options="chartOptionsDoughnut" class="doughnut" ></DoughnutChart>
            </div>
          </div>
        </v-col>
        <v-col md="6">
          <div class="border rounded-lg pa-10 bg-fincardsecondary">
            <div class="font-bold text-center">Transações por mês</div>
            <LineChart :data="chartDataBar" :options="chartOptions"></LineChart>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup>
  const releasesOut = ref([]);
  const releasesIn = ref([]);
  const { getTransactions, transactions } = useTransactions()
  const data = ref()

  const page = ref({
    page: 1,
    perPage: 1000
  })

  onMounted(async () => {
    try {
      await fetchData()
    } catch (error) {
      console.error(error)
    }
  });

  const fetchData = async () => {
    try {
      const transations = await getTransactions(page.value)
      data.value = await transations.transactions

      releasesOut.value = await data.value.filter(rel => rel.type === 'Saída');
      releasesIn.value = await data.value.filter(rel => rel.type === 'Entrada');
    } catch (error) {
      console.error(error)
    }
  }

  const chartData = computed(() => {
    const releases = releasesOut.value;

    const sumBank = {};
    const colorsCard = {}
    
    for (const objeto of releases) {
      const { value, attached } = objeto;

      for (const attachedObj of attached) {
        const { bank, color } = attachedObj;

        if (sumBank[bank] === undefined) {
          sumBank[bank] = 0;
          colorsCard[bank] = color;
        }

        sumBank[bank] += value;
      }
    }

    const labels = Object.keys(sumBank);
    const backgroundColors = labels.map(label => colorsCard[label]);
    return {
      labels: Object.keys(sumBank),
      datasets: [
        {
          backgroundColor: backgroundColors,
          data: Object.values(sumBank)
        }
      ]
    }
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

  const chartOptionsDoughnut = computed(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'left',
          labels: {
            usePointStyle: true
          }
        }
      }
    };
  });

  const chartDataBar = computed(() => {
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
</script>
<style scoped>
.doughnut {
  height: 200px !important;
}
</style>