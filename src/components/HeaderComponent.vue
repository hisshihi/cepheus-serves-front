<template>
  <header>
    <div class="container">
      <nav class="nav">
        <router-link to="/"
          ><img src="../assets/logo.png" alt=""
        /></router-link>
        <!-- <ul class="ul" v-if="role != '[ADMIN]'">
          <li class="li"><a class="link" href="#">О нас</a></li>
          <li class="li"><a class="link" href="#">Товары</a></li>
          <li class="li"><a class="link" href="#">Контакты</a></li>
        </ul> -->
        <!-- <ul class="ul" v-else>
          <router-link to="/admin/user" class="li"
            ><li class="li">
              <a class="link" href="#">Пользователи</a>
            </li></router-link
          >
          <router-link to="/admin/products" class="li">
            <li class="li"><a class="link" href="#">Товары</a></li>
          </router-link>
          <li class="li"><a class="link" href="#">Заказы</a></li>
          <li class="li"><a class="link" href="#">Статистика</a></li>
        </ul> -->
        <ul class="ul">
          <!-- не админ -->
          <div v-if="role != '[ADMIN]'" class="navigation">
            <li class="li"><a class="link" href="/">Главная</a></li>
            <li class="li"><a class="link" href="#">Товары</a></li>
            <router-link to="/company" class="li">
              <p>Компания</p>
            </router-link>
          </div>
          <!-- Админ -->
          <div v-else class="navigation">
            <router-link to="/admin/user" class="li"
              ><li class="li">
                <a class="link" href="#">Пользователи</a>
              </li></router-link
            >
            <router-link to="/admin/products" class="li">
              <li class="li"><a class="link" href="#">Товары</a></li>
            </router-link>
            <router-link to="/admin/products" class="li">
              <li class="li"><a class="link" href="#">Заказы</a></li>
            </router-link>
            <router-link to="/admin/products" class="li">
              <li class="li"><a class="link" href="#">Статистика</a></li>
            </router-link>
            <router-link to="/admin/slider" class="li">
              <li class="li"><a class="link" href="#">Слайдер</a></li>
            </router-link>
          </div>

          <li class="li">
            <a class="link" href="#"> </a>
            <router-link to="/basket">
              <div class="svg-container">
                <div class="baskets-length">
                  {{ basketsLength }}
                </div>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.3547 4.09922C17.2359 3.95709 17.0602 3.87497 16.875 3.875H4.27187L3.88984 1.77656C3.78186 1.18219 3.26426 0.750087 2.66016 0.75H1.25C0.904822 0.75 0.625 1.02982 0.625 1.375C0.625 1.72018 0.904822 2 1.25 2H2.65625L4.65312 12.9602C4.71195 13.2852 4.8556 13.5889 5.06953 13.8406C4.24996 14.6061 4.14205 15.8674 4.81967 16.761C5.49729 17.6546 6.74093 17.891 7.69916 17.3084C8.6574 16.7257 9.01981 15.5128 8.53828 14.5H12.0867C11.9469 14.7927 11.8745 15.1131 11.875 15.4375C11.875 16.6456 12.8544 17.625 14.0625 17.625C15.2706 17.625 16.25 16.6456 16.25 15.4375C16.25 14.2294 15.2706 13.25 14.0625 13.25H6.49766C6.1956 13.25 5.9368 13.0339 5.88281 12.7367L5.63516 11.375H14.6977C15.6038 11.3749 16.3802 10.7267 16.5422 9.83516L17.4922 4.61172C17.5247 4.42894 17.4744 4.24115 17.3547 4.09922V4.09922ZM7.5 15.4375C7.5 15.9553 7.08027 16.375 6.5625 16.375C6.04473 16.375 5.625 15.9553 5.625 15.4375C5.625 14.9197 6.04473 14.5 6.5625 14.5C7.08027 14.5 7.5 14.9197 7.5 15.4375V15.4375ZM15 15.4375C15 15.9553 14.5803 16.375 14.0625 16.375C13.5447 16.375 13.125 15.9553 13.125 15.4375C13.125 14.9197 13.5447 14.5 14.0625 14.5C14.5803 14.5 15 14.9197 15 15.4375V15.4375ZM15.3125 9.61172C15.2584 9.90978 14.9982 10.1261 14.6953 10.125H5.40781L4.49922 5.125H16.1258L15.3125 9.61172Z"
                    fill="#0D141C"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li class="li" v-if="token">
            <router-link to="/authenticate">
              <div class="svg-container">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.0406 15.0625C15.8508 13.0055 14.0172 11.5305 11.8773 10.8313C14.053 9.53609 15.0951 6.94698 14.4235 4.50575C13.7518 2.06451 11.5319 0.372875 9 0.372875C6.46806 0.372875 4.24816 2.06451 3.57652 4.50575C2.90487 6.94698 3.94704 9.53609 6.12266 10.8313C3.98281 11.5297 2.14922 13.0047 0.959375 15.0625C0.840586 15.2562 0.836273 15.4991 0.948109 15.6969C1.05995 15.8947 1.27031 16.0162 1.49752 16.0142C1.72473 16.0123 1.93298 15.8872 2.04141 15.6875C3.51328 13.1437 6.11484 11.625 9 11.625C11.8852 11.625 14.4867 13.1437 15.9586 15.6875C16.067 15.8872 16.2753 16.0123 16.5025 16.0142C16.7297 16.0162 16.9401 15.8947 17.0519 15.6969C17.1637 15.4991 17.1594 15.2562 17.0406 15.0625V15.0625ZM4.625 6C4.625 3.58375 6.58375 1.625 9 1.625C11.4162 1.625 13.375 3.58375 13.375 6C13.375 8.41625 11.4162 10.375 9 10.375C6.58483 10.3724 4.62758 8.41517 4.625 6V6Z"
                    fill="#0D141C"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li class="li" v-else>
            <router-link to="/user">
              <div class="svg-container">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.0406 15.0625C15.8508 13.0055 14.0172 11.5305 11.8773 10.8313C14.053 9.53609 15.0951 6.94698 14.4235 4.50575C13.7518 2.06451 11.5319 0.372875 9 0.372875C6.46806 0.372875 4.24816 2.06451 3.57652 4.50575C2.90487 6.94698 3.94704 9.53609 6.12266 10.8313C3.98281 11.5297 2.14922 13.0047 0.959375 15.0625C0.840586 15.2562 0.836273 15.4991 0.948109 15.6969C1.05995 15.8947 1.27031 16.0162 1.49752 16.0142C1.72473 16.0123 1.93298 15.8872 2.04141 15.6875C3.51328 13.1437 6.11484 11.625 9 11.625C11.8852 11.625 14.4867 13.1437 15.9586 15.6875C16.067 15.8872 16.2753 16.0123 16.5025 16.0142C16.7297 16.0162 16.9401 15.8947 17.0519 15.6969C17.1637 15.4991 17.1594 15.2562 17.0406 15.0625V15.0625ZM4.625 6C4.625 3.58375 6.58375 1.625 9 1.625C11.4162 1.625 13.375 3.58375 13.375 6C13.375 8.41625 11.4162 10.375 9 10.375C6.58483 10.3724 4.62758 8.41517 4.625 6V6Z"
                    fill="#0D141C"
                  />
                </svg>
              </div>
            </router-link>
          </li>
          <li class="li">
            <a class="link" href="#">
              <div class="svg-container">
                <svg
                  width="18"
                  height="15"
                  viewBox="0 0 18 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.9062 0C11.293 0 9.88047 0.69375 9 1.86641C8.11953 0.69375 6.70703 0 5.09375 0C2.41987 0.0030138 0.253014 2.16987 0.25 4.84375C0.25 10.3125 8.35859 14.7391 8.70391 14.9219C8.88878 15.0213 9.11122 15.0213 9.29609 14.9219C9.64141 14.7391 17.75 10.3125 17.75 4.84375C17.747 2.16987 15.5801 0.0030138 12.9062 0V0ZM9 13.6562C7.57344 12.825 1.5 9.03828 1.5 4.84375C1.50258 2.86005 3.11005 1.25258 5.09375 1.25C6.61328 1.25 7.88906 2.05938 8.42188 3.35938C8.51818 3.59382 8.74654 3.7469 9 3.7469C9.25346 3.7469 9.48182 3.59382 9.57812 3.35938C10.1109 2.05703 11.3867 1.25 12.9062 1.25C14.89 1.25258 16.4974 2.86005 16.5 4.84375C16.5 9.03203 10.425 12.8242 9 13.6562V13.6562Z"
                    fill="#0D141C"
                  />
                </svg>
              </div>
            </a>
          </li>
          <li v-if="!token" class="li" @click="logout()">
            <a class="link" href="#">
              <div class="svg-container">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path
                    d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
                  />
                </svg>
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import axios from 'axios'

