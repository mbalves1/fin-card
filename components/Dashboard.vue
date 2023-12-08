<template>
  <loading-global
    :initialLoading="initialLoading"
  ></loading-global>

  <div class="mx-auto w-full">
    <div
      class="py-6 sm:py-10 pl-10 text-lg sm:text-3xl mx-auto flex justify-between items-center bg-fincard sm:bg-transparent">
      <div class="flex items-center">
        <v-icon class="mr-3 sm:visible">mdi-finance</v-icon>
        <div class="">Dashboard</div>
      </div>
      <div class="text-xs sm:text-sm mr-4 sm:mr-20">
        <v-menu
          v-model="menuCategory"
          :close-on-content-click="false"
          location="bottom center">
          <template v-slot:activator="{ props }">
            <div class="flex gap-3">
              <v-icon v-bind="props">mdi-cog-outline</v-icon>
              <div>Configurações</div>
            </div>
            </template>
            <v-card min-width="300">
              <p class="text-sm pa-2">Mês</p>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-checkbox
                    class="mt-2"
                    label="Mostrar highlight"
                    color="#74C27F"
                    density="compact"
                    hide-details
                    v-model="highlightShow"></v-checkbox>

                  <v-checkbox
                    label="Mostrar mês"
                    hide-details
                    density="compact"
                    color="#74C27F"
                    v-model="monthShow"></v-checkbox>
                  
                  <v-select
                    v-if="monthShow"
                    v-model="selectedMonth"
                    :items="months"
                    chips
                    density="compact"
                    variant="outlined"
                    item-value="value"
                    item-title="name"
                    :return-object="false"
                    hide-details
                  ></v-select>
                    
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </div>
    <v-divider class="mb-1"></v-divider>
    <v-container>
      <v-slide-y-reverse-transition>
        <v-row v-if="highlightShow">
          <v-col>
            <div class="border bg-fincardsecondary rounded-lg pa-5 flex gap-1 overflow-scroll sm:no-overflow">
              <v-col v-for="(highlight, hx) in highlights" :key="hx">
                <div class="flex border rounded-lg bg-white pa-4 items-center">
                  <div class="text-xs my-1">
                    <v-icon class="mr-4 bg-fincardsecondary pa-5 rounded-xl">{{ highlight.icon }}</v-icon>
                  </div>
  
                  <div class="flex flex-col text-xs sm:text-sm">
                    <div>{{ highlight.title }}</div>
                    <div class="font-bold mr-2 flex">{{ highlight.item }}:
                      <div class="font-bold ml-2">{{ highlight.valueRef }}</div>
                    </div>
                  </div>
                </div>
              </v-col>
            </div>
          </v-col>
        </v-row>
      </v-slide-y-reverse-transition>
      <v-row>
        <v-col cols="12" lg="8">
          <div class=" bg-fincardsecondary border rounded-lg pa-10">
            <div class="font-bold text-2xl text-center">Despesa anual</div>
            <div v-if="releasesOut" class="mt-10">
              <BarChart :data="chartDataBar" :options="chartOptions" class="max-h-200px"></BarChart>
            </div>
          </div>
        </v-col>
        <v-col cols="12" lg="4" md="6">
          <div class="border rounded-lg px-10 pb-10 bg-fincardsecondary">
            <div class="font-bold py-5">Transações por cartão</div>
            <div v-if="releasesIn">
              <DoughnutChart :data="chartData" :options="chartOptionsDoughnut" class="doughnut h-200px" ></DoughnutChart>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-slide-y-reverse-transition>
        <v-row v-if="monthShow">
          <v-col cols="12" lg="4" md="6">
            <div class="border rounded-lg px-10 pb-10 bg-fincardsecondary">
              <div class="font-bold flex justify-between items-center">
                <div class="py-5 text-sm">Transações por cartão ({{ selectedMonth }})</div>
              </div>
              <div v-if="releasesIn">
                <DoughnutChart :data="chartDataCards" :options="chartOptionsDoughnut" class="" ></DoughnutChart>
              </div>
            </div>
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <div class="border rounded-lg px-10 pb-10 bg-fincardsecondary">
              <div class="font-bold flex justify-between items-center">
                <div class="py-5 text-sm">Transações por mês ({{ selectedMonth }})</div>
              </div>
              <BarChart class="max-h-200px" :data="chartDataCompare" :options="chartOptions"></BarChart>
            </div>
          </v-col>
          <v-col cols="12" lg="4" md="6">
            <div class="border rounded-lg px-10 pb-10 bg-fincardsecondary">
              <div class="font-bold flex justify-between items-center">
                <div class="py-5 text-sm">Transações por categoria ({{ selectedMonth }})</div>
              </div>
              <div v-if="releasesIn">
                <DoughnutChart :data="chartDataCategoy" :options="chartOptionsDoughnut" class="" ></DoughnutChart>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-slide-y-reverse-transition>
    </v-container>
  </div>
