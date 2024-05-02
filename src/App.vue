<template>
  <div class="wrapper">
    <nav>
      <header-component :role="$store.state.role"></header-component>
    </nav>
      <div class="container">
        <!-- <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> -->
        <router-view />
      </div>
    <footer-component :hasScroll = "scrollBoolean"></footer-component>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";
import { jwtDecode } from "jwt-decode";

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
      scrollBoolean: false
    };
  },
  methods: {
    getToken() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const tokenDecoder = jwtDecode(token);
        const role = tokenDecoder.role;
        this.$store.state.role = role;
      }
    },
    handleHeight() {
      const container = document.querySelector(".wrapper")
      // console.log(container.clientHeight)

    },
  },
  mounted() {
    this.getToken();
    this.handleHeight();
  },
  watch: {
    '$route.path': 'handleHeight'
  },

};
</script>

<style>
@font-face {
  font-family: "Play";
  src: url("../src/assets/fonts/play/Play-Regular.ttf");
}

body {
  font-family: play;
}

*, ::after, ::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  min-height: 100%;
}

a {
  text-decoration: none;
  color: black;
}

/* .link {
  text-decoration: none;
  color: black;
} */

.li {
  list-style-type: none;
}

html {
  height: 100%;
}

h2 {
  margin-bottom: 20px;
}

h1 {
  margin-top: 20px;
}

.wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /* display: flex; */
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  flex-grow: 1;
  padding: 0 10px;
  /* min-height: 773px; */
}

/* Центрирование объекта */
.center {
  display: grid;
  align-items: center;
  justify-items: center;
}

/* Стили для слайдера */
.swiper-button-next,
.swiper-button-prev {
  color: black !important;
}

.swiper-pagination-bullet {
  background-color: black !important;
  width: 12px !important;
  height: 12px !important;;
}

.swiper-slide {
  display: grid !important;
  justify-content: center;
}


/* Стили для формы */
input, textarea {
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1px #6583a2 solid;
  padding: 20px 10px;
  width: 100%;
}

input::placeholder, textarea::placeholder {
  color: #6583a2;
  font-size: 16px;
}

input:focus, textarea:focus {
  border-color: #6583a2;
  outline: none;
  color: #6583a2;
}

textarea {
  resize: vertical;
}

label {
  font-size: 18px;
  font-weight: 500;
}

form {
  display: grid;
  align-items: center;
  margin-top: 50px;
  /* max-width: 900px; */
}

/* Просто текст */
.text {
  margin-top: 50px;
  font-size: 18px;
  font-weight: 500;
}

/* Кнопки для ссылок */
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

/* Стили для таблиц */
.table {
  width: 100%;
  border: none;
  border-collapse: separate;
  margin: 50px 0;
}

.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #ededed;
  font-size: 14px;
  border-top: 1px solid #ddd;
}

.table tr th:first-child,
.table tr td:first-child {
  border-left: 1px solid #ddd;
}

.table tr th:last-child,
.table tr td:last-child {
  border-right: 1px solid #ddd;
}

.table thead tr th:first-child {
  border-radius: 20px 0 0 0;
}

.table thead tr th:last-child {
  border-radius: 0 20px 0 0;
}

.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}

.table tbody tr:nth-child(even) {
  background: #f8f8f8;
}

.table tbody tr:last-child td {
  border-bottom: 1px solid #ddd;
}

.table tbody tr:last-child td:first-child {
  border-radius: 0 0 0 20px;
}

.table tbody tr:last-child td:last-child {
  border-radius: 0 0 20px 0;
}

input[type="file"]::-moz-file-upload-button {
    background-color: #26a8f2;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  height: 48px;
  padding: 10px;
  color: #f7fafc;
  font-size: 16px;
  margin-bottom: 10px;
}

input[type="file"]::-webkit-file-upload-button {
    background-color: #26a8f2;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  height: 48px;
  padding: 10px;
  color: #f7fafc;
  font-size: 16px;
  margin-bottom: 10px;
}

</style>
