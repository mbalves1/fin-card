<template>
  <div class="responsive">
    <div class="overflow-visible">
      <v-bottom-navigation
        v-model="modeValue"
        active
        color="#74C27F"
        class="flex items-center"
      >
        <NuxtLink class="list-text text-decoration-none" to="/home">
          <v-btn>
            <v-icon class="text-#74C27F pa-6" value="home">mdi-home</v-icon>
          </v-btn>
        </NuxtLink>

        <NuxtLink class="list-text text-decoration-none" to="/dash">
          <v-btn>
            <v-icon class="text-#74C27F pa-6">mdi-finance</v-icon>
          </v-btn>
        </NuxtLink>

        <NuxtLink class="list-text text-decoration-none" to="/table">
          <v-btn>
            <v-icon class="text-#74C27F pa-6">mdi-table</v-icon>
          </v-btn>
        </NuxtLink>

        <NuxtLink class="list-text text-decoration-none" to="/release-register">
          <v-btn>
            <v-icon class="text-#74C27F pa-6">mdi-cogs</v-icon>
          </v-btn>
        </NuxtLink>
      </v-bottom-navigation>
    </div>
  </div>
</template>
<script setup>
const modeValue = ref('home')
const router = useRoute()

const redirectToHome = () => {
  router.push('/home');  // Use router.push para navegar para /home
};
</script>