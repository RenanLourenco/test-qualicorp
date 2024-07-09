<template>
  <v-dialog v-model="loginSection" persistent max-width="500px">
    <v-card>
      <v-card-title>Entre no sistema!</v-card-title>
      <v-alert closable  v-if="errorLogin" text="Erro ao efetuar o login, verifique suas credenciais" type="error"></v-alert>
      <v-card-text >
        <v-form @submit.prevent="login" >
          <v-text-field v-model="email" label="E-mail"></v-text-field>
          <v-text-field v-model="password" label="Senha" type="password"></v-text-field>
          <div class="d-flex flex-row justify-space-between">
            <v-btn type="submit" color="primary">Login</v-btn>
            <v-btn color="green" @click="changeLoginToRegister">Registrar</v-btn>
          </div>
        </v-form>

      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog v-model="registerSection" persistent max-width="500px">
    <v-card>
      <v-card-title>Área de registro</v-card-title>
      <v-alert closable  v-if="errorLogin" text="Erro ao efetuar o login, verifique suas credenciais" type="error"></v-alert>
      <v-card-text >
        <v-form @submit.prevent="register" >
          <v-text-field v-model="name" label="Nome"></v-text-field>
          <v-text-field v-model="email" label="E-mail"></v-text-field>
          <v-text-field v-model="password" label="Senha" type="password"></v-text-field>
          <div class="d-flex flex-row justify-space-between">
            <v-btn type="submit" color="primary">Registrar</v-btn>
            <v-btn color="yellow-darken-4" @click="changeRegisterToLogin">Voltar ao login</v-btn>
          </div>
        </v-form>

      </v-card-text>
    </v-card>
  </v-dialog>

</template>
<script lang="ts">
import { useAppStore } from '@/stores/app';

import Auth, { AuthLoginResponse, AuthRegisterResponse } from '@/lib/auth';
import User from '@/lib/user'


export default {
  data(){
    return {
      dialog: true,
      name:"",
      email: "",
      password: "",
      errorLogin: false,
      errorLoginMessage: "",
      loginSection: true,
      registerSection: false,
    }
  },
  methods: {
    changeRegisterToLogin() {
      this.loginSection = true;
      this.registerSection = false;
    },
    changeLoginToRegister() {
      this.loginSection = false;
      this.registerSection = true;
    },
    async login() {
      var token: AuthLoginResponse;
      try {
        token = await Auth.login(this.email, this.password)
        if(!token.error) {
          const store = useAppStore()
          store.$patch({token: token.token,expiresAt: token.expiresAt})
          const user = await User.getUser(this.email)
          store.$patch({token: token.token,expiresAt: token.expiresAt, userEmail: user.data.email, userName: user.data.name})
        }
        this.$router.push("/")
      } catch (error: any) {
        const err = error as string
        this.errorLogin = true
        this.errorLoginMessage = err
      }

    },
    async register() {
      var register: AuthRegisterResponse;
      try {
        register = await Auth.register(this.name,this.email, this.password)
        if(!register.error) {
          this.$router.push("/login")
          this.changeRegisterToLogin()
        }
      } catch (error: any) {
        console.log(error)
        const err = error as string
        this.errorLogin = true
        this.errorLoginMessage = err
      }

    }
  }
}



</script>
