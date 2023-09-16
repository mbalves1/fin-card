<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" col="2" class="d-flex justify-center align-center">
        <v-card elevation="0" border height="auto" width="400" class="rounded-xl">
          <div class="custom">
            <div class="animate one">
              <strong><i><span>f</span><span>i</span><span>n</span><span>.</span>
                <span class="custom--subtitle">c</span><span class="custom--subtitle">a</span><span class="custom--subtitle">r</span><span class="custom--subtitle">d</span></i></strong>
              </div>
            </div>
            <div class="px-10 d-flex justify-center flex-column mt-5 mb-10">
              <span class="text-align">Seu Guia para a Saúde Financeira</span>
              <strong class="text-align" >Todas as Suas Contas, Um Único Lugar.</strong>
            </div>
            <!-- v-if="messageFail" -->
            <v-form class="mx-10">
                <div class="mt-20">
                  <v-text-field
                  density="compact"
                  v-model="form.password"
                  :type="show1 ? 'text' : 'password'"
                  variant="outlined"
                  label="Nova senha"
                  color="#74C27F"
                  :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  <v-text-field
                  density="compact"
                  v-model="form.passwordConfirm"
                  :type="show2 ? 'text' : 'password'"
                  variant="outlined"
                  label="Confirme a senha"
                  color="#74C27F"
                  :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="show2 = !show2"
                  ></v-text-field>
                  
                  <v-row class="rounded-sm errorMessage">
                    <div transition="scale-transition">
                      <v-alert
                      type="error"
                      icon="mdi-alert-circle-outline"
                      text="Desculpe! Cadastro não encontrado."
                      variant="tonal"
                      ></v-alert>
                    </div>
                  </v-row>
                  
                  <div class="d-flex flex-column my-10">
                    <v-btn
                    variant="flat"
                    class="text-capitalize mt-5"
                    color="#74C27F"
                    @click="loginIn"
                    :loading="loading"
                    height="40"
                    >
                    Salvar
                  </v-btn>
                  <v-btn
                  variant="plain"
                  class="text-capitalize mt-3"
                  v-ripple="false"
                  > Criar conta
                </v-btn>
              </div>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
definePageMeta({
  layout: 'layout'
})

const show1 = ref(false)
const show2 = ref(false)

const form = ref({
  password: "",
  passwordConfirm: ""
})
</script>