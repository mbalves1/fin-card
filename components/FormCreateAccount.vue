<template>
  <div>
    <v-dialog v-model="openTerms" class="flex justify-center items-center">
      <v-card height="auto">
        <Term @close="openModal"></Term>
      </v-card>
    </v-dialog>
  </div>

  <v-form ref="formRef">
    <v-text-field
      density="compact"
      class="mt-5"
      variant="outlined"
      label="Primeiro nome"
      color="#74C27F"
      v-model="register.first_name"
      required
      :rules="[v => !!v || 'O nome é obrigatório']"
    ></v-text-field>
    <v-text-field
      density="compact"
      variant="outlined"
      label="Último nome"
      color="#74C27F"
      v-model="register.last_name"
      required
      :rules="[v => !!v || 'O nome é obrigatório']"
    ></v-text-field>
    <v-text-field
      density="compact"
      variant="outlined"
      label="e-mail"
      color="#74C27F"
      v-model="register.email"
      required
          :rules="[v => !!v || 'O nome é e-mail']"
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
      required
      :rules="[v => !!v || 'A senha é obrigatória']"
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
      required
      :rules="[v => !!v || 'A confirmação da senha é obrigatória']"
    ></v-text-field>
  
    <div class="flex items-start">
      <v-checkbox
        v-model="register.terms"
        density="compact"
        color="#74C27F"
        required
        :rules="[v => !!v || 'O aceite de termos é obrigatória']">
        <template #label>
          <div class="text-sm underline underline-offset-3 cursor-pointer" @click="openTerms = !openTerms">Aceito os termos e política de privacidade</div>
        </template>
      </v-checkbox>
    </div>
      
    <div class="d-flex flex-column my-10">
      <v-btn
        height="40"
        variant="flat"
        class="text-capitalize mt-5"
        color="#74C27F"
        @click="createAccount"
        :loading="loading"
        >
        Registrar
      </v-btn>
      <v-btn
        height="40"
        variant="flat"
        class="text-capitalize mt-5"
        color="grey"
        @click="$emit('loginForm')"
        >
        Voltar
      </v-btn>
    </div>
  </v-form>
</template>
<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['registerUser'])

const show2 = ref(false)
const show3 = ref(false)
const openTerms = ref(false)
const formRef = ref(null);

const openModal = item => openTerms.value = item

const register = ref({
  first_name: null,
  last_name: null,
  email: null,
  password: null,
  confirmpassword: null,
  terms: false
})

const createAccount = async () => {
  const { valid } = await formRef.value.validate();
  emit(
    'registerUser',
    {
      first_name: register.value.first_name,
      last_name: register.value.last_name,
      email: register.value.email,
      password: register.value.password,
      confirmpassword: register.value.confirmpassword,
      terms: register.value.terms
    },
    valid
  )
}

</script>