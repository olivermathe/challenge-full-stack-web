<template>
  <div class="home">

    <v-container>

      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-text-field
            label="Nome do Aluno"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="2"
        >
          <v-btn block>
            Pesquisar
          </v-btn>
        </v-col>

         <v-col
          cols="12"
          md="4"
        >
          <v-btn block>
            <router-link to="/form">Cadastrar Aluno</router-link>
          </v-btn>
        </v-col>

      </v-row>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th >
                Registro Acadêmico
              </th>
              <th class="text-left">
                Nome
              </th>
              <th class="text-left">
                CPF
              </th>
              <th class="text-left">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in students"
              :key="item.name"
            >
              <td>{{ item.ra }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.cpf }}</td>
              <td>ACOES</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

    </v-container>


    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const res = await fetch('http://localhost:3000/students');
      const data = await res.json();
      console.log(data)
      this.students = data;
    }
  },
  data () {
      return {
        students: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
          },
          {
            name: 'Eclair',
            calories: 262,
          },
          {
            name: 'Cupcake',
            calories: 305,
          },
          {
            name: 'Gingerbread',
            calories: 356,
          },
          {
            name: 'Jelly bean',
            calories: 375,
          },
          {
            name: 'Lollipop',
            calories: 392,
          },
          {
            name: 'Honeycomb',
            calories: 408,
          },
          {
            name: 'Donut',
            calories: 452,
          },
          {
            name: 'KitKat',
            calories: 518,
          },
        ],
      }
    },
}
</script>
