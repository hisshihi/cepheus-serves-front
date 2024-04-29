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
        :oninput="onlyRussianInput"
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
        :oninput="onlyRussianInput"
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
        :oninput="onlyEmailInput"
      />

      <label for="">Номер телефона</label>
      <input-mask
        id="basic"
        mask="+7 (999) 999-99-99"
        v-model="phone"
        type="tel"
        name=""
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
        placeholder="Введите ваш адрес"
        required
        autocomplete="street-address"
      />

      <!-- Блок организации -->
      <div class="in-organization">
        <div class="checkbox-container">
          <input type="checkbox" class="ui-checkbox" v-model="inOrganization" />
          <label for="">Организация</label>
        </div>
        <div class="organization" v-if="inOrganization">
          <label for="">Название организации</label>
          <input
            type="text"
            placeholder="Введите название"
            required
            v-model="orgName"
          />
          <label for="">Юридический адрес</label>
          <input
            type="adderss"
            placeholder="Введите юридический адрес"
            v-model="orgAddress"
            required
          />
          <label for="">ИНН</label>
          <input-mask
            id="basic"
            mask="999999999999"
            type="text"
            placeholder="Введите ИНН"
            v-model="orgINN"
            required
          />
        </div>
      </div>

      <label for="">Пароль</label>
      <Password
        v-model="password"
        type="password"
        name=""
        id=""
        placeholder="Введите пароль"
        required
        autocomplete="password"
        promptLabel="Пароль не должен быть меньше 8 символов"
        weakLabel="Слабый"
        mediumLabel="Средний"
        strongLabel="Сильный"
        toggleMask
      />

      <label for="">Повторите пароль</label>
      <Password
        v-model="repeatPassword"
        type="password"
        name=""
        id=""
        placeholder="Повторите ранее указанный пароль"
        promptLabel="Пароль не должен быть меньше 8 символов"
        weakLabel="Слабый"
        mediumLabel="Средний"
        strongLabel="Сильный"
        toggleMask
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
import InputMask from "primevue/inputmask";
import Password from "primevue/password";

export default {
  components: {
    ButtonComponent,
    InputMask,
    Password,
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
      inOrganization: false,
      orgName: "",
      orgAddress: "",
      orgINN: "",
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
        inOrganization: this.inOrganization,
        orgName: this.orgName,
        orgAddress: this.orgAddress,
        orgINN: Number(this.orgINN),
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
          this.address = "";
          this.password = "";
          this.repeatPassword = "";
          this.inOrganization = false;
          this.orgName = "";
          this.orgAddress = "";
          this.orgINN = "";
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
    onlyRussianInput(event) {
      const input = event.target.value;
      const russianRegex = /^[\u0400-\u04FF]*$/;
      if (!russianRegex.test(input)) {
        event.target.value = input.replace(/[^\u0400-\u04FF]/g, "");
      }
    },
    onlyEmailInput(event) {
      const input = event.target.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(input)) {
        event.target.value = input.replace(/[^a-zA-Z0-9._%+-@]/g, "");
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

/* Input from password */
.p-password {
  position: relative;
}

.p-password > svg {
  position: absolute;
  top: 30px;
  right: 0;
  width: 20px;
  height: 20px;
}

.p-inputtext {
  width: 100%;
}

/* Checkbox */
/* checkbox settings 👇 */

.ui-checkbox {
  --primary-color: #1677ff;
  --secondary-color: #fff;
  --primary-hover-color: #4096ff;
  /* checkbox */
  --checkbox-diameter: 20px;
  --checkbox-border-radius: 5px;
  --checkbox-border-color: #d9d9d9;
  --checkbox-border-width: 1px;
  --checkbox-border-style: solid;
  /* checkmark */
  --checkmark-size: 1.2;
  padding: 10px;
}

.ui-checkbox,
.ui-checkbox *,
.ui-checkbox *::before,
.ui-checkbox *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ui-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--checkbox-diameter);
  height: var(--checkbox-diameter);
  border-radius: var(--checkbox-border-radius);
  background: var(--secondary-color);
  border: var(--checkbox-border-width) var(--checkbox-border-style)
    var(--checkbox-border-color);
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.ui-checkbox::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5)
    var(--primary-color);
  box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) var(--primary-color);
  border-radius: inherit;
  opacity: 0;
  -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  -o-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.ui-checkbox::before {
  top: 40%;
  left: 50%;
  content: "";
  position: absolute;
  width: 4px;
  height: 7px;
  border-right: 2px solid var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  -ms-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
    opacity 0.1s;
  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

/* actions */

.ui-checkbox:hover {
  border-color: var(--primary-color);
}

.ui-checkbox:checked {
  background: var(--primary-color);
  border-color: transparent;
}

.ui-checkbox:checked::before {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%) rotate(45deg)
    scale(var(--checkmark-size));
  -ms-transform: translate(-50%, -50%) rotate(45deg)
    scale(var(--checkmark-size));
  transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  -o-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.ui-checkbox:active:not(:checked)::after {
  -webkit-transition: none;
  -o-transition: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: none;
  opacity: 1;
}

/* Стили для блока организации */
.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-container > input {
  margin-bottom: 10px;
  margin-right: 20px;
}

.checkbox-container > label {
  margin: 10px 0;
}

.organization {
  margin-bottom: 20px;
}
</style>
