<template>
  <div>
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
        :text="messagetext"
        variant="tonal"
        ></v-alert>
      </div>
    </v-row>
      
    <div class="d-flex justify-end fs-10 text-decoration-underline" style="cursor: pointer" @click="$emit('forgotPassword')">
      Esqueci minha senha
    </div>
      
    <div class="d-flex flex-column my-10">
      <v-btn
        variant="flat"
        class="text-capitalize mt-5"
        color="#74C27F"
        @click="login"
        :loading="loading"
        height="40"
        >
        Entrar
      </v-btn>
      <v-btn
        variant="plain"
        class="text-capitalize mt-3"
        v-ripple="false"
        @click="$emit('createAccount')"
        > Criar conta
      </v-btn>
    </div>
  </div>
</template>
<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  messagetext: {
    type: String,
    default: false
  }
})

const emit = defineEmits(['loginIn'])

const show1 = ref(false)
const form = ref({
  email: '',
  password: ''
})

const login = () => {
  emit('loginIn', { email: form.value.email, password: form.value.password })
}

</script>