<template>
  <div>
  <v-dialog v-model="welcome">
    <div class="flex justify-center">
      <v-card elevation="10" class="w-500px h-auto overflow-y-auto flex justify-between">
        <v-card-title class="bg-fincard text-center">
        <div class="font-bold">
          Updates
        </div>
        </v-card-title>
        <div class="ma-2">
          <div class="mt-2 ml-5">1.0: Atualizações nas página de tabelas com filtros</div>
          <div class="mt-2 ml-5">1.1: Atualizações nas página de tabelas: deletar transações</div>
          <div class="mt-2 ml-5">1.1: Atualizações nas página de tabelas: deletar editar transações</div>
        </div>
        <v-divider class="mx-5"></v-divider>
        <div class="text-center">
          <v-btn variant="flat" class="border my-3 w-92% mx-2" @click="welcome = !welcome">Fechar</v-btn>
        </div>
      </v-card>
    </div>
  </v-dialog>
  <v-container class="mx-auto w-full">
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

          <div class="bg-fincardsecondary pa-3 border rounded">
            <div class="flex items-center justify-between pb-2">
              <div class="text-sm">Overview</div>
              <div class="flex text-xs justify-end items-start cursor-pointer">
                <v-icon class="mr-2">mdi-plus-circle-outline</v-icon>
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  location="bottom center">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-cog-outline</v-icon>
                  </template>
                  <v-card min-width="300">
                    <p class="text-sm pa-2">Mês</p>
                    <v-divider></v-divider>
                    <v-list>
                      <v-list-item>
                        <v-combobox
                          v-model="monthView"
                          :items="months"
                          multiple
                          chips
                          density="compact"
                          variant="outlined"
                          item-value="value"
                          item-title="name"
                          :return-object="false"
                          hide-details
                        ></v-combobox>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-menu>
              </div>
            </div>
            <div class="flex gap-4 w-full overflow-scroll mb-4">
              <div v-for="(month, mx) in monthView" :key="mx">
                <v-card v-if="reduceMonthValue(month) != 0" variant="flat" class="border pb-3 w-300px sm:w-230px">
                  <div class="flex justify-between items-center text-sm">
                    <div class="text-lg font-bold pt-3 px-5">{{month}}</div>
                    <div class="pr-5 mt-3 text-xs font-bold">{{reduceMonthValue(month)}}</div>
                  </div>
                  <v-divider class="mx-4 my-2"></v-divider>
                  <div class="h-230px overflow-y-auto scrollbar">
                    <div v-for="(release, cx) in filteredByMonth(month)" :key="cx" class="px-6 py-1 text-sm">
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
                  </div>
                </v-card>
              </div>
            </div>
            <v-row>
              <v-col cols="12" sm="12" lg="6">
                <v-card class="border" variant="flat">
                  <div class="flex justify-between items-center text-sm">
                    <div class="text-lg font-bold pt-3 px-5">Bancos</div>
                  </div>
                  <v-divider class="mx-4 my-2"></v-divider>
                  <div class="h-180px overflow-y-auto scrollbar">
                    <div v-for="(card, cx) in cards" :key="cx" class="pb-2">
                      <div class="flex justify-between px-5 text-xs sm:text-base" >
                        <div class="">
                          <v-icon :class="`text-${card.color}`">mdi-credit-card</v-icon>
                          {{ card.bank }}</div>
                          <div>{{ formatCurrency(filteredByBank(card.bank)) }}</div>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="border" variant="flat">
                  <div class="flex justify-between items-center text-sm">
                    <div class="text-lg font-bold pt-3 px-5">Categorias</div>
                  </div>
                  <v-divider class="mx-4 my-2"></v-divider>
                  <div class="h-180px overflow-y-auto scrollbar">
                    <div v-for="(release, rx) in category" :key="rx" class="pb-2">
                      <div class="flex justify-between px-5 text-xs sm:text-base flex-col">
                        <div v-for="(rel, cx) in release.category" :key="cx" class="pb-2 flex justify-between">
                          <div v-if="rel">{{ rel }}</div>
                            <i v-else class="text-grey text-sm">sem categoria</i>
                            <div>{{ formatCurrency(filteredCategoryValue(rel)) }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="4" sm="8" class="px-3 d-flex flex-column align-center items-center">
        <v-sheet class="text-h4 d-flex px-5 py-7 align-center border rounded w-full" style="background: #f2f2f2">
          <v-chip>{{ cardsNumber }}</v-chip>
          <div class="mx-2 font-bold text-xl sm:text-3xl">Credits cards</div>
          <v-icon size="20" @click="openModalToRegister">mdi-plus-circle-outline</v-icon>
        </v-sheet>
        <div class="">
          <div class="cardlist sm:ml-0">
            <ListCards :data="cards" @openModalCard="openModalToRegister" class=""></ListCards>
          </div>
          <div class="flex justify-center">
            <v-dialog v-model="openModal"
            class="">
              <ModalRegisterCard @closeModal="openModalToRegister" class="d-flex justify-end" :isModal="true"></ModalRegisterCard>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>

  </v-container>
  <div class="max-w-1200px mx-auto">
    <v-row class="mt-10 sm:mt-6">
      <v-col class="">
        <v-sheet class="text-h4 px-5 py-0 pb-6 font-bold sm:py-8 sm:pb-0 sm:mx-auto">
          <div class="text-center">
            <span>Transactions</span>
            <div class="font-normal text-sm">Últimas 10 transações, para maiores informações acessar página de <RouterLink to="table">tabela</RouterLink></div>
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
  </div>
</div>
</template>
<script setup>

  const { getTransactions, transactions } = useTransactions()
  const { getCards } = useCardStore()
  const { getUser } = useUserStore()

  const data = ref()
  const category = ref()
  const size = ref(0);
  const cards = ref(null)
  const cardsNumber = ref(0)

  const releasesOut = ref([]);
  const releasesIn = ref([]);

  const page = ref({
    page: 1,
    perPage: 1000
  })

  const welcome = ref(false)
  const menu = ref(false)
  const monthView = ref(['Janeiro', 'Fevereiro', 'Março', 'Abril']) 
  const months = useMonths()

  onMounted(async () => {
    const WELCOME_KEY = 'hasShownWelcome';
    const hasShownWelcome = JSON.parse(localStorage.getItem(WELCOME_KEY))
    if (!hasShownWelcome) {
    // Exibe a mensagem de boas-vindas
    welcome.value = true;
    localStorage.setItem(WELCOME_KEY, JSON.stringify(true));

    setTimeout(() => {
      welcome.value = false;
    }, 4000);
  }
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

      filteredByCategory()
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

  const filteredByBank = (bank) => {
    if (!data.value) {
      return [];
    }
    const releases = data.value.filter(item => item.attached[0].bank === bank)
    return releases.reduce((acc, obj) => acc + obj.value, 0);
  }

  const filteredCategoryValue = (label) => {
    if (!data.value) {
      return [];
    }
    const items = data.value.reduce((prev, cur) => {
      const categoryName = cur.category.map(i => i.categoryname);
      if (!prev[categoryName]) {
        prev[categoryName] = 0;
      }
      prev[categoryName] += cur.value;
      return prev
    }, {});
    return items[label]
  }

  const filteredByCategory = async () => {
    data.value.reduce((prev, cur) => {
      const categoryName = cur.category.map(i => i.categoryname);
      if (!prev[categoryName]) {
        prev[categoryName] = 0;
      }
      prev[categoryName] += cur.value;
      category.value = [{
          category: Object.keys(prev),
          val: Object.values(prev)
        }
      ]
      return prev
    }, {});
  }

  const reduceMonthValue = (month) => {
    const expense = releasesOut.value.filter(item => item.month === month)
    const revenues = releasesIn.value.filter(item => item.month === month)
    return totalBalance(expense, revenues)
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
  height: 660px;
  overflow-y: scroll;
}

.cardlist::-webkit-scrollbar {
  width: 2px; /* largura da barra de rolagem */
  border-radius: 10px;
}

.scrollbar::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.scrollbar::-webkit-scrollbar
{
	width: 2px;
  margin-right: 2px;
	background-color: #F5F5F5;
}

.scrollbar::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

@media screen and (max-width: 600px) {
  .cardlist {
    height: auto;
    width: 500px;
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    max-width: 345px
  }
}
</style>