<template>
  <div>
    <form action="" method="post">
      <label for="">Электронная почта</label>
      <input v-model="email" type="email" name="" id="" />

      <label for="">Пароль</label>
      <input v-model="password" type="password" name="" id="" />

      <button-component
        @click.prevent="submitAuth"
        :name="'Войти'"
        :type="submit"
      ></button-component>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  components: {
    ButtonComponent,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    submitAuth() {
      const data = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:8080/authenticate", data)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.email = "";
          this.password = "";
          window.location.href = "/"
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
}

input {
  margin-bottom: 20px;
}
</style>
