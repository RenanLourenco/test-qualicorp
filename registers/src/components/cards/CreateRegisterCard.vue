<template>
  <v-alert
  text="Marcação feita!"
  type="success"
  class="mb-3"
  v-if="success"
  >
  </v-alert>
  <v-alert
  :text="errorMsg"
  type="error"
  class="mb-3"
  v-if="error"
  >

  </v-alert>
  <v-card
  width="500"
    class="pa-5 align-center justify-center"
    style="height: 300px;"
  >
    <template v-slot:title>
      <div >
        <span>Marcar ponto</span>
      </div>
    </template>
    <v-form @submit.prevent="create">
      <v-responsive
      max-width="344"
      >
        <v-text-field v-model="registerName" label="Motivo" required></v-text-field>

      </v-responsive>
        <v-btn
        class="me-4"
        primary
        type="submit"

        >
        Marcar
        </v-btn>

    </v-form>
  </v-card>
</template>
<script lang="ts">
import Register from './../../lib/register'
export default {
  data(){
    return {
      registerName:"",
      error: false,
      errorMsg: "",
      success: false,
    }
  },
  methods:{
    hideSuccessAlert() {
      window.setInterval(() => {
        this.success = false;
      }, 5000)
    },
    hideErrorAlert() {
      window.setInterval(() => {
        this.error = false;
        this.errorMsg = "";
      }, 5000)
    },
    async create() {

      try {
        if(this.registerName == "") {
          this.error = true
          this.errorMsg = "Motivo inválido"
          this.hideErrorAlert()
          return
        }
        await Register.createRegister(this.registerName)
        this.success = true
        this.registerName = ''
        this.hideSuccessAlert()
      } catch (error: any) {
        const err = error as string
        this.error = true
        this.errorMsg = err
        this.hideErrorAlert()
      }
    },


  }
}
</script>
