<template>
  <div class="wrapper">
    <nav>
      <header-component :role="$store.state.role"></header-component>
      <div class="container">
        <!-- <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> -->
        <router-view />
      </div>
    </nav>
    <footer-component></footer-component>
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
    return {};
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
  },
  mounted() {
    this.getToken();
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
  margin: 0;
  padding: 0;
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

.wrapper {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
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
  color: white !important;
}

.swiper-pagination-bullet {
  background-color: white !important;
}

/* Стили для формы */
input {
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1px #6583a2 solid;
  padding: 20px 10px;
}

input::placeholder {
  color: #6583a2;
  font-size: 16px;
}

input:focus {
  border-color: #6583a2;
  outline: none;
  color: #6583a2;
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
</style>
