<template>
  <div style="margin-bottom: 50px" class="center-form">
    <form action="" method="post">
      <label for="">Имя</label>
      <input
        v-model="firstname"
        type="text"
        name=""
        id=""
        autofocus
        required
        placeholder="Введите ваше имя"
        autocomplete="firstname"
      />

      <label for="">Фамилия</label>
      <input
        v-model="lastname"
        type="text"
        name=""
        id=""
        required
        placeholder="Введите вашу фамилию"
        autocomplete="lastname"
      />

      <label for="">Электронная почта</label>
      <input
        v-model="email"
        type="email"
        name=""
        id=""
        required
        placeholder="Введите ваш email"
        autocomplete="email"
      />

      <label for="">Номер телефона</label>
      <input
        v-model="phone"
        type="tel"
        name=""
        id=""
        placeholder="Введите ваш телефон"
        required
        autocomplete="phone"
      />

      <label for="">Адрес</label>
      <input
        v-model="address"
        type="address"
        name=""
        id=""
        placeholder="Введите ваш телефон"
        required
        autocomplete="street-address"
      />

      <label for="">Пароль</label>
      <input
        v-model="password"
        type="password"
        name=""
        id=""
        placeholder="Введите пароль"
        required
        autocomplete="password"
      />

      <label for="">Повторите пароль</label>
      <input
        v-model="repeatPassword"
        type="password"
        name=""
        id=""
        placeholder="Повторите ранее указанный пароль"
        required
      />

      <button-component
        @click.prevent="submitReg"
        :disabled="checkPasswordReturn !== 1"
        :name="'Зарегестрироваться'"
        :type="submit"
      ></button-component>
      <p class="error">{{ message }}</p>
      <div class="center"><p class="text">Уже есть аккаунт?</p></div>
      <router-link to="/authenticate"
        ><button-component
          :name="'Войти'"
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
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      address: "",
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
        address: this.address,
        password: this.password,
      };

      axios
        .post("https://cepheus-serves-spring-production.up.railway.app/register", data)
        .then((response) => {
          // console.log(response.data.token);
          console.log(response);
          const token = response.data.token;
          localStorage.setItem("token", token);
          this.firstname = "";
          this.lastname = "";
          this.email = "";
          this.phone = "";
          this.address = "";
          this.password = "";
          this.repeatPassword = "";
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
          this.message = "Пользователь с таким Email уже существует";
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

<style>
form {
  display: grid;
}

input {
  margin-bottom: 20px;
}

.error {
  color: red;
  font-weight: 400;
  font-size: 18px;
}

.center-form {
  max-width: 700px;
  margin: 0 auto;
}
</style>
