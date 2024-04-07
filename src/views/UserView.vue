<template>
  <div class="user-container">
    <!-- Панель навигации -->
    <div class="nav-bar">
      <navbar-pure-component></navbar-pure-component>
    </div>
    <!-- Информация о пользователе -->
    <div class="user">
      <!-- Изображение и другие данные -->
      <div class="user-data">
        <div class="user-image">
          <img src="../assets/user.png" alt="user" />
        </div>
        <div class="user-info">
          <div class="name">{{ firstname }} {{ lastname }}</div>
          <div class="user-change-data">
            <button-component :name="'Редактировать'"></button-component>
          </div>
        </div>
      </div>
      <!-- Заказы пользователя -->
      <div class="user-orders">
        <div class="orders orders-success">
          <div class="order-number">3</div>
          <div class="order-text">Выполненные</div>
        </div>
        <div class="orders orders-in-waiting">
          <div class="order-number">5</div>
          <div class="order-text">В ожидании</div>
        </div>
        <div class="orders orders-rejected">
          <div class="order-number">1</div>
          <div class="order-text">Отклонённые</div>
        </div>
      </div>
      <!-- Контакты пользователя -->
      <div class="user-contact">
        <div class="title-contact">Контактная информация</div>
        <div class="contact-info">
          <div class="contant-container">
            <div>
              <div class="contact-label">Email</div>
              <div class="contact">{{ email }}</div>
            </div>
            <div class="contact-button">
              <button-component :name="'Редактировать'"></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div>
              <div class="contact-label">Телефон</div>
              <div class="contact">{{ phone }}</div>
            </div>
            <div class="contact-button">
              <button-component :name="'Редактировать'"></button-component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NavbarPureComponent from "@/components/NavbarPureComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  components: {
    NavbarPureComponent,
    ButtonComponent,
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      dropdownVisible: false,
    };
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
        .post("http://localhost:8080/users/" + token, {}, { headers })
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
.user-container {
  display: flex;
}

/* Стили пользователя */
.user {
  display: grid;
  margin: 0 auto;
  margin-top: 50px;
}

.user-data {
  display: grid;
  justify-items: center;
}

.user-image > img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 13px;
}

.name {
  font-weight: 700;
  text-align: center;
  font-size: 23px;
  margin-bottom: 11px;
}

/* Стили заказов */

.orders {
  width: 211px;
  height: 76px;
  border: 1px solid black;
  margin: 0 21.5px;
  border-radius: 10px;
  display: grid;
  align-items: center;
  justify-items: center;
}

.user-orders {
  display: flex;
}

.order-number {
  font-size: 23px;
  font-weight: 400;
}

.order-text {
  font-size: 23px;
  font-weight: 400;
}

/* Стили для блока с контактами */
.title-contact {
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 38px;
}

.contant-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
}

.contact-label {
  font-size: 18px;
  font-weight: 500;
}

.contact {
  font-size: 16px;
  font-weight: 400;
}
</style>
