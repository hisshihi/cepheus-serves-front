<template>
  <div>
    <div class="user">
      <div class="user-data">
        <div class="user-data-case"><p class="user-data-text">{{firstname}}</p></div>
        <div class="user-data-case"><p class="user-data-text">{{lastname}}</p></div>
        <div class="user-data-case"><p class="user-data-text">{{email}}</p></div>
        <div class="user-data-case"><p class="user-data-text">{{phone}}</p></div>
      </div>
      <div class="user-settings">
        <div class="dropdown">
          <button class="dropbtn" @click="toggleDropdown">Настройки <img :class="{imageBtnRotate: dropdownVisible}" class="imageBtn" src="../assets/arrow.png" alt="arrow"></button>
          <div class="dropdown-content" v-if="dropdownVisible">
            <a href="#">Изменить данные</a>
            <a href="#">Сменить пароль</a>
            <a href="#">Удалить аккаунт</a>
          </div>
        </div>
      </div>
    </div>
    <!--      Заказы-->
    <h2>Мои заказы</h2>
    <div class="orders">
      <div class="dropdown">
        <button class="dropbtn dropbtn-width" @click="">Выполненные <img class="imageBtn imageBtn-static" src="../assets/arrow.png" alt="arrow"></button>
        <div class="dropdown-content" v-if="false">
<!--          <a href="#">Изменить данные</a>-->
<!--          <a href="#">Сменить пароль</a>-->
<!--          <a href="#">Удалить аккаунт</a>-->
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn dropbtn-width" @click="">В ожидании <img class="imageBtn imageBtn-static" src="../assets/arrow.png" alt="arrow"></button>
        <div class="dropdown-content" v-if="false">
<!--          <a href="#">Изменить данные</a>-->
<!--          <a href="#">Сменить пароль</a>-->
<!--          <a href="#">Удалить аккаунт</a>-->
        </div>
      </div>
      <div class="dropdown">
        <button class="dropbtn dropbtn-width" @click="">Отклонённые <img class="imageBtn imageBtn-static" src="../assets/arrow.png" alt="arrow"></button>
        <div class="dropdown-content" v-if="false">
<!--          <a href="#">Изменить данные</a>-->
<!--          <a href="#">Сменить пароль</a>-->
<!--          <a href="#">Удалить аккаунт</a>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {

    data() {
        return {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            dropdownVisible: false,
        }
    },

  mounted() {
    this.getUser();
  },

  methods: {
    getUser() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post("https://cepheus-serves-spring-production.up.railway.app/" + token, {}, { headers })
        .then((response) => {
            const user = response.data;
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.email = user.email;
            this.phone = user.phone;
        })
        .catch((error) => console.log(error));
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
  },
};
</script>

<style scoped>

.user {
  border-radius: 15px;
  background-color: #EFEEEE;
  -webkit-box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.39);
  -moz-box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.39);
  box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.24);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 24px;
}

.user-data {
  display: grid;
}

.user-data-text {
  font-size: 23px;
  font-weight: 400;
  color: black;
  display: grid;
  justify-items: center;
}

.user-data-case {
  width: 372px;
  background-color: #26A9F3;
  margin-left: 30px;
  margin-bottom: 16px;
  border-radius: 10px;

}

.user-data-case:nth-child(1) {
  margin-top: 58px;
}

.user-data-case:nth-child(4) {
  margin-bottom: 94px;
}

.user-settings {
  margin-right: 110px;
  margin-top: 51px;
}


.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  text-align: center;
  font-size: 23px;
  font-weight: 700;
  padding: 0 10px;
  height: 60px;
  width: 301px;
  line-height: 30px;
  background-color: #FFFFFF;
  color: black;
  cursor: pointer;
  border: 1px black solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  -webkit-box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.39);
  -moz-box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.39);
  box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.24);
  z-index: 1;
  display: block;
  width: 301px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px black solid;
}

.imageBtn {
  position: relative;
  left: 55px;
}

.imageBtnRotate {
  transform: rotate(180deg);
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  transition: 0.3s;
  border-bottom: 1px black solid;
  text-align: center;
  font-weight: 300;
  font-size: 23px;
}

.dropdown-content a:nth-child(1) {
  border-radius: 10px 10px 0 0;
}

.dropdown-content a:nth-child(3) {
  border-radius: 0 0 10px 10px;
  border-bottom: none;
}

.dropdown-content a:hover {background-color: #26A9F3}

/* Заказы */
.orders {
  display: grid;
}

.dropbtn-width {
  width: 100%;
  margin-bottom: 32px;
  justify-content: space-between;
}

.imageBtn-static {
  left: 0;
}

</style>
