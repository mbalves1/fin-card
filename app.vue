<template>
  <v-app style="" class="app">
    <v-navigation-drawer
      style="background: #f2f2f2;"
      v-model="drawer"
      :rail="rail"
      permanent
      :location="size < 600 ? 'top' : 'left'"
      @click="rail = false"
      class="rounded-xl"
      rail-width="85"
    >
      <v-list-item
        prepend-icon="mdi-wallet"
        title="Manager system"
        nav
        absolute
        color="blue"
        class="ml-4 mt-5"
      >
        <strong>Fin.plan</strong>
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav class="ml-3" base-color="black">
        <NuxtLink class="list-text" to="/">
          <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/">
          <v-list-item prepend-icon="mdi-finance" title="Dashboard" value="account"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/page2">
          <v-list-item prepend-icon="mdi-credit-card" title="Add Card" value="Card"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/page2">
          <v-list-item prepend-icon="mdi-form-select" title="Add Transactions" value="Transactions"></v-list-item>
        </NuxtLink>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex flex-column" >
      <NuxtPage />
    </v-main>
  </v-app>
</template>
<script setup>
  const drawer = ref(true)
  const rail = ref(true)
  const size = ref(true)

  onMounted(() => {
    size.value = window.innerWidth
    window.addEventListener('resize', updatesizeValue);
  });

  const updatesizeValue = () => {
    size.value = window.innerWidth;
  };

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updatesizeValue);
  });

</script>
<style>
.app {
  padding: 0px;
  margin: 0px;
}

.title {
  font-family: 'Montserrat', sans-serif;
}

.list-text {
  text-decoration: none !important;
}

.fs-10 {
  font-size: 10px;
}

.mdi-wallet {
  font-size: 36px;
  color: green;
}

</style>

