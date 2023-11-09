<template>
  <FormRelease
    hasCloseButton
    @closeModal="closeModalRelease"
    @fetchTransactions="fetchTransactions"
  ></FormRelease>
</template>
<script setup>
const emit = defineEmits(['closeModal', 'fetchTransactions'])

const closeModalRelease = (event) => emit('closeModal', event)
const fetchTransactions = (event) => emit('fetchTransactions', event)

</script>