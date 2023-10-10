<template>
  <NuxtLayout>

      <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');

  * {
    font-family: 'Comfortaa', cursive;
  }
.primary-bg {
  background-color: var(--v-primary-base);
  color: white;
}

.primary-color {
  color: var(--v-primary-base);
}

.app {
  padding: 0px;
  margin: 0px;
}

.title {
  font-family: 'Comfortaa', cursive;
}

.list-text {
  text-decoration: none !important;
}

.fs-10 {
  font-size: 10px;
}

.fs-13 {
  font-size: 13px;
}

.fs-20 {
  font-size: 20px;
}

.fs-30 {
  font-size: 30px;
}

.mdi-wallet {
  font-size: 36px;
  color: green;
}

</style>

