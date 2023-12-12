<template>
  <div>
  <UpdateHome
    :welcome="welcome"
  >
  </UpdateHome>

  <v-dialog v-model="openModalRelease">
    <div class="flex items-center justify-center">
      <v-card class="w-100% sm:w-700px">
        <ModalRegisterRelease
          @closeModal="closeModal"
          @fetchTransactions="updateTransactions"></ModalRegisterRelease>
      </v-card>
    </div>
  </v-dialog>

  <LoadingGlobal
    :initialLoading="initialLoading"
  ></LoadingGlobal>

  <v-container class="mx-auto w-full">
    <v-row class="wrapper rounded-xl flex-column flex-sm-row">
      <v-col cols="12" md="8" sm="12">
        <div class="me-auto border rounded pa-3 mb-5 bg-fincardsecondary">
          <p><strong>Balanço total</strong></p>
          <p class="fs-10 font-italic" >fluxo de caixa anual</p>
          <h2 class="ml-5">{{ totalBalance(releasesOut, releasesIn) || "R$ 00,00" }}</h2>
            <!-- <v-icon>mdi-arrow-bottom-left</v-icon> -->
        </div>
        <div>
          <div class="bg-fincardsecondary pa-3 border rounded">
            <div class="flex items-center justify-between pb-2">
              <div class="text-sm">Overview</div>
              <div class="flex text-xs justify-end items-start cursor-pointer">
                <v-icon class="mr-2" @click="openModalToRegister(event, true)">mdi-plus-circle-outline</v-icon>
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
                            <span class="text-xs">{{ release.name }}</span>
                        </div>
                        <div class="text-xs">{{ formatCurrency(release.value) }}</div>
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
        <div class="text-h4 d-flex px-5 py-7 align-center border rounded w-full bg-fincardsecondary mb-5 sm:h-102px" style="background: #f2f2f2">
          <sup><v-chip>{{ cardsNumber }}</v-chip></sup>
          <div class="mx-2 font-bold text-xl sm:text-3xl">Cartões</div>
          <v-icon size="20" @click="openModalToRegister">mdi-plus-circle-outline</v-icon>
          <v-menu
            v-model="cardTable"
            :close-on-content-click="false"
            location="bottom right">
            <template v-slot:activator="{ props }">
              <v-icon size="20" class="pl-4" v-bind="props">mdi-cog-outline</v-icon>
            </template>
            <v-card>
              <p class="text-sm pa-2">Cartões cadastrados</p>
              <v-divider></v-divider>
              <v-list v-for="(card, cx) in cards" :key="cx">
                <div class="flex justify-between items-center mx-4">
                  <div class="text-xs font-bold">{{ card.bank }}</div>
                  <div v-if="!loadingRemove">
                    <v-icon
                      class="cursor-pointer"
                      size="15"
                      color="red"
                      @click="deleteCard(card)"
                    >mdi-delete</v-icon>
                  </div>
                  <div v-else>
                    <v-progress-circular
                      size="15"
                      model-value="20"
                      indeterminate
                    ></v-progress-circular>
                  </div>
                </div>
              </v-list>
            </v-card>
          </v-menu>
        </div>
        <div class="w-full bg-fincardsecondary">
          <div class="sm:ml-0">
            <ListCards :data="cards" @openModalCard="openModalToRegister" class=""></ListCards>
          </div>
          <div class="flex justify-center">
            <v-dialog v-model="openModal">
              <ModalRegisterCard
                @closeModal="openModalToRegister"
                @loadingCards="fecthDataCards"
                class="d-flex justify-end"
                :isModal="true"></ModalRegisterCard>
            </v-dialog>
          </div>
        </div>
      </v-col>
    </v-row>

  </v-container>
  <div class="max-w-1200px mx-auto">
    <v-row class="mt-10 sm:mt-6">
      <v-col class="">
        <v-sheet class="text-h4 px-5 py-0 font-bold sm:py-8 sm:pb-0 sm:mx-auto">
          <div class="text-center">
            <span>Transações</span>
            <div class="font-normal text-sm">Últimas 10 transações, para maiores informações acessar página de <RouterLink to="table">tabela</RouterLink></div>
          </div>
        </v-sheet>
  
        <TableReleases
          :hasSpacing="false"
          :hasPagination="false"
          :hasSearch="false"
          :data="data"
        >
        </TableReleases>
      </v-col>
    </v-row>
  </div>
</div>
</template>
<script setup>

  const { getTransactions, transactions } = useTransactions()
  const { getCards, deleteCards } = useCardStore()
  const { getUser } = useUserStore()

  const data = ref()
  const category = ref()
  const size = ref(0);
  const cards = ref(null)
  const cardsNumber = ref(0)

  const welcome = ref(false)
  const initialLoading = ref(false)

  const loadingRemove = ref(false)

  const releasesOut = ref([]);
  const releasesIn = ref([]);

  const page = ref({
    page: 1,
    perPage: 1000
  })

  const menu = ref(false)
  const cardTable = ref(false)
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
    initialLoading.value = true
    try {
      await fetchData()
      await fecthDataCards()
      await fecthUser()
      initialLoading.value = false
    } catch (error) {
      initialLoading.value = false
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

  const fecthDataCards = async () => {
    try {
      const fecthCards = await getCards()
      cards.value = fecthCards
      cardsNumber.value = cards?.value.length 
    } catch (error) {
      console.error(error)
    }
  }
  
  const fetchData = async () => {
    try {
      const transations = await getTransactions(page.value)
      data.value = await transations.transactions

      totalBalance(releasesOut.value, releasesIn.value)
      releasesOut.value = await data.value.filter(rel => rel.type === 'Saída');
      releasesIn.value = await data.value.filter(rel => rel.type === 'Entrada');

      filteredByCategory()
    } catch (error) {
      console.error(error)
    }
  }

  const updateTransactions = async (event) => {
    await fetchData()
  }

  const totalBalance = (expanse, revenue) => {
    const out = expanse.map(i => i.value)
    const inRel = revenue.map(i => i.value)

    size.value = out.length + inRel.length

    const total = (inRel.reduce((accumulator, currentValue) => accumulator + currentValue, 0) - out.reduce((accumulator, currentValue) => accumulator + currentValue, 0));
    return formatCurrency(total)
  }

  const openModal = ref(false);
  const openModalRelease = ref(false);

  const openModalToRegister = (event, params) => {
    if (params) {
      openModalRelease.value = params
    } else {
      openModal.value = event
    }
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

  const closeModal = (event) => openModalRelease.value = event

  const deleteCard = async (card) => {
    const { _id } = card
    loadingRemove.value = true
    try {
      const response = await deleteCards(_id)
      loadingRemove.value = false
      await fecthDataCards()
      return response
    } catch(error) {
      loadingRemove.value = false
      console.error(error)
      snackbar.value = {
        visible: true,
        color: "red",
        position: "top",
        title: "Erro para remover cartão!",
        icon: "mdi-close-circle"
      }
    }
  }
</script>
<style lang="scss">
.wrapper {
  background-color: white;
  &--list {
    height: 400px;
    overflow-y: scroll;
  }
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

.scrollbarView::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

.scrollbarView::-webkit-scrollbar
{
	width: 2px;
  margin-right: 2px;
  height: 8px;
	background-color: #F5F5F5;
}

.scrollbarView::-webkit-scrollbar-thumb
{
	border-radius: 3px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}

</style>