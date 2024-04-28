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
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Email</div>
                <div class="contact">{{ email }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component :name="'Редактировать'"></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Телефон</div>
                <div class="contact">{{ phone }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component :name="'Редактировать'"></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.1956 5.96875L21.8831 2.6875C21.6553 2.11944 21.1039 1.74789 20.4919 1.75H17.25V1C17.25 0.585786 16.9142 0.25 16.5 0.25H2.25C1.42157 0.25 0.75 0.921573 0.75 1.75V12.25C0.75 13.0784 1.42157 13.75 2.25 13.75H3.84375C4.18363 15.0774 5.37974 16.0059 6.75 16.0059C8.12026 16.0059 9.31637 15.0774 9.65625 13.75H14.3438C14.6836 15.0774 15.8797 16.0059 17.25 16.0059C18.6203 16.0059 19.8164 15.0774 20.1562 13.75H21.75C22.5784 13.75 23.25 13.0784 23.25 12.25V6.25C23.2503 6.15361 23.2318 6.05809 23.1956 5.96875ZM17.25 3.25H20.4919L21.3919 5.5H17.25V3.25ZM2.25 1.75H15.75V7.75H2.25V1.75ZM6.75 14.5C5.92157 14.5 5.25 13.8284 5.25 13C5.25 12.1716 5.92157 11.5 6.75 11.5C7.57843 11.5 8.25 12.1716 8.25 13C8.25 13.8284 7.57843 14.5 6.75 14.5ZM14.3438 12.25H9.65625C9.31637 10.9226 8.12026 9.99412 6.75 9.99412C5.37974 9.99412 4.18363 10.9226 3.84375 12.25H2.25V9.25H15.75V10.4041C15.0534 10.8067 14.547 11.4715 14.3438 12.25ZM17.25 14.5C16.4216 14.5 15.75 13.8284 15.75 13C15.75 12.1716 16.4216 11.5 17.25 11.5C18.0784 11.5 18.75 12.1716 18.75 13C18.75 13.8284 18.0784 14.5 17.25 14.5ZM21.75 12.25H20.1562C19.8124 10.9261 18.6179 10.0013 17.25 10V7H21.75V12.25Z"
                      fill="#121417"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Адрес</div>
                <div class="contact">{{ address }}</div>
              </div>
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
      address: "",
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
          this.address = user.address;
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
  /* margin-bottom: 40px; */
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
  margin: 27px 0 37px 0;
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

svg {
  width: 20px;
  height: 20px;
}

.svg-container {
  background-color: rgb(232, 237, 245);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: background-color 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05);
  cursor: pointer;
}

.svg-container:hover {
  background-color: rgba(13, 127, 242, 0.5);
}

.contact-container-data {
  display: flex;
}
</style>
