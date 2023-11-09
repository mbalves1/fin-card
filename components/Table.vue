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
  <div class="mx-auto">
    <div v-if="hasSearch" class="py-10 ml-10 text-lg sm:text-3xl mx-auto flex justify-start">Transactions</div>
    <v-divider></v-divider>
    <v-row class="d-flex justify-center" style="height: 70vh;">
      <v-col cols="12" :lg="hasSpacing ? 10 : 12" md="12" class="d-flex justify-space-between flex-column">

        <div>
          <div class="flex">
            <SearchTable
              v-if="hasSearch"
              @getFilter="filterTransactions"
              @clean="refresh"
            ></SearchTable>
  
            <div class="flex cursor-pointer">
              <IconDownload class="ma-3" @click="download"></IconDownload>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th style="color: black">Name</th>
                <th>Type</th>
                <th>Card</th>
                <th>Bank</th>
                <th>Card type</th>
                <th>Month</th>
                <th>Value</th>
                <th style="width: 50px;">Date
                  <v-icon size="13">mdi-alert-circle-outline</v-icon>
                  <v-tooltip
                    activator="parent"
                    location="top"
                  >Registration date
                  </v-tooltip>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, ix) in data" :key="ix">
                <td data-label="Name">{{ item.name}}</td>
                <td data-label="Type">{{ item.type }}</td>
                <td data-label="Card">{{ formatedItem(item.attached, "flag") }}</td>
                <td data-label="Bank">{{ formatedItem(item.attached, "bank") }}</td>
                <td data-label="Card type">{{ formatedItem(item.attached, "type")}}</td>
                <td data-label="Month">{{ item.month }}</td>
                <td data-label="Value">{{ formatCurrency(item.value)}}</td>
                <td data-label="Date">{{ formatDate(item.createdAt)}}</td>
                <td data-label="">
                  <v-icon color="#70BB7B" class="mr-2 cursor-pointer" @click="openModalToEdit(item)">mdi-pencil</v-icon>
                  <v-icon color="grey" class="cursor-pointer" @click="openModalToDelete(item)">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="hasPagination" class="d-flex justify-space-between align-center mt-0 sm:mt-2 sm:mb-0" style="margin-bottom: 70px !important" density="compact">
          <div style="height: 30px;" class="d-flex align-center">
            <v-select
              v-model="perPageSize"
              label="Size"
              density="compact"
              variant="flat"
              :items="[2, 5, 10, 15]"
              class="fs-10 border rounded-lg"
              hide-details
              style="width: 85px; padding: 0;"
              @update:modelValue="paginationNext(1)">
            </v-select>
          </div>
          <v-pagination
            v-model="pagination"
            :length="pageLength"
            total-visible="3"
            @update:model-value="paginationNext"
            density="compact"
          >
          </v-pagination>
          <div></div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="openModalEdit">
      <div class="flex justify-center">
        <v-card class="w-500px h-auto overflow-y-auto px-3 py-2">
          <EditModalTable
            :item-edit="itemToEdit"
            @close-edit-modal="closeModal"
            @saveEditItem="saveEdit"
            :loading="loading"
            ></EditModalTable>
        </v-card>
      </div>
    </v-dialog>

    <v-dialog v-model="openModalDelete">
      <div class="flex justify-center">
        <v-card variant="flat" class="w-500px h-auto px-5 pt-5">
          <div class="font-bold">Deseja deletar o lançamento ?</div>
          <v-row class="border pa-3 my-2 text-sm">
            <v-col>
              <div>{{ itemToEdit.name }}</div>
              <div>{{ itemToEdit.month }}</div>
            </v-col>
            <v-col>
              <div>{{ formatCurrency(itemToEdit.value) }}</div>
              <div>{{ itemToEdit.type }}</div>
            </v-col>
          </v-row>
          
          <!-- <pre>{{ itemToEdit }}</pre> -->
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              variant="text"
              color="grey"
              @click="openModalDelete = !openModalDelete"
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
              @click="deleteItem(item)"
              :loading="loading"
            >
              Deletar
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
<script setup>
  const data = ref()
  const {
    getTransactions,
    getFiltersTransactions,
    deleteTransaction,
    putTransactions
  } = useTransactions()

  const openModalEdit = ref(false)
  const openModalDelete = ref(false)
  const itemToEdit = ref({})
  const loading = ref(false)

  defineProps({
    hasPagination: {
      type: Boolean,
      default: true
    },
    hasSearch: {
      type: Boolean,
      default: true
    },
    hasSpacing: {
      type: Boolean,
      default: true
    }
  })

  onMounted(async () => {
    try {
      await fetchData()
    } catch (error) {
      console.error(error)
    }
  });

  const totalCount = ref(0)
  const pageLength = ref(3)
  const perPageSize = ref(10)

  const page =ref({
    page: 1,
    perPage: 10
  })

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

  const pagination = ref(1)
  let currentFilter = ref(null);

  const formatedItem = (item, params) => {
    const fieldMapping = {
      flag: 'flag',
      bank: 'bank',
      type: 'type'
    };

    if (params === "flag") return item[0].flag
    if (params === "bank") return item[0].bank
    if (params === "type") return item[0].type
    // if (fieldMapping.hasOwnProperty(params)) {
    //   return item[0][fieldMapping[params]];
    // }
  }

  const paginationNext = async params => {
    try {
      if (!currentFilter.value) {
        const transations = await getTransactions({
          page: params ? params : pagination.value,
          perPage: perPageSize.value
        })

        data.value = await transations.transactions
        totalCount.value = await transations.totalCount
        pageLength.value = Math.ceil(totalCount.value/perPageSize.value)
      } else {
        const transations = await getFiltersTransactions(currentFilter.value, {
          page: params ? params : pagination.value,
          perPage: perPageSize.value
        })

        data.value = await transations.transactions
        totalCount.value = await transations.totalCount
        pageLength.value = Math.ceil(totalCount.value/perPageSize.value)
      }

    } catch (error) {
      console.error(error)
    }
  }

  const refresh = async item => {
    try {
      await fetchData()
    }
    catch(error) {
      console.error(error)
    }
  }

  const fetchData = async () => {
    try {
      const transactions = await getTransactions(page.value)
      data.value = await transactions.transactions
      totalCount.value = await transactions.totalCount
      pageLength.value = Math.ceil(totalCount.value/perPageSize.value)
    } catch (error) {
      console.error(error)
    }
  }

  const download = async () => {

    const transactions = await getTransactions({
      page: 1,
      perPage: 100000
    })

    data.value = await transactions.transactions
    const csvContent = convertCSV(transactions.transactions)
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'export_data.csv')
    link.click()
  }

  const convertCSV = (item) => {
    const allHeaders = Object.keys(item[0]);
    const headers = allHeaders.filter(header => header !== 'attached')
    const rows = data.value.map(obj => {
      return headers.map(header => {
        if (header === 'attached') return
        if (obj[header] instanceof Object) {
          if (typeof obj[header][0] === 'undefined') {
            return 'default'
          }
          const resp = obj[header].map(h => h.categoryname)[0]
          return resp
        }
        return obj[header]
      })
    })
    const headerRow = headers.join(',')
    const csvRows = [headerRow, ...rows.map(row => row.join(','))]
    return csvRows.join('\n')
  }

  const filterTransactions = async (item) => {
    currentFilter.value = item
    const filter = await getFiltersTransactions(item, page.value)
    data.value = filter.transactions
    totalCount.value = filter.totalCount
    pageLength.value = Math.ceil(totalCount.value/perPageSize.value)
  }

  const openModalToEdit = item => {
    openModalEdit.value = !openModalEdit.value
    itemToEdit.value = item
  }

  const openModalToDelete = async item => {
    openModalDelete.value = !openModalDelete.value
    itemToEdit.value = item
  }

  const closeModal = item => openModalEdit.value = item

  const deleteItem = async () => {
    loading.value = true
    try {
      await deleteTransaction(itemToEdit.value._id)
      loading.value = false
      snackbar.value = {
        visible: true,
        color: "#74C27F",
        position: "top",
        title: "Registro deletado com sucesso!",
        icon: "mdi-check-circle"
      }
      await fetchData()
      openModalDelete.value = !openModalDelete.value
      return
    } catch (error) {
      snackbar.value = {
        visible: true,
        color: "red",
        position: "top",
        title: "Error occurred during delete!",
        icon: "mdi-close-circle"
      }
      loading.value = false
      console.error(error);
    }
  }

  const saveEdit = async item => {
    console.log("edfit tabel", item)
    loading.value = true
    try {
      await putTransactions(item)
      loading.value = false
      snackbar.value = {
        visible: true,
        color: "#74C27F",
        position: "top",
        title: "Registro salvo com sucesso!",
        icon: "mdi-check-circle"
      }
      await fetchData()
      openModalEdit.value = !openModalEdit.value
      return
    } catch (error) {
      snackbar.value = {
        visible: true,
        color: "red",
        position: "top",
        title: "Error occurred during edit item!",
        icon: "mdi-close-circle"
      }
      loading.value = false
      console.error(error);
    }
  }

