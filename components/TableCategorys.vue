<template>
  <v-snackbar
    v-model="snackbar.visible"
    :timeout="3000"
    :location="snackbar.position"
    :color="snackbar.color"
  >
    {{ snackbar.title }}
    <v-icon class="ml-10">{{ snackbar.icon }}</v-icon>
  </v-snackbar>
  <v-row class="d-flex justify-center mt-0 sm:mt-6">
    <v-col cols="12" lg="10" md="12" class="d-flex justify-space-between flex-column">
      <div>
        <table>
          <thead>
            <tr>
              <th class="text-sm font-bold">id</th>
              <th class="text-sm font-bold">Categoria</th>
              <th class="text-sm font-bold">Data criação</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, ix) in cardCategory" :key="ix">
              <td data-label="id" style="max-width: 100px !important">{{ item._id }}</td>
              <td data-label="categoryname" v-if="ix !== currentItemIndex">{{ item.categoryname }}</td>
              <div v-if="ix === currentItemIndex" class="flex items-center">
                <v-text-field
                  density="compact"
                  class=""
                  variant="outlined"
                  hide-details
                  v-model="cardCategory.categoryname"
                ></v-text-field>  
              </div>
              <td data-label="categoryname">{{ formatDate(item.createdAt) }}</td>
              <td data-label="">
                <v-icon
                  v-if="ix === currentItemIndex"
                  color="#70BB7B"
                  class="mr-2 cursor-pointer"
                  @click="closeInputField(ix)"
                >mdi-cancel</v-icon>
                <v-icon
                  v-else
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
        <EditModalCategory
          :item-to-edit="itemToEdit"
          @close-edit-modal="closeModal"
          @saveEditItem="saveEdit"
          :loading="loading"
          ></EditModalCategory>
      </v-card>
    </div>
  </v-dialog>

  <v-dialog v-model="openModalDelete">
    <div class="flex justify-center">
      <v-card variant="flat" class="w-500px h-auto px-5">
        <v-card-title>
          <div class="font-bold">Deseja deletar a categoria ?</div>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text class="flex justify-center">
          nome: <div class="font-bold ml-5">
            {{ itemToEdit.categoryname }}
          </div>
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
  const { getAllCategory, updateCategory, deleteCategory } = useCategory()

  const emit = defineEmits(['sendSnackbar', 'sendSnackbarFail'])
  const loading = ref(false)
  const cardCategory = ref()
  const openModalDelete = ref(false)
  const openModalEdit = ref(false)
  const currentItemIndex = ref()
  const itemToEdit = ref(null)

  onMounted(async () => {
    const categorys = await fetchCategorys()
    cardCategory.value = categorys
  })

  const fetchCategorys = async () => {
    try {
      return await getAllCategory()
    } catch (error) {
      console.error(error)
    }
  }

  const openModal = (item, modal) => {
    console.log("item", item)
    itemToEdit.value = item
    if (modal === 'delete') {
      openModalDelete.value = true
    } else {
      openModalEdit.value = true
    }
  }

  const closeModal = params => openModalEdit.value = params

  const snackbar = ref({
    visible: false,
    color: "green",
    position: "top",
    title: "",
    icon: "mdi-checkbox-marked-circle-outline"
  })

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

  const deleteCard = async (category) => {
    const { _id } = category
    loading.value = true
    try {
      const response = await deleteCategory(_id)
      loading.value = false
      const snackSuccessNew = {
        ...snackSuccess.value,
        title: "Categoria removida com sucesso!",
        color: 'green'
      }
      cardCategory.value = await getAllCategory()
      openModalDelete.value = !openModalDelete.value
      snackbar.value = snackSuccessNew
      return response
    } catch(error) {
      loading.value = false
      console.error(error)
      const snackFailNew = {
        ...snackFail.value,
        title: "Erro para remover categoria!!",
        color: 'red'
      }
      snackbar.value = snackFailNew
    }
  }

  const saveEdit = async category => {
    loading.value = true
    try {
      console.log(category)
      await updateCategory(category)
      loading.value = false
      const snackSuccessNew = {
        ...snackSuccess.value,
        title: "Categoria editado com sucesso!",
        color: 'green'
      }
      snackbar.value = snackSuccessNew
      openModalEdit.value = false
    } catch (error) {
      loading.value = false
      openModalEdit.value = false
      const snackFailNew = {
        ...snackFail.value,
        title: "Erro para atualizar categoria!!",
        color: 'red'
      }
      emit('sendSnackbarFail', snackFailNew)
    }
  }
</script>
<style lang="scss">
</style>
