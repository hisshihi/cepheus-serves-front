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
.swiper-button-next, .swiper-button-prev {
  color: white !important;
}

.swiper-pagination-bullet {
  background-color: white !important;
}
</style>
