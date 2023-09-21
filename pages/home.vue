<template>
  <v-container class="mt-6 mx-auto w-100">
    <v-row class="wrapper rounded-xl flex-column flex-sm-row">
      <v-col cols="12" md="8" sm="12">
        <v-sheet class="me-auto border rounded pa-3" style="background: #f2f2f2">
          <p><strong>Total balance</strong></p>
          <h2 class="ml-5">{{ totalBalance(releasesOut, releasesIn) || "R$ 00,00" }}</h2>
          <v-sheet class="d-flex justify-space-between align-center" style="background: #f2f2f2">
            <h3 class="ml-3"></h3>
            <p class="fs-10" >Number of financial postings {{ size || 0 }}</p>
            <!-- <v-icon>mdi-arrow-bottom-left</v-icon> -->
          </v-sheet>
        </v-sheet>
        <div>
          <v-divider class="my-2 mb-5"></v-divider>

          <v-row>
            <v-col>
              <v-card variant="flat" class="border pb-3">
                <div class="flex justify-between items-center text-sm">
                  <div class="text-lg font-bold pt-3 px-5">Janeiro</div>
                  <div class="pr-5 mt-3 text-xs font-bold">{{reduceMonthValue('Janeiro')}}</div>
                </div>
                <v-divider class="mx-4 my-2"></v-divider>
                <div v-for="(release, cx) in filteredByMonth('Janeiro')" :key="cx" class="px-6 py-1 text-sm">
                  <div class="flex justify-between">
                    <div>
                      <v-icon :style="{ fontSize: '14px' }" :class="release.type === 'Entrada' ? 'text-green':'text-red'" class="mr-1 text-lg">
                        {{release.type === 'Entrada' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-right'}}
                      </v-icon>
                        <span>{{ release.name }}</span>
                    </div>
                    <div>{{ formatCurrency(release.value) }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col>
              <v-card variant="flat" class="border pb-3">
                <div class="flex justify-between items-center text-sm">
                  <div class="text-lg font-bold pt-3 px-5">Fevereiro</div>
                  <div class="pr-5 mt-3 text-xs font-bold">{{reduceMonthValue('Fevereiro')}}</div>
                </div>
                <v-divider class="mx-4 my-2"></v-divider>
                <div v-for="(release, cx) in filteredByMonth('Fevereiro')" :key="cx" class="px-6 py-1 text-sm">
                  <div class="flex justify-between">
                    <div>
                      <v-icon :style="{ fontSize: '14px' }" :class="release.type === 'Entrada' ? 'text-green':'text-red'" class="mr-1 text-lg">
                        {{release.type === 'Entrada' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-right'}}
                      </v-icon>
                      <span>{{ release.name }}</span>
                    </div>
                    <div>{{ formatCurrency(release.value) }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col>
              <v-card variant="flat" class="border pb-3">
                <div class="flex justify-between items-center text-sm">
                  <div class="text-lg font-bold pt-3 px-5">Março</div>
                  <div class="pr-5 mt-3 text-xs font-bold">{{reduceMonthValue('Março')}}</div>
                </div>
                <v-divider class="mx-4 my-2"></v-divider>
                <div v-for="(release, cx) in filteredByMonth('Março')" :key="cx" class="px-6 py-1 text-sm">
                  <div class="flex justify-between">
                    <div>
                      <v-icon :style="{ fontSize: '14px' }" :class="release.type === 'Entrada' ? 'text-green':'text-red'" class="mr-1 text-lg">
                        {{release.type === 'Entrada' ? 'mdi-arrow-top-right' : 'mdi-arrow-bottom-right'}}
                      </v-icon>
                      <span>{{ release.name }}</span>
                    </div>
                    <div>{{ formatCurrency(release.value) }}</div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" lg="4" sm="12" class="px-3 d-flex flex-column align-center">
        <v-sheet class="text-h4 d-flex px-5 py-7 align-center border rounded" style="background: #f2f2f2">
          <v-chip>{{ cardsNumber }}</v-chip>
          <v-title class="mx-2 font-bold">Credits cards</v-title>
          <!-- <span class="fs-10">{{ cardsNumber }} cards</span> -->
          <v-icon size="20" @click="openModalToRegister">mdi-plus-circle-outline</v-icon>
        </v-sheet>
        <v-sheet class="mx-10">
          <div class="cardlist sm:ml-0">
            <ListCards :data="cards" @openModalCard="openModalToRegister" class=""></ListCards>
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

  </v-container>
  <v-row class="mt-10 sm:mt-6">
    <v-col class="">
      <v-sheet class="text-h4 px-5 py-0 pb-6 font-bold sm:py-8 sm:pb-0 sm:mx-auto">
        <div class="text-center">
          <span>Transactions</span>
        </div>
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

      totalBalance(releasesOut.value, releasesIn.value)
      releasesOut.value = await data.value.filter(rel => rel.type === 'Saída');
      releasesIn.value = await data.value.filter(rel => rel.type === 'Entrada');
    } catch (error) {
      console.error(error)
    }
  }

  const totalBalance = (expanse, revenue) => {
    const out = expanse.map(i => i.value)
    const inRel = revenue.map(i => i.value)

    size.value = out.length + inRel.length

    const total = (inRel.reduce((accumulator, currentValue) => accumulator + currentValue, 0) - out.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    return formatCurrency(total)
  }

  const openModal = ref(false);

  const openModalToRegister = (event) => {
    openModal.value = event
  };


  const filteredByMonth = (month) => {
    if (!data.value) {
      return [];
    }
    const releases = data.value.filter(item => item.month === month && (item.type === 'Entrada' || item.type === 'Saída'));
    
    return releases
  }

  const reduceMonthValue = (month) => {
    const expense = releasesOut.value.filter(item => item.month === month)
    const revenues = releasesIn.value.filter(item => item.month === month)
    const total = totalBalance(expense, revenues)
    return total
  }
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

@media screen and (max-width: 600px) {
  .cardlist {
    height: auto;
    width: 500px;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    max-width: 375px
  }
}
</style>