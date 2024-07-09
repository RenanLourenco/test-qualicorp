<template>
  <v-navigation-drawer color="blue-darken-4" :width="250" v-if="verifyIfAlreadyLogged">
    <v-list>
      <v-list-item title="Bem vindo,">{{ userName }}</v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>

      <v-list-item to="/" prepend-icon="mdi-view-dashboard" title="Inicio" value="inicio"></v-list-item>
      <v-list-item to="/registrar" prepend-icon="mdi-clock-start" title="Registrar" value="registrar"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout">
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
//@ts-ignore
import { useAppStore } from '@/stores/app';
export default {
  data() {
    return {
      userName: "",
      userEmail: "",
      loginPage: false,
      route: this.$route.name,
    }
  },
  computed: {
    verifyIfAlreadyLogged() {
      const route = this.$route.name
      if (route == "/login") return false

      const store = useAppStore()
      const token = store.token
      if (!token) {
        this.$router.push("/login")
        return false
      }
      this.userName = store.userName as string
      this.userEmail = store.userEmail as string
      return true
    }

  },
  methods: {
    logout() {
      const store = useAppStore()
      store.$reset()
    }
  },

}


</script>
