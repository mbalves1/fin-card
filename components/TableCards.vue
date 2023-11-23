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
              <!-- <th class="text-sm font-bold">Número</th> -->
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
              <!-- <td data-label="Número">{{ item.number_card }}</td> -->
              <td data-label="Vencimento">{{ formatDate(item.expiration) }}</td>
              <td data-label="">
                <v-icon
                  color="#70BB7B"
                  class="mr-2 cursor-pointer"
                  @click="openModal(item, 'edit')"
                >mdi-pencil</v-icon>
                <v-icon
                  color="grey"
                  class="cursor-pointer"
                  @click="openModal(item, 'delete')"
                >mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-col>
  </v-row>

  <v-dialog v-model="openModalEdit">
    <div class="flex justify-center">
      <v-card class="w-500px h-auto overflow-y-auto px-3 py-2">
        <EditModalCard
          :itemToEdit="itemToEdit"
          @close-edit-modal="closeModal"
          @save-edit-item="saveEdit"
          :loading="loading"
        ></EditModalCard>
      </v-card>
    </div>
  </v-dialog>

  <v-dialog v-model="openModalDelete">
    <div class="flex justify-center">
      <v-card variant="flat" class="w-500px h-auto px-5">
        <v-card-title>
          <div class="font-bold">Deseja deletar o cartão ?</div>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="flex justify-center">
          <Card
            class="mx-2 border"
            height="145"
            width="145"
            min-width="145px"
            elevation="0"
            :card="itemToEdit"
          >
          </Card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            variant="flat"
            color="#f2f2f2"
            @click="openModalDelete = false"
            class="text-capitalize w-49%"
            append-icon="mdi-close"
          >
            Fechar
          </v-btn>
          <v-btn
            color="red"
            variant="flat"
            class="text-capitalize w-49%"
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
    updateCard,
    deleteCards
  } = useCardStore()

  const emit = defineEmits(['sendSnackbar', 'sendSnackbarFail'])
  const loading = ref(false)
  const cardData = ref()
  const openModalDelete = ref(false)
  const openModalEdit = ref(false)
  const itemToEdit = ref({})

  onMounted(() => {
    cardData.value = cards
  })

  const openModal = (item, modal) => {
    itemToEdit.value = item
    if (modal === 'delete') {
      openModalDelete.value = true
    } else {
      openModalEdit.value = true
    }
  }

  const closeModal = params => openModalEdit.value = params

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

  const deleteCard = async (card) => {
    const { _id } = card
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

  const saveEdit = async card => {
    loading.value = true
    try {
      await updateCard(card)
      loading.value = false
      const snackSuccessNew = {
        ...snackSuccess.value,
        title: "Cartão editado com sucesso!",
        color: 'green'
      }
      snackSuccess.value = snackSuccessNew
      openModalEdit.value = false
      emit('sendSnackbar', snackSuccess)
    } catch (error) {
      loading.value = false
      openModalEdit.value = false
      const snackFailNew = {
        ...snackFail.value,
        title: "Erro para atualizar cartão!!",
        color: 'red'
      }
      emit('sendSnackbarFail', snackFailNew)
    }
  }
</script>
<style lang="scss">
</style>
