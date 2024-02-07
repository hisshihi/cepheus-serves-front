<template>
  <div>
    <form action="" method="post">
      <label for="">Имя</label>
      <input v-model="firstname" type="text" name="" id="" />

      <label for="">Фамилия</label>
      <input v-model="lastname" type="text" name="" id="" />

      <label for="">Электронная почта</label>
      <input v-model="email" type="email" name="" id="" />

      <label for="">Номер телефона</label>
      <input v-model="phone" type="tel" name="" id="" />

      <label for="">Пароль</label>
      <input v-model="password" type="password" name="" id="" />

      <label for="">Повторите пароль</label>
      <input v-model="repeatPassword" type="password" name="" id="" />

      <button-component
        @click.prevent="submitReg"
        :disabled="checkPasswordReturn !== 1"
        :name="'Зарегестрироваться'"
        :type="submit"
      ></button-component>
      <p>{{ message }}</p>
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
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      repeatPassword: "",
      checkPasswordReturn: 0,
      message: "",
    };
  },

  watch: {
    password(newPassword) {
      this.checkPassword();
    },
    repeatPassword(newRepeatPassword) {
      this.checkPassword();
    },
  },

  methods: {
    submitReg() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        phone: this.phone,
        password: this.password,
      };

      axios
        .post("http://localhost:8080/register", data)
        .then((response) => {
          // console.log(response.data.token);
          console.log(response);
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.firstname = "";
          this.lastname = "";
          this.email = "";
          this.phone = "";
          this.password = "";
          this.repeatPassword = "";
          window.location.href = "/"
        })
        .catch((error) => {
          console.log(error);
          this.message = "Пользователь с таким Email уже существует"
        });
    },
    checkPassword() {
      if (this.password.length !== 0) {
        if (this.password === this.repeatPassword) {
          this.checkPasswordReturn = 1;
        } else {
          this.checkPasswordReturn = 2;
        }
      }
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