export default {
  name: "Header",

  props: {
    role: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      token: true,
      basketsLength: []
    };
  },

  mounted() {
    this.checkToken();
    this.getResponseBasket()
  },

  methods: {
    checkToken() {
      const isExistsToken = localStorage.getItem("token");
      if (isExistsToken) {
        this.token = false;
      }
    },
    logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
    getResponseBasket() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      axios.get("http://localhost:8080/basket/in-basket", {headers})
      .then(response => {
        this.basketsLength = response.data.length;
      })
      .catch(error => console.log(error))
    },
    
  },
};
</script>

<style scoped>
.ul {
  display: flex;
  padding: 0;
  margin: 0;
  align-items: center;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 6px 10px;
}

.navigation {
  display: flex;
  align-items: center;
}

.navigation > .li {
  margin-right: 36px;
  font-size: 23px;
  font-weight: 400;
}

/* .li:nth-child(2) {
  margin: 0 10px;
  margin-right: 10px;
  margin-left: 10px;
} */

/* .li:nth-child(3) {
  margin: 0 10px;
  margin-right: 10px;
} */

.li > .link {
  font-size: 23px;
  font-weight: 400;
}

img {
  width: 60px;
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
  position: relative;
}

.svg-container:hover {
  background-color: rgba(13, 127, 242, 0.5);
}

.baskets-length {
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px;
  color: #1A80E5;
  border-radius: 50%;
}

header {
  border-bottom: 1px #e5e8eb solid;
  /* max-height: 65px; */
}
</style>
