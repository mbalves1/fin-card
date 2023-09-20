<template>
  <v-container class="mx-auto">
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

              <v-form ref="formRef" class="mx-10">
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
                  :rules="[v => !!v || 'O valor é obrigatório']"
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
                  :rules="[v => !!v || 'O valor é obrigatório', confirmPass]"
                ></v-text-field>
                  
                  <div class="d-flex flex-column my-10">
                    <v-btn
                    variant="flat"
                    class="text-capitalize mt-5"
                    color="#74C27F"
                    @click="resetPassword"
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
const route = useRoute();
const router = useRouter();

definePageMeta({
  layout: 'layout'
})

const { postResetPass } = useUserStore()

const show1 = ref(false)
const show2 = ref(false)
const formRef = ref(null);
const loading = ref(false) 

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

const form = ref({
  password: "",
  token: null,
  email: null,
  passwordConfirm: null
})

const confirmPass = (v) => {
  return v == form.value.password || 'As senhas não coincidem'
};

const resetPassword = async () => {
  loading.value = true
  form.value = {
    password: form.value.password,
    token: route.params.reset,
    email: route.params.email,
    passwordConfirm: form.value.passwordConfirm
  }
  const { valid } = await formRef.value.validate();

  if (confirmPass) {
    try {
      await postResetPass(form.value)
      snackbar.value = {
        visible: true,
        color: "#74C27F",
        position: "top",
        title: "Registration completed successfully!",
        icon: "mdi-check-circle"
      }
      loading.value = false
      router.push('/');
    } catch (error) {
      console.error(error)
    }
  } else {
    loading.value = false
    snackbar.value = {
      visible: true,
      color: "red",
      position: "top",
      title: "Error occurred during registration!",
      icon: "mdi-close-circle"
    }
  }
}
</script>