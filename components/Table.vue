<template>
  <v-container class="mx-auto">

    <div v-if="hasSearch" class="py-10 ml-10 fs-30 mx-auto">Transactions</div>

    <v-row class="d-flex justify-center" style="height: 70vh;">
      <v-col cols="12" :lg="hasSpacing ? 10 : 12" md="12" class="d-flex justify-space-between flex-column">

        <div>
          <SearchTable v-if="hasSearch"></SearchTable>
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
              <!-- <pre>
                {{ data.transactions }}
              </pre> -->
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
                  <v-icon color="#70BB7B" class="mr-2">mdi-pencil</v-icon>
                  <v-icon color="grey" class="">mdi-delete</v-icon>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="hasPagination" class="d-flex justify-space-between align-center mt-5" density="compact">
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
  </v-container>
</template>
<script setup>
  const data = ref()
  const { getTransactions } = useTransactions()

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

  const pagination = ref(1)

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
      const transations = await getTransactions({
        page: params ? params : pagination.value,
        perPage: perPageSize.value
      })
      console.log("transations", transations.transactions)
      data.value = await transations.transactions
      totalCount.value = await transations.totalCount
      pageLength.value = Math.ceil(totalCount.value/perPageSize.value)
      console.log("pageSze", pageLength.value)
    } catch (error) {
      console.error(error)
    }
  }


  const fetchData = async () => {
    try {
      const transactions = await getTransactions(page.value)
      console.log("trras", transactions)
      data.value = await transactions.transactions
      totalCount.value = await transactions.totalCount
      pageLength.value = Math.ceil(totalCount.value/perPageSize.value)
    } catch (error) {
      console.error(error)
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
      margin-bottom: 30px;
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