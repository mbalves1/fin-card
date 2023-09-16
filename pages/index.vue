<template>
  <v-container class="pa-0 mx-auto">
    <v-row>
      <v-col cols="12" col="2" class="d-flex justify-center align-center">
        <v-card elevation="0" border height="auto" width="400" class="rounded-xl">
          <div class="custom">
            <div class="animate one">
              <strong><i><span>f</span><span>i</span><span>n</span><span>.</span>
                <span class="custom--subtitle">c</span><span class="custom--subtitle">a</span><span class="custom--subtitle">r</span><span class="custom--subtitle">d</span></i></strong>
              </div>
            </div>
            <div class="px-10 d-flex justify-center flex-column mt-5">
              <span class="text-align">Seu Guia para a Saúde Financeira</span>
              <strong class="text-align" >Todas as Suas Contas, Um Único Lugar.</strong>
            </div>
            <!-- v-if="messageFail" -->
            <v-form class="mx-10">
              <v-slide-y-reverse-transition hide-on-leave>
                <div v-if="expand1">
                  <v-text-field
                  prepend-inner-icon="mdi-email-outline"
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
                  :type="show1 ? 'text' : 'password'"
                  variant="outlined"
                  label="senha"
                  color="#74C27F"
                  :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
                  prepend-inner-icon="mdi-lock-outline"
                  @click:append-inner="show1 = !show1"
                  ></v-text-field>
                  
                  <v-row v-if="messageFail" class="rounded-sm errorMessage">
                    <div transition="scale-transition">
                      <v-alert
                      type="error"
                      icon="mdi-alert-circle-outline"
                      text="Desculpe! Cadastro não encontrado."
                      variant="tonal"
                      ></v-alert>
                    </div>
                  </v-row>
                  
                  <div class="d-flex justify-end fs-10 text-decoration-underline" style="cursor: pointer" @click="changeView(3)">
                    Esqueci minha senha
                  </div>
                  
                  <div class="d-flex flex-column my-10">
                    <v-btn
                    variant="flat"
                    class="text-capitalize mt-5"
                    color="#74C27F"
                    @click="loginIn"
                    :loading="loading"
                    height="40"
                    >
                    Entrar
                  </v-btn>
                  <v-btn
                  variant="plain"
                  class="text-capitalize mt-3"
                  v-ripple="false"
                  @click="changeView(2)"
                  > Criar conta
                </v-btn>
              </div>
            </div>
            
            <div v-if="expand3">
              <div class="mt-10">Digite o e-mail cadastrado!</div>
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  density="compact"
                  class="mt-5"
                  label="email"
                  variant="outlined"
                  v-model="forgotPasswordEmail.email"
                  color="#74C27F"
                ></v-text-field>
                <div v-if="expand3" class="fs-10 mt-5 d-flex justify-end" @click="changeView(1)">
                  <v-icon>mdi-arrow-left</v-icon><span class="text-decoration-underline ml-1">voltar</span>
                </div>
                <div class="d-flex flex-column mb-2">
                  <v-btn
                    variant="flat"
                    class="text-capitalize mt-5"
                    color="#74C27F"
                    @click="forgotPassword"
                    :loading="loading"
                    height="40"
                  >
                    Reset password
                  </v-btn>
                  <v-btn
                    variant="plain"
                    class="text-capitalize mt-3"
                    v-ripple="false"
                    @click="changeView(2)"
                  > Não tenho conta
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
                v-model="register.first_name"
                ></v-text-field>
                <v-text-field
                density="compact"
                variant="outlined"
                label="Último nome"
                color="#74C27F"
                v-model="register.last_name"
                ></v-text-field>
                <v-text-field
                density="compact"
                variant="outlined"
                label="e-mail"
                color="#74C27F"
                v-model="register.email"
                ></v-text-field>
                <v-text-field
                density="compact"
                :type="show2 ? 'text' : 'password'"
                :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append-inner="show2 = !show2"
                class=""
                variant="outlined"
                label="senha"
                color="#74C27F"
                v-model="register.password"
                ></v-text-field>
                <v-text-field
                  density="compact"
                  :type="show3 ? 'text' : 'password'"
                  :append-inner-icon="show3 ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="show3 = !show3"
                  class=""
                  variant="outlined"
                  label="Confirme a senha"
                  color="#74C27F"
                  v-model="register.confirmpassword"
                ></v-text-field>

                <v-row v-if="messageFailRegister" class="rounded-sm errorMessage">
                  <div transition="scale-transition">
                    <v-alert
                      type="error"
                      icon="mdi-alert-circle-outline"
                      :text="msgError"
                      variant="tonal"
                      closable
                    ></v-alert>
                  </div>
                </v-row>
                  
                  <div class="d-flex flex-column my-10">
                    <v-btn
                      height="40"
                      variant="flat"
                      class="text-capitalize mt-5"
                      color="#74C27F"
                      @click="registerUser"
                      :loading="loading"
                      >
                      Registrar
                    </v-btn>
                    <v-btn
                      height="40"
                      variant="flat"
                      class="text-capitalize mt-5"
                      color="grey"
                      @click="changeView(1)"
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

const expand1 = ref(true)
const expand2 = ref(false)
const expand3 = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const {
  postLogin,
  postRegister,
  getUser,
  msgError,
  postForgotPass
} = useUserStore()

const form = ref({
  email: "",
  password: ""
})

const register = ref({
  first_name: null,
  last_name: null,
  email: null,
  password: null,
  confirmpassword: null
})

const forgotPasswordEmail = ref({
  email: null
})

const messageFail = ref(false)
const messageFailRegister = ref(false)
const loading = ref(false)


const loginIn = async () => {
  loading.value = true
  try {
    const { token } = await postLogin(form.value)
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

const registerUser = async () => {
  loading.value = true
  try {
    const resp = await postRegister(register.value)
    loading.value = false

    // if (token) router.push("/home")
  } catch (error) {
    let m = await msgError
    loading.value = false
    messageFailRegister.value = true
    console.error(error)
  }
}

const forgotPassword = async () => {
  loading.value = true
  try {
    const resp = await postForgotPass(forgotPasswordEmail.value)
    loading.value = false

  } catch (error) {
    loading.value = false
    messageFailRegister.value = true
    console.error(error)
  }
}

const changeView = (index) => {
  expand1.value = index === 1
  expand2.value = index === 2
  expand3.value = index === 3
}

</script>
<style lang="scss" scoped>

</style>
