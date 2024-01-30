<template>
  <div class="wrapper">
    <nav>
      <header-component></header-component>
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

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
};
</script>

<style>
.link {
  text-decoration: none;
  color: black;
}

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
}
</style>
