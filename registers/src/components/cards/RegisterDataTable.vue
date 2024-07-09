<template>
  <div>

    <v-data-table :headers="headers" :items="registers" :sort-by="[{ key: 'calories', order: 'asc' }]">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Marcação</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">Atualizar</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field v-model="editRegister.name" label="Nome da marcação"></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Confirmar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="text-h5">Tem certeza que quer deletar essa marcação?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialogDelete = false">Cancelar</v-btn>
                <v-btn color="green-darken-1" variant="text" @click="deleteR">Confirmar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon icon="mdi-pencil" class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon icon="mdi-delete" size="small" @click="deleteItem(item)">
          mdi-delete
        </v-icon>

      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import Register from '../../lib/register';


export default {
  data() {
    return {
      headers: [
        {
          title: "Marcação", key: "name"
        },
        {
          title: "Data", key: "registeredAt"
        },
        {
          title: "", key: "actions"
        },
      ],
      registers: [],
      dialog: false,
      dialogDelete: false,
      editRegister: {
        id: "",
        name: "",
        dateOnly: "",
        registeredAt: "",
      },
      editRegisterIndex: -1,
      defaultRegister: {
        id: "",
        name: "",
        dateOnly: "",
        registeredAt: "",
      }
    }
  },
  methods: {
    formatTime(dateString: string): string {
      const date = new Date(dateString);

      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editRegister = Object.assign({}, this.defaultRegister)
        this.editRegisterIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editRegister = Object.assign({}, this.defaultRegister)
        this.editRegisterIndex = -1
      })
    },
    async save() {
      const registerId = this.editRegister.id
      const registerName = this.editRegister.name

      //@ts-ignore
      await Register.updateRegister(registerId, {name: registerName})

      if(this.editRegisterIndex > -1) {
        Object.assign(this.registers[this.editRegisterIndex], this.editRegister)
      }
      this.close()
    },
    async deleteR() {
      const registerId = this.editRegister.id
      // const registerName = this.editRegister.name

      //@ts-ignore
      await Register.deleteRegister(registerId)
      console.log(this.editRegisterIndex)
      if(this.editRegisterIndex > -1) {
        this.registers.splice(this.editRegisterIndex, 1)
      }
      this.closeDelete()

    },
    editItem(item: { id: string, dateOnly: string, registeredAt: string, name: string }) {
      this.editRegisterIndex = this.registers.indexOf(item as never)
      this.editRegister = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item: { id: string, dateOnly: string, registeredAt: string, name: string }) {
      this.editRegisterIndex = this.registers.indexOf(item as never)
      this.editRegister = Object.assign({}, item)
      this.dialogDelete = true
    }
  },
  async mounted() {
    const registers = await Register.getRegisters()

    const formattedRegisters = registers.map((el) => {
      return {
        id: el.id,
        dateOnly: el.dateOnly,
        registeredAt: this.formatTime(el.registeredAt),
        name: el.name
      }
    })
    //@ts-ignore
    this.registers = [...formattedRegisters]

  }
}
</script>
