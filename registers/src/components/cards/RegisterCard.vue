<template>
    <v-card elevation="16" max-width="360" height="300" >
      <v-card-title class="justify-center">Ultima marcação</v-card-title>
      <v-card-text>
        <div class="text-h3 border-sm pa-10">
          <span>{{lastRegister}}</span>
        </div>
      </v-card-text>
    </v-card>
</template>
<script lang="ts">
import Register from '../../lib/register';

export default {
  data() {
    return {
      lastRegister: "",
    }
  },
  methods: {
    formatTime(dateString: string): string {
      const date = new Date(dateString);

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    }
  },
  async mounted() {
    const registers = await Register.getRegisters()
    if (registers.length > 0) {
      const register = registers[registers.length - 1]
      this.lastRegister = this.formatTime(register.registeredAt)
    }
  },

}
</script>
