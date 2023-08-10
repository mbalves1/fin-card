<template>
  <div style="">
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
        <NuxtLink class="list-text" to="/home">
          <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/teste">
          <v-list-item prepend-icon="mdi-finance" title="Teste" value="account"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/card-register">
          <v-list-item prepend-icon="mdi-credit-card" title="Add Card" value="Card"></v-list-item>
        </NuxtLink>
        <!-- <NuxtLink class="list-text" to="/login">
          <v-list-item prepend-icon="mdi-form-select" title="Add Transactions" value="Transactions"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/lp">
          <v-list-item prepend-icon="mdi-page" title="Landing page" value="Transactions"></v-list-item>
        </NuxtLink> -->
      </v-list>
    </v-navigation-drawer>
    <!-- <v-main class="d-flex justify-center" >
      <NuxtLayout :name="layout">
        <NuxtPage />
      </NuxtLayout>
    </v-main> -->
  </div>
</template>
<script setup>
  const drawer = ref(true)
  const rail = ref(true)
  const size = ref(true)
  const openMenu = ref(false)
  const route = useRoute()

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

  // watch(
  //   () => route.path,
  //   (newRoute) => newRoute != "/" ? openMenu.value = false : openMenu.value = true

  // )

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

