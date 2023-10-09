<template>
  <div>

  <div class="py-10 ml-10 text-lg sm:text-3xl">{{ tabTitle }}</div>
  <v-card variant="flat">
    <div class="">
      <v-tabs
        v-model="tab"
        color="#74C27F"
      >
        <v-tab value="option-1">
          <v-icon start>
            mdi-account
          </v-icon>
          Profile
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-credit-card
          </v-icon>
          Credits cards
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            mdi-checkbook-arrow-right
          </v-icon>
          Transactions
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
            <v-card-text max-width="600">
            </v-card-text>
            <div class="mb-0">
              Em construção...
              <div class="d-flex justify-center align-center">
                <v-img style="width: 500px; height: 500px" src="/img/building.svg"/>

              </div>
            </div>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <v-card-text>
              <div>
                <p>
                  Simplificando a Gestão Financeira - Cadastre seus Cartões de Crédito com Facilidade e Segurança
                </p>

                <p>
                  Otimize o controle das suas finanças centralizando o cadastro dos seus cartões de crédito em um só lugar. Com nossa plataforma, você pode adicionar e gerenciar informações de seus cartões de crédito, permitindo uma visão abrangente das suas transações e gastos.
                </p>
              </div>
              <FormCard></FormCard>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card flat>
            <v-card-text>
              <p>
                Mantenha Suas Finanças em Ordem - Registre Suas Transações para um Melhor Acompanhamento Financeiro
              </p>

              <p>
                Tenha controle total sobre o seu dinheiro ao registrar cada transação que você realiza. Seja uma compra, um pagamento ou uma receita, registrar suas transações permitirá que você analise e entenda seus hábitos financeiros. Nossa plataforma oferece uma maneira simples e eficaz de manter seus registros financeiros sempre atualizados.
              </p>

              <FormRelease></FormRelease> 
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</div>
</template>
<script setup>

  const tab = ref("option-1");

  const tabTitle = computed(() => {
    if (tab.value === "option-1") {
      return "Editar Perfil Pessoal"
    }
    if (tab.value === "option-2") {
      return "Credits cards registration"
    }
    if (tab.value === "option-3") {
      return "Transactions registration"
    }
  })

</script>