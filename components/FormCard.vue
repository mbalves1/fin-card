<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="3">
        <form>
          <v-text-field
            variant="outlined"
            v-model="form.name"
            class="my-1"
            :counter="10"
            label="Name"
            required
            :rules="[v => !!v || 'O nome é obrigatório']"
          ></v-text-field>

          <v-text-field
            variant="outlined"
            v-model="form.description"
            label="Descrição"
            required
            class="my-1"
          ></v-text-field>

          <v-text-field
            variant="outlined"
            v-model="form.value"
            label="Valor"
            required
            class="my-1"
            type="number"
            :rules="[v => !!v || 'O valor é obrigatório']"
          ></v-text-field>

          <v-select
            variant="outlined"
            v-model="form.month"
            :items="items"
            label="Mês"
            required
            class="my-1"
            hide-details
          ></v-select>

          <v-radio-group inline hide-details="">
            <template v-slot:label>
              <div><strong>Metodo de pagamento</strong></div>
            </template>
            <v-radio label="Cartão" value="1"></v-radio>
            <v-radio label="Dinheiro" value="2"></v-radio>
            <v-radio label="Pix" value="3"></v-radio>
          </v-radio-group>

          <v-btn
            @click="postReleases"
          >
            Send
          </v-btn>
        </form>
      </v-col>
    </v-row>

  </v-container>
</template>
<script setup>
const { postTransactions, getTransactions } = useTransactions()

const form = ref({
  name: null,
  description: null,
  value: null,
  month: null
})

const items = ref([
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
])

onMounted(() => {
  getTeste()
})

const getTeste = async () => {
  await getTransactions()
}

const postReleases = async () => {
  try {
    const transaction = await postTransactions(form.value);
    console.log(transaction)
  } catch (error) {
    console.error(error);
  }
}


</script>