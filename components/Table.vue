<template>
  <v-container class="mx-auto">
    <v-row class="d-flex justify-center">
      <v-col cols="12" lg="10" md="12">
        <div v-if="hasSearch">
          <v-text-field placeholder="Search" variant="outlined"></v-text-field>
        </div>
        <table>
          <thead>
            <tr>
              <th style="color: black">Name</th>
              <th>Type</th>
              <th>Card</th>
              <th>Bank</th>
              <th>Card type</th>
              <th>Value</th>
              <th>Date</th>
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
              <td data-label="Value">{{ item.value}}</td>
              <td data-label="Date">{{ item.createdAt}}</td>
              <td data-label="">
                <v-icon color="#70BB7B">mdi-delete</v-icon>
                <v-icon color="#70BB7B">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
        <v-pagination v-if="hasPagination" :length="6">
        </v-pagination>
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
    }
  })

  onMounted(async () => {
    try {
      await fetchData()
    } catch (error) {
      console.error(error)
    }
  });

  const page =ref({
    page: 1,
    perPage: 10
  })

  const formatedItem = (item, params) => {
    const fieldMapping = {
      flag: 'flag',
      bank: 'bank',
      type: 'type'
    };

    if (fieldMapping.hasOwnProperty(params)) {
      return item[0][fieldMapping[params]];
    } else {
      return 'Parâmetro inválido';
    }
  }


  const fetchData = async () => {
    try {
      const transations = await getTransactions(page.value)
      data.value = await transations
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

@media screen and (max-width: 425px) {
  table {
    border: 1px solid #eee;
    border-collapse: collapse;
    // max-width: 1320px;
    text-align: left;
    width: 100%;
    min-width: 360px;
    
    thead {
      th {
        padding: 10px;
      }
    }

    tbody {      
      tr {
        padding: 10px !important;
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