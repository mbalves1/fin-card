<template>
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
  <div class="fs-10 mt-5 d-flex justify-end cursor-pointer" @click="$emit('loginForm')">
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
      @click="$emit('createAccount')"
    > Não tenho conta
    </v-btn>
  </div>
</template>
<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['forgotPassword'])

const forgotPasswordEmail = ref({
  email: null
})

const forgotPassword = () => {
  emit('forgotPassword', { email: forgotPasswordEmail.value.email })
}
</script>