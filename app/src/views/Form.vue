<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="50"
      :rules="nameRules"
      label="Informe o nome completo"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Informe apenas um e-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="ra"
      :rules="raRules"
      label="Informe o registro academico"
      required
    ></v-text-field>

    <v-text-field
      v-model="cpf"
      :rules="cpfRules"
      label="Informe o número do documento"
      required
    ></v-text-field>

    <v-btn
      class="mr-4"
      @click="reset"
    >
      Cancelar
    </v-btn>

    <v-btn
      @click="save"
    >
      Salvar
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Nome é obrigatório',
        v => (v && v.length <= 50) || 'Nome deve ser menosr que 50',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail é obrigatório',
        v => /.+@.+\..+/.test(v) || 'E-mail deve ser válido',
      ],
      ra: '',
      raRules: [
        v => !!v || 'RA é obrigatório',
        v => /[0-9]/.test(v) || 'Apenas números',
      ],
      cpf: '',
      cpfRules: [
        v => !!v || 'CPF obrigatório',
        v => /[0-9]{11}/.test(v) || 'CPF deve ser válido',
      ],
    }),

    methods: {
      async save() {
        const res = await fetch('http://localhost:3000/students', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            ra: parseInt(this.ra),
            cpf: this.cpf
          })
        })
        console.log(res)
        const json = await res.json()
        console.log(json)
        this.$router.push('/');
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>