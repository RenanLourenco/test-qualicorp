<template>
  <div class="">
    <RegisterCard />
  </div>
  <div class="top-0">
    <RegisterDataTable />
  </div>
</template>

<script lang="ts">

import { useAppStore } from '@/stores/app';
export default {
  data() {
    return {
      userName: "",
      userNameFirstLetter: "",
      userEmail: "",
    }
  },
  mounted() {
    const store = useAppStore()
    const token = store.token

    this.userName = store.userName as string
    this.userEmail = store.userEmail as string

    if (this.userName) {
      const firstLetter = this.userName[0]
      this.userNameFirstLetter = firstLetter
    }
    if (!token) {
      this.$router.push("/login")
    }
  }
}
</script>

<style>

</style>