</template>
<script setup>
  const releasesOut = ref([]);
  const releasesIn = ref([]);
  const { getTransactions, transactions } = useTransactions()
  const data = ref()
  const selectedMonth = ref('Janeiro')
  const months = useMonths()
  const monthWithRef = useMonthsRef()
  const menuCategory = ref(false)
  const menuCompare = ref(false)
  const menuCard = ref(false)
  const resultCurrentMonthCategory = ref({})
  const totalBankExpenses = ref(null)

  const valueRefHighlightExpense = ref(null)
  const valueRefHighlightCategory = ref(null)
  const valueRefHighlightCard = ref(null)

  const initialLoading = ref(false)

  // variables to show options
  const highlightShow = ref(true)
  const monthShow = ref(true)

  const highlights = ref([
    { icon: 'mdi-chart-line', title: 'Mês de maior despesa', item: 'Mês', valueRef: valueRefHighlightExpense},
    { icon: 'mdi-tag-outline', title: 'Maior despesa por categoria', item: 'Categoria', valueRef: valueRefHighlightCategory},
    { icon: 'mdi-credit-card', title: 'Cartão mais usado', item: 'Cartão', valueRef: valueRefHighlightCard},
  ])

  const page = ref({
    page: 1,
    perPage: 1000
  })

  onMounted(async () => {
    initialLoading.value = true
    try {
      await fetchData()
      initialLoading.value = false
    } catch (error) {
      initialLoading.value = false
      console.error(error)
    }
  });

  const fetchData = async () => {
    try {
      const transations = await getTransactions(page.value)
      data.value = await transations.transactions

      releasesOut.value = await data.value.filter(rel => rel.type === 'Saída');
      releasesIn.value = await data.value.filter(rel => rel.type === 'Entrada');
      highExpenseByMonth()
      highExpenseByCategory()
      higherExpensesByCard()
    } catch (error) {
      console.error(error)
    }
  }

  const chartData = computed(() => {
    const releases = releasesOut.value;

    const sumBank = {};
    const colorsCard = {}
    
    releases.forEach((objeto) => {
      const { value, attached } = objeto;

      attached.forEach((attachedObj) => {
        const { bank, color } = attachedObj;

        if (sumBank[bank] === undefined) {
          sumBank[bank] = 0;
          colorsCard[bank] = color;
        }

        sumBank[bank] += value;
      });
    });

    totalBankExpenses.value = sumBank
    const labels = Object.keys(sumBank);

    const backgroundColors = labels.map(label => colorsCard[label]);
    return {
      labels,
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
      labels: months.value,
      datasets: [
        {
          backgroundColor: ['#943021', '#C7402C', '#943021', '#D07A6C', '#471710', '#943021'],
          data: filledValues,
          borderRadius: 5
        }
      ]
    };
  });

  const chartDataCategoy = computed(() => {
    const releases = releasesOut.value;
    const selectedMonthRelease = releases.filter(({month}) => month === selectedMonth.value)

    let categoryLabel = {};

    selectedMonthRelease.forEach((obj) => {
      const { value, category } = obj

      category.forEach((valueCateg) => {
        const {categoryname} = valueCateg
        if (categoryLabel[categoryname] === undefined) {
          categoryLabel[categoryname] = 0;
        }

        categoryLabel[categoryname] += value
      })
    })

    const labels = Object.keys(categoryLabel);
    const dataSet = Object.values(categoryLabel);
    resultCurrentMonthCategory.value = categoryLabel

    return {
      labels,
      datasets: [
        {
          backgroundColor: ['#943021', '#D07A6C', '#471710', '#D07A6C', '#471710', '#D07A6C'],
          data: dataSet
        }
      ]
    };
  });

  const chartDataCompare = computed(() => {
    const relOut = releasesOut.value;
    const relIn = releasesIn.value;
    const selectedMonthRelOut = relOut.filter(({month}) => month === selectedMonth.value)
    const selectedMonthRelIn = relIn.filter(({month}) => month === selectedMonth.value)

    const sumOut = selectedMonthRelOut.map((rel) => rel.value).reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    const sumIn = selectedMonthRelIn.map((rel) => rel.value).reduce((prev, cur) => {
      return prev + cur;
    }, 0);

    return {
      labels: ["Despesas", "Receitas"],
      datasets: [
        {
          backgroundColor: ['#943021', '#74C27F'],
          data: [sumOut, sumIn],
          borderRadius: 5
        }
      ]
    };
  });

  const chartDataCards = computed(() => {
    const releases = releasesOut.value.filter(({month}) => month === selectedMonth.value)

    const sumBank = {};
    const colorsCard = {}
    
    releases.forEach((objeto) => {
      const { value, attached } = objeto;

      attached.forEach((attachedObj) => {
        const { bank, color } = attachedObj;

        if (sumBank[bank] === undefined) {
          sumBank[bank] = 0;
          colorsCard[bank] = color;
        }

        sumBank[bank] += value;
      });
    });

    const labels = Object.keys(sumBank);
    const backgroundColors = labels.map(label => colorsCard[label]);
    return {
      labels,
      datasets: [
        {
          backgroundColor: backgroundColors,
          data: Object.values(sumBank)
        }
      ]
    }
  });

  const highExpenseByMonth = () => {
    const expenses = chartDataBar
    const { datasets } = expenses.value
    const { data } = datasets[0]
    const higher = Math.max(...data);
    const idx = data.indexOf(higher);
    monthWithRef.value
    const month = Object.entries(monthWithRef.value).find(([key, value]) => value === idx)
    valueRefHighlightExpense.value = month[0]
    return month[0]
  }

  const getHighestValue = (data, valueRef) => {
    const higherValue = Math.max(...Object.values(data));
    const higherCategory = Object.keys(data).find(key => data[key] === higherValue);
    valueRef.value = higherCategory;
  };

  const highExpenseByCategory = () => {
    getHighestValue(resultCurrentMonthCategory.value, valueRefHighlightCategory);
  };

  const higherExpensesByCard = () => {
    getHighestValue(totalBankExpenses.value, valueRefHighlightCard);
  };

</script>
<style scoped>
.doughnut {
  height: 200px !important;
}
</style>