<template>
  <v-container class="d-flex flex-end">
    <v-row>
      <v-col class="d-flex justify-center align-center" style="">
        <v-card elevation="5" height="auto" width="400" class="rounded-xl">
          <div class="custom">
            <div class="animate one">
              <strong><span>f</span><span>i</span><span>n</span><span>.</span>
              <span class="custom--subtitle">p</span><span class="custom--subtitle">l</span><span class="custom--subtitle">a</span><span class="custom--subtitle">n</span></strong>
            </div>
          </div>
          <div class="px-10 d-flex justify-center flex-column mt-5">
            <span class="text-align">Seu Guia para a Saúde Financeira</span>
            <strong class="text-align" >Todas as Suas Contas, Um Único Lugar.</strong>
          </div>
          <v-form class="mx-10">
            <v-slide-y-reverse-transition hide-on-leave>
              <div v-if="!expand2">
                <v-text-field
                density="compact"
                  class="mt-5"
                  label="email"
                  variant="outlined"
                  
                  color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                  variant="outlined"
                  label="senha"
                  color="#74C27F"
                ></v-text-field>
  
                <div class="d-flex flex-column my-10">
                  <v-btn
                    variant="flat"
                    
                    class="text-capitalize mt-5"
                    color="#74C27F"
                  >
                    Entrar
                  </v-btn>
                  <v-btn
                  
                    variant="plain"
                    class="text-capitalize mt-3"
                    v-ripple="false"
                    @click="expand2 = !expand2"
                  > Criar conta
                  </v-btn>
                </div>
              </div>

              <div v-if="expand2">
                <v-text-field
                density="compact"
                  
                class="mt-5"
                variant="outlined"
                label="Primeiro nome"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                class="mt-5"
                variant="outlined"
                label="Último nome"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                class="mt-5"
                variant="outlined"
                label="e-mail"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                class=""
                variant="outlined"
                label="senha"
                color="#74C27F"
                ></v-text-field>
                <v-text-field
                density="compact"
                  
                  class=""
                  variant="outlined"
                  label="Confirme a senha"
                  color="#74C27F"
                  type="password"
                ></v-text-field>
                  
                  <div class="d-flex flex-column my-10">
                    <v-btn
                      
                      variant="flat"
                      class="text-capitalize mt-5"
                      color="#74C27F"
                      @click="expand2 = !expand2"
                      >
                      Registrar
                    </v-btn>
                    <v-btn
                      
                      variant="flat"
                      class="text-capitalize mt-5"
                      color="grey"
                      @click="expand2 = !expand2"
                      >
                      Voltar
                    </v-btn>
                  </div>
              </div>
            </v-slide-y-reverse-transition>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

const expand2 = ref(false)
</script>
<style lang="scss" scoped>
.custom {
  // background-image: url("../assets/Revenue-bro.svg");
  // background-size: cover; /* ajusta o tamanho da imagem para cobrir todo o elemento */
  background-repeat: no-repeat; /* evita que a imagem seja repetida */
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  font-size: 30px;

  &--title {
    color: #B9E9BF;
  }

  &--subtitle {
    color: #f2f2f2;
  }

  & > img {
    margin-top: 30px;
  }

  &-btn {
    background: #B9E9BF;
    margin: 20px;
    width: 200px;
    height: 60px;
  }
}

.main {
  padding: 0 20px;
  background: #222;
}

.floating { 
  animation-name: floating;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  margin-left: 30px;
  margin-top: 5px;
}
 
@keyframes floating {
  0% { transform: translate(0,  0px); }
  50%  { transform: translate(30px, 0px); }
  100%   { transform: translate(0, -0px); }   
}


.one span {
  font-size: 35px;
	// color: #B9E9BF;
	opacity: 0;
	transform: translate(-150px, -50px) rotate(-180deg) scale(3);
	animation: revolveScale .4s forwards;
}

.animate span:nth-of-type(2) {
	animation-delay: 1.05s;
}
.animate span:nth-of-type(3) {
	animation-delay: 1.1s;
}
.animate span:nth-of-type(4) {
	animation-delay: 2.9s;
}
.animate span:nth-of-type(5) {
	animation-delay: 2.00s;
}
.animate span:nth-of-type(6) {
	animation-delay: 2.05s;
}
.animate span:nth-of-type(7) {
	animation-delay: 2.15s;
}
.animate span:nth-of-type(8) {
	animation-delay: 2.5s;
}

@keyframes revolveScale {
	20% {
		transform: translate(20px, 20px) rotate(30deg) scale(.3);
    color: #FFF;
	}

  60% {
    color: #46754D;
  }

  70% {
    color: #93F5A0;
	}
  
  80% {
    color: white;
	}

	100% {
		transform: translate(0) rotate(0) scale(1);
		opacity: 1;
    color: #74C27F;
	}
}
</style>
