<template>
  <v-container>

  <div class="py-10 ml-10 fs-30">Pagina de cadastros</div>
  <v-card variant="flat">
    <div class="">
      <v-tabs
        v-model="tab"
        color="#74C27F"
      >
        <v-tab value="option-1">
          <v-icon start>
            mdi-account
          </v-icon>
          Profile
        </v-tab>
        <v-tab value="option-2">
          <v-icon start>
            mdi-credit-card
          </v-icon>
          Credits cards
        </v-tab>
        <v-tab value="option-3">
          <v-icon start>
            mdi-checkbook-arrow-right
          </v-icon>
          Transactions
        </v-tab>
      </v-tabs>
      <v-divider></v-divider>
      <v-window v-model="tab">
        <v-window-item value="option-1">
          <v-card flat>
            <v-card-text>
              <p>
                Sed aliquam ultrices mauris. Donec posuere vulputate arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed a libero.
              </p>

              <p>
                Nam ipsum risus, rutrum vitae, vestibulum eu, molestie vel, lacus. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Aliquam lobortis. Aliquam lobortis. Suspendisse non nisl sit amet velit hendrerit rutrum.
              </p>

              <p class="mb-0">
                <FormRelease></FormRelease> 
              </p>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-2">
          <v-card flat>
            <v-card-text>
              <div>
                <v-card-title>Credits cards registration</v-card-title>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                </p>

              </div>
              <FormCard></FormCard>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item value="option-3">
          <v-card flat>
            <v-card-text>
              <v-card-title>Transactions registration</v-card-title>
              <p>
                Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
              </p>

              <FormRelease></FormRelease> 
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </v-card>
</v-container>
</template>
<script>
  export default {
    data: () => ({
      tab: 'option-1',
    }),
  }
</script>