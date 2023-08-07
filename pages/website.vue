<template>
  <v-container class="pt-0 ma-0" style="background: #222; width: 100vw;">
    <v-row no-gutters class="d-flex ">
      <v-col
        cols="12"
        sm="1"
        xl="1"
        class="pt-5">
        <div class="d-flex justify-space-between flex-column h-screen ml-5">
          <div prepend-icon="mdi-wallet" class="f-white">
            <v-icon size="20">mdi-wallet</v-icon>
            Fin.plan
          </div>
  
          <div class="text-end f-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, omnis error? Dicta dolores deb</div>
          
          <div class="d-flex text-end f-white">
            <span>Lorem ipsum dolor</span> 
            <v-icon>mdi-arrow-right</v-icon>
          </div>

          <div class="text-end f-white">Lorem ipsum dolor sit amet deb</div>
        </div>
      </v-col>
      <v-col cols="12" xs="12" md="5" class="pa-0 ma-0 pt-2 ml-10 d-flex justify-center align-start flex-column">
        <v-list class="d-flex pa-0 ma-0">
          <v-list-item class="f-white f">Home</v-list-item>        
          <v-list-item class="f-white f">About us</v-list-item>        
          <v-list-item class="f-white f">Contact</v-list-item>        
          <v-list-item class="f-white f">Create Account</v-list-item>        
        </v-list>

        <v-row class="d-flex">
          <v-col cols="6" class="d-flex align-center" style="height: 60vh;">
            <h1 class="titel">
              Welcome to Fin.pl<span style="color:#fff;">an</span> Card dashboard
            </h1>
          </v-col>    
        </v-row>
      </v-col>
      <v-col cols="12" sm="5" class="pa-0 ma-0 ml-10 d-flex justify-end">
        <v-img height="700" src="/img/banner.jpg"></v-img>
      </v-col>
    </v-row>
    <!-- <v-btn @click="clickme" color="red"></v-btn> -->
  </v-container>
</template>
<script setup>
const router = useRouter()
const clickme = () => router.push('/welcome')
</script>
<style scope lang="scss">
// *{ background: blue;}
.titel {
  font-size: 75px;
  position: absolute;
  // left: 470px;
  margin-left: 16px;
  z-index: 10;
  width: 804px;
  line-height: 80px;
  color: #fff;
  bottom: 423px;
}

.f-white {
  color: #fff;
}

.f {
  background: #222;
}
</style>