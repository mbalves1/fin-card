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
                <v-icon color="grey" class="cursor-pointer">mdi-delete</v-icon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </v-col>
  </v-row>
</template>
<script setup>
  const {
    cards
  } = useCardStore()

  const cardData = ref()

  onMounted(() => {
    cardData.value = cards
  })
</script>
<style lang="scss">
</style>
