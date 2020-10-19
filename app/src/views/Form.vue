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
      :disabled="isUpdate"
      v-model="ra"
      :rules="raRules"
      label="Informe o registro academico"
      required
    ></v-text-field>

    <v-text-field
      :disabled="isUpdate"
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
      @click="handleButtonClick"
    >
      Salvar
    </v-btn>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      idUpdate: false,
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
        v => /([0-9]){11}/.test(v) || 'CPF deve ser válido',
        v => v.length === 11 || 'CPF deve ser válido'
      ],
    }),
    async beforeMount() {
      if(this.$route.params.id) {

        this.isUpdate = true

        const res = await fetch('http://localhost:3000/students/' + this.$route.params.id)

        if (res.ok) {
          const data = await res.json();
          this.name = data.name
          this.email = data.email
          this.ra = data.ra
          this.cpf = data.cpf
        } else {
          this.$router.push('/');
        }

      }
    },
    methods: {
      handleButtonClick() {

        if(this.$route.params.id) {
          return this.update()
        } else {
          return this.save()
        }

      },
      async update() {
        const res = await fetch('http://localhost:3000/students/' + this.$route.params.id, {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            ra: parseInt(this.ra),
            cpf: this.cpf
          })
        })
        if (res.ok) {
          this.$router.push('/');
        }
      },
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
        if (res.ok) {        
          this.$router.push('/');
        }
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$router.push('/');
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>