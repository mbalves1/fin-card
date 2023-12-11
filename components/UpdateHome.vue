<template>
  <v-dialog
    :model-value="welcome"
    @update:model-value="welcome"
  >
    <div class="flex justify-center">
      <v-card elevation="10" class="w-500px h-auto overflow-y-auto flex justify-between">
        <v-card-title class="bg-fincard text-center">
        <div class="font-bold">
          Updates
        </div>
        </v-card-title>
        <div class="ma-2">
          <div v-for="(update, upx) in updates" :key="upx">
            <div class="mt-2 ml-5 flex items-center">
              <v-icon class="text-yellow pr-5">mdi-creation</v-icon>
              {{ update.text }}
            </div>
          </div>
        </div>
        <v-divider class="mx-5"></v-divider>
        <div class="text-center">
          <v-btn variant="flat" class="border my-3 w-92% mx-2" @click="welcome = !welcome">Fechar</v-btn>
        </div>
      </v-card>
    </div>
  </v-dialog>

</template>
<script setup>
defineProps({
  welcome: { type: Boolean, default: false },
})

const updates = ref([
    {
      text: '1.0: Atualizações nas página de tabelas: deletar transações'
    },
    {
      text: '1.1: Atualizações nas página de tabelas: deletar editar transações'
    },
    {
      text: '1.2: Atualizações nas página de tabelas: opção de download em xlsx'
    },
    {
      text: '1.3: Opção de incluir lançamento pela home'
    },
    {
      text: '1.4: Tabela de cartões na tela de tabelas'
    },
    {
      text: '1.5: Tabela de categorias na tela de tabelas, atualização e remoção de categorias'
    },
    {
      text: '1.6: Gráfico de categorias e atualização do layout'
    }
  ])
</script>
