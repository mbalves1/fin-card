<template>
  <v-container class="pa-0 mx-auto">
    <v-snackbar
      v-model="snackbar.visible"
      :timeout="3000"
      :location="snackbar.position"
      :color="snackbar.color"
    >
      <div class="flex">
        <v-icon class="mr-2">{{ snackbar.icon }}</v-icon>
        <div>{{ snackbar.title }}</div>
      </div>
    </v-snackbar>
    <v-row >
      <v-col cols="12" col="2" class="d-flex justify-center align-center">
        <v-card elevation="0" height="auto" width="400" class="rounded-xl bg-transparent">
          <div class="custom">
            <div class="animate one customFont">
              <strong><i><span>m</span><span>i</span><span>n</span><span>n</span><span>e</span><span>.</span>
                <span class="custom--subtitle text-black">w</span><span class="custom--subtitle text-black">a</span><span class="custom--subtitle text-black">l</span><span class="custom--subtitle text-black">l</span><span class="custom--subtitle text-black">e</span><span class="custom--subtitle text-black">t</span></i></strong>
              </div>
            </div>
            <div class="px-10 d-flex justify-center flex-column mt-5">
              <span class="text-align">Seu Guia para a Saúde Financeira</span>
              <strong class="text-align" >Todas as Suas Contas, Um Único Lugar.</strong>
            </div>

            <v-form class="mx-10">
              <v-slide-y-reverse-transition hide-on-leave>
                <div v-if="expand1">
                  <FormLogin
                    :loading="loading"
                    @loginIn="loginIn"
                    @forgotPassword="changeView(3)"
                    @createAccount="changeView(2)"
                  ></FormLogin>
                </div>
            
                <div v-if="expand3">
                  <FormForgotPass
                    :loading="loading"
                    @createAccount="changeView(2)"
                    @loginForm="changeView(1)"
                    @forgotPassword="forgotPassword"
                  ></FormForgotPass>  
                </div>

                <div v-if="expand2">
                  <FormCreateAccount
                    :loading="loading"
                    @loginForm="changeView(1)"
                    @registerUser="registerUser"
                  ></FormCreateAccount>
                </div>
            </v-slide-y-reverse-transition>
          </v-form>
        </v-card>
      </v-col>
      <!-- <v-col>
        <v-img src="/img/creditcard.gif"></v-img>
      </v-col> -->
    </v-row>
  </v-container>
</template>
<script setup>

// definePageMeta({
//   layout: 'layout'
// })

definePageMeta({
  layout: 'login'
})

const router = useRouter()

const {
  postLogin,
  postRegister,
  getUser,
  msgError,
  postForgotPass
} = useUserStore()

const expand1 = ref(true)
const expand2 = ref(false)
const expand3 = ref(false)

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

const messageFailRegister = ref(false)
const loading = ref(false)


const loginIn = async (item) => {
  loading.value = true
  try {
    const { token } = await postLogin(item)
    loading.value = false
    
    if (token) router.push("/home")
  } catch (error) {
    snackbar.value = {
      visible: true,
      color: "red",
      position: "top",
      title: "E-mail ou senha incorreto", // Correção: Use response.error para exibir a mensagem de erro
      icon: "mdi-close-circle"
    };
    loading.value = false
    console.error(error)
  }
}

const registerUser = async (item, valid) => {
  if (valid) {
    loading.value = true
    try {
      const response = await postRegister(item)
      loading.value = false;
      snackbar.value = {
        visible: true,
        color: '#74C27F',
        position: 'top',
        title: 'Usuário criado com sucesso!',
        icon: 'mdi-check-circle',
      };
      changeView(1)
      return response
    } catch (error) {
      loading.value = false;
      snackbar.value = {
        visible: true,
        color: 'red',
        position: 'top',
        title: 'Ocorreu um erro ao processar a solicitação.',
        icon: 'mdi-close-circle',
      };
      return
    }
  }
}

const forgotPassword = async item => {
  loading.value = true;
  try {
    const response = await postForgotPass(item);
    loading.value = false;

    if (response.error) {
      // Exibe snackbar com a mensagem de erro
      snackbar.value = {
        visible: true,
        color: "red",
        position: "top",
        title: response.error, // Correção: Use response.error para exibir a mensagem de erro
        icon: "mdi-close-circle"
      };
    } else {
      // Exibe snackbar com a mensagem de sucesso
      snackbar.value = {
        visible: true,
        color: "#74C27F",
        position: "top",
        title: response.message, // Correção: Use response.message para exibir a mensagem de sucesso
        icon: "mdi-check-circle"
      };
      changeView(1);
    }
  } catch (error) {
    loading.value = false;
    console.error("Erro ao chamar a API:", error);

    // Exibe snackbar com a mensagem de erro
    snackbar.value = {
      visible: true,
      color: "red",
      position: "top",
      title: "Ocorreu um erro ao processar a solicitação.",
      icon: "mdi-close-circle"
    };
  }
};
const changeView = (index) => {
  expand1.value = index === 1
  expand2.value = index === 2
  expand3.value = index === 3
}

</script>
<style lang="scss" scoped>

</style>
