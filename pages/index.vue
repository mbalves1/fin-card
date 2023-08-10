<template>
  <v-container class="d-flex flex-end">
    <v-row>
      <v-col class="d-flex justify-center align-center" style="">
        <v-card elevation="5" height="auto" width="400" class="rounded-xl">
          <div class="custom">
            <div class="animate one">
              <strong><span>f</span><span>i</span><span>n</span><span>.</span>
              <span class="custom--subtitle">p</span><span class="custom--subtitle">l</span><span class="custom--subtitle">a</span><span class="custom--subtitle">n</span></strong>
            </div>
          </div>
          <div class="px-10 d-flex justify-center flex-column mt-5">
            <span class="text-align">Seu Guia para a Saúde Financeira</span>
            <strong class="text-align" >Todas as Suas Contas, Um Único Lugar.</strong>
          </div>

          <div v-if="messageFail">
            Desculpe! Cadastro não encontrado.
          </div>

          <v-form class="mx-10">
            <v-slide-y-reverse-transition hide-on-leave>
              <div v-if="!expand2">
                <v-text-field
                  density="compact"
                  class="mt-5"
                  label="email"
                  variant="outlined"
                  v-model="form.email"
                  color="#74C27F"
                ></v-text-field>
                <v-text-field
                  density="compact"
                  v-model="form.password"
                  variant="outlined"
                  label="senha"
                  color="#74C27F"
                ></v-text-field>
  
                <div class="d-flex flex-column my-10">
                  <v-btn
                    variant="flat"
                    class="text-capitalize mt-5"
                    color="#74C27F"
                    @click="loginIn"
                    :loading="loading"
                  >
                    Entrar
                  </v-btn>
                  <v-btn
                  
                    variant="plain"
                    class="text-capitalize mt-3"
                    v-ripple="false"
                    @click="expand2 = !expand2"
                  > Criar conta
                  </v-btn>
                </div>
              </div>

              <div v-if="expand2">
                <v-text-field
                density="compact"
                  
                class="mt-5"
                variant="outlined"
                label="Primeiro nome"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                class="mt-5"
                variant="outlined"
                label="Último nome"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                class="mt-5"
                variant="outlined"
                label="e-mail"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                class=""
                variant="outlined"
                label="senha"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                  class=""
                  variant="outlined"
                  label="Confirme a senha"
                  color="#74C27F"
                  type="password"
                ></v-text-field>
                  
                  <div class="d-flex flex-column my-10">
                    <v-btn
                      
                      variant="flat"
                      class="text-capitalize mt-5"
                      color="#74C27F"
                      @click="expand2 = !expand2"
                      >
                      Registrar
                    </v-btn>
                    <v-btn
                      
                      variant="flat"
                      class="text-capitalize mt-5"
                      color="grey"
                      @click="expand2 = !expand2"
                      >
                      Voltar
                    </v-btn>
                  </div>
              </div>
            </v-slide-y-reverse-transition>
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

const router = useRouter()

const expand2 = ref(false)
const { postLogin, user } = useUserStore()

const form = ref({
  email: "mbalves1@outlook.com",
  password: '123'
})

const messageFail = ref(false)
const loading = ref(false)


const loginIn = async () => {
  loading.value = true
  try {
    const { token } = await postLogin(form.value)
    console.log("m", token)
    loading.value = false
    
    if (token) router.push("/home")
  } catch (error) {
    loading.value = false
    messageFail.value = true
    setTimeout(() => {
      messageFail.value = false
    }, 5000)
    console.error(error)
  }
}

</script>
<style lang="scss" scoped>

</style>
