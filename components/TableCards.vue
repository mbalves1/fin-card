<template>
  <v-row class="d-flex justify-center mt-0 sm:mt-6">
    <v-col cols="12" lg="10" md="12" class="d-flex justify-space-between flex-column">
      <div>
        <table>
          <thead>
            <tr>
              <th class="text-sm font-bold">Nome</th>
              <th class="text-sm font-bold">Banco</th>
              <th class="text-sm font-bold">Bandeira</th>
              <th class="text-sm font-bold">Tipo</th>
              <th class="text-sm font-bold">Número</th>
              <th class="text-sm font-bold flex cursor-pointer" style="width: 50px;">
                Vencimento
                <v-icon size="13">mdi-alert-circle-outline</v-icon>
                <v-tooltip
                  activator="parent"
                  location="top"
                > Vencimento do cartão
                </v-tooltip>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, ix) in cardData" :key="ix">
              <td data-label="Nome">{{ item.name}}</td>
              <td data-label="Banco">
                <v-badge
                  :color="item.color"
                  inline
                  dot
                ></v-badge>
                {{ item.bank }}
              </td>
              <td data-label="Bandeira">{{ item.flag }}</td>
              <td data-label="Tipo">{{ item.type }}</td>
              <td data-label="Número">{{ item.number_card }}</td>
              <td data-label="Vencimento">{{ formatDate(item.expiration) }}</td>
              <td data-label="">
                <v-icon color="#70BB7B" class="mr-2 cursor-pointer" >mdi-pencil</v-icon>
                <v-icon
                  color="grey"
                  class="cursor-pointer"
                  @click="openModalToDelete(item)"
                >mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-col>
  </v-row>

  <v-dialog v-model="openModalDelete">
    <div class="flex justify-center">
      <v-card variant="flat" class="w-500px h-auto px-5">
        <v-card-title>
          <div class="font-bold">Deseja deletar o cartão ?</div>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-row class="pa-3 my-2 text-sm">
            <v-chip :color="itemToEdit.color">{{ itemToEdit.bank }}</v-chip>
            <v-col>
              <div>
                <div>{{ itemToEdit.type }}</div>
                {{ itemToEdit.flag }}
              </div>
            </v-col>
            <v-col>
              <div class="text-xs">Nome do cartão</div>
              <div class="font-bold">{{ itemToEdit.name }}</div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="text"
            color="grey"
            @click="openModalDelete = false"
            class="text-capitalize"
            append-icon="mdi-close"
          >
            Fechar
          </v-btn>
          <v-btn
            color="red"
            variant="text"
            class="text-capitalize"
            append-icon="mdi-delete"
            @click="deleteCard(itemToEdit)"
            :loading="loading"
          >
            Deletar
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>
</template>
<script setup>
  const {
    cards,
    getCards,
    deleteCards
  } = useCardStore()

  const emit = defineEmits(['sendSnackbar', 'sendSnackbarFail'])
  const loading = ref(false)
  const snackbar = ref({
    color: null,
    icon: null,
    mode: null,
    position: "top",
    text: null,
    timeout: 7500,
    title: null,
    visible: false,
    icon: null
  })
  const cardData = ref()
  const openModalDelete = ref(false)
  const itemToEdit = ref({})

  onMounted(() => {
    cardData.value = cards
  })

  const openModalToDelete = (item) => {
    openModalDelete.value = true
    itemToEdit.value = item
  }

  const snackSuccess = ref({
    visible: true,
    color: "gree",
    position: "top",
    title: "Cartão removido com sucesso!",
    icon: "mdi-checkbox-marked-circle-outline"
  })

  const snackFail = ref({
    visible: true,
    color: "red",
    position: "top",
    title: "Erro para remover cartão!",
    icon: "mdi-close-circle"
  })

  const deleteCard = async (item) => {
    const { _id } = item
    loading.value = true
    try {
      const response = await deleteCards(_id)
      loading.value = false
      emit('sendSnackbar', snackSuccess)
      cardData.value = await getCards()
      openModalDelete.value = !openModalDelete.value
      return response
    } catch(error) {
      loading.value = false
      console.error(error)
      emit('sendSnackbarFail', snackFail)
    }
  }
</script>
<style lang="scss">
</style>
