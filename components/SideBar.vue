<template>
  <v-navigation-drawer
    style="background: #f2f2f2;"
    v-model="drawer"
    :rail="rail"
    permanent
    :location="size < 600 ? '' : 'left'"
    @click="rail = false"
    class="rounded-xl navBarLeft"
    rail-width="85"
  >
    <v-list-item
      prepend-icon="mdi-wallet"
      nav
      absolute
      color="blue"
      class="ml-4 mt-5"
    >
    <div class="fs-11"><strong><i>minne.<span style="color: #74C27F">wallet</span></i></strong></div>
    <div><strong>{{ nameUser }}</strong></div>
      <!-- <v-img src="/img/coins.gif"></v-img> -->
      <!-- <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/card-wallet.png" alt="card-wallet"/> -->
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider v-if="size > 600"></v-divider>

    <v-col class="d-flex justify-space-between flex-column h-90 pa-0">
      <v-list density="compact" nav class="ml-3" base-color="black">
        <NuxtLink class="list-text" to="/home">
          <v-list-item prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/dash">
          <v-list-item prepend-icon="mdi-finance" title="Dashboard" value="account"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/table">
          <v-list-item prepend-icon="mdi-table" title="Table" value="table"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/release-register">
          <v-list-item prepend-icon="mdi-cogs" title="Settings" value="release"></v-list-item>
        </NuxtLink>
        <!-- <NuxtLink class="list-text" to="/card-register">
          <v-list-item prepend-icon="mdi-credit-card" title="Add Card" value="Card"></v-list-item>
        </NuxtLink>
        <NuxtLink class="list-text" to="/card-register"> -->
          <!-- Folder pq quero enviar documentos, input file -->
          <!-- <v-list-item prepend-icon="mdi-folder-account" title="Profile" value="Card"></v-list-item>
        </NuxtLink> -->
      </v-list>

      <v-list base-color="black" class="pa-0">
        <NuxtLink class="list-text" to="/">
          <v-list-item @click="handleLogout" prepend-icon="mdi-logout" title="Logout" value="Card"></v-list-item>
        </NuxtLink>
      </v-list>
    </v-col>
  </v-navigation-drawer>
</template>
<script setup>
  const drawer = ref(true)
  const rail = ref(true)
  const size = ref(true)
  const openMenu = ref(false)
  const route = useRoute()

  const value = ref(1)
  const nameUser = ref(null)

  const handleLogout = () => {
    localStorage.clear();
    route.push("/")
  }

  onMounted(() => {
    size.value = window.innerWidth
    window.addEventListener('resize', updatesizeValue);
    nameUser.value = JSON.parse(localStorage.getItem("User"))?.first_name
  });

  const updatesizeValue = () => {
    size.value = window.innerWidth;
  };

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updatesizeValue);
  });

</script>
<style lang="scss">
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

.h-90 {
  height: 90% !important;
}

.responsive {
  display: none;
  @media screen and (max-width:425px) {
    display: block;
  }
}

.navBarLeft {
  display: block;
  @media screen and (max-width:425px) {
    display: none;
  }
}
</style>

