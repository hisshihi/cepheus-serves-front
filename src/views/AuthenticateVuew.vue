<template>
  <div class="center-form" style="margin-bottom: 300px">
    <form action="" method="post">
      <label for="">Электронная почта</label>
      <input
        v-model="email"
        type="email"
        name=""
        id=""
        autocomplete="email"
        placeholder="Введите свой email"
        autofocus
        required
      />

      <label for="">Пароль</label>
      <input
        v-model="password"
        type="password"
        name=""
        id=""
        placeholder="Введите свой пароль"
        autocomplete="current-password"
        required
      />

      <button-component
        @click.prevent="submitAuth"
        :name="'Войти'"
        :type="submit"
      ></button-component>
      <p class="error">{{ message }}</p>
      <div class="center"><p class="text">Ещё нет аккаунта?</p></div>
      <router-link to="/register"
        ><button-component
          :name="'Зарегистрироваться'"
          :class="'buttonGray'"
        ></button-component
      ></router-link>
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
      message: "",
    };
  },

  methods: {
    submitAuth() {
      const data = {
        email: this.email,
        password: this.password,
      };

      axios
        .post(
          "https://cepheus-serves-spring-production.up.railway.app/authenticate",
          data
        )
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.email = "";
          this.password = "";
          window.location.href = "/";
        })
        .catch((error) => (this.message = "Логин или пароль не верный"));
    },
  },
};
</script>

<style scoped>
/* .center-form {
  max-width: 900px;
  margin: 0 auto;
} */

.error {
  color: red;
  font-weight: 400;
  font-size: 18px;
}
</style>