</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  align-items: center;
  color: #222;
  display: flex;
  font-family: 'Roboto', sans-serif;
  height: 100vh;
  justify-content: center;
  padding: 30px;
  width: 100vw;
}

:deep .v-field__input {
  padding: 0px;
}

:deep .v-input__control {
  padding: 0px 5px;
  padding-left: 10px;
  height: 35px;
  display: flex;
  align-items: center;
}

/******
 Styles
*******/

table {
  font-weight: 400;
  min-width: 360px;
  width: 100%;
  margin: auto;
  margin-bottom: 20px;
  
  thead {
    display: none;
    font-weight: 500;
  }
  
  tbody {
    tr {
      border: 1px solid #dad6eb;
      border-radius: 5px;
      display: block;
      padding: 10px;
      margin-bottom: 15px;
      min-width: 360px;
      
      td {
        display: block;
        font-weight: 500;
        padding: 0 5px;
        position: relative;
        text-align: right;
        
        button {
          background: #70BB7B;
          border: none;
          border-radius: 20px;
          box-shadow: 0 4px 8px transparentize(#222, .8);
          bottom: -30px;
          color: #fff;
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          left: 50%;
          padding: 10px 0;
          position: absolute;
          transform: translate(-50%, 50%);
          transition: background .12s ease-out;
          width: 50%;
          
          &:hover,
          &:focus {
            background: lighten(#70BB7B, 5%);
            cursor: pointer;
          }
        }
        
        &:before {
          color: #8a8a87;
          content: attr(data-label);
          font-weight: 400;
          left: 5px;
          position: absolute;
        }        
      }
    }
  }
}

@media screen and (min-width: 425px) {
  table {
    border: 1px solid #eee;
    border-collapse: collapse;
    // max-width: 1320px;
    text-align: left;
    width: 100%;
    min-width: 300px;
    
    thead {
      th {
        padding: 10px;
      }
    }

    tbody {
      margin: 0;
      tr {
        padding: 10px !important;
        margin: 15px 20px;
      }
    }
  }
}

@media all and (min-width: 768px) {
  table {
    border: 1px solid #eee;
    border-collapse: collapse;
    // max-width: 1320px;
    text-align: left;
    width: 100%;
    
    thead {
      display: table-header-group;
      
      th {
        padding: 10px !important;
      }
    }
    
    tbody {
      font-size: .875em;
      
      tr {
        padding: 10px !important;
        border: none;
        display: table-row;
        
        &:nth-child(odd) {
          background: #eee;
        }
        
        td {
          display: table-cell;
          font-weight: 400;
          padding: 10px;
          text-align: left;
          
          button {
            display: inline-block;
            padding: 10px 15px;
            position: initial;
            transform: translate(0);
            width: auto;
          }
          
          &:before {
            display: none;
          }
          
          &:last-child {
            text-align: right;
          }
        }
      }
    }
  }
}
</style>