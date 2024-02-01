<template>
  <div class="home">
    <!-- Слайдер -->
    <div class="slider">
      <slider></slider>
    </div>
    <!-- Раздел о нас -->
    <h2>О нас</h2>
    <div class="about">
      <div class="about-img">
        <img src="../assets/logo.png" alt="about image" />
      </div>
      <div class="about-text">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum id soluta,
        eius a error unde eos commodi, cum incidunt sint libero autem
        accusantium eveniet, reiciendis modi voluptatem quaerat quas neque?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nihil autem
        placeat optio cum sunt ut expedita, ex mollitia blanditiis obcaecati! Et
        sequi voluptatum suscipit reprehenderit rerum accusantium assumenda
        repudiandae.
      </div>
    </div>
    <!-- Блок с товарами -->
    <h2>Товары</h2>
    <div class="products">
      <cards-component :cards="products" :url="url" :totalElements="totalElements"></cards-component>
      
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider";
import axios from "axios";
import CardsComponent from "@/components/CardsComponent.vue";


export default {
  components: {
    Slider,
    CardsComponent,
  },

  data() {
    return {
      name: "Hello",
      products: [],
      currentPage: 0,
      url: "products",
      totalElements: 0,
    };
  },

  mounted() {
    this.addPosts();
  },

  methods: {
    addPosts() {
      axios
        .get("http://localhost:8080/?size=6&page=0")
        .then((response) => {
          const data = response.data;

          this.totalElements = data.totalElements;

          this.products = data.content;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
/* Настройка блока о нас */
.about {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}
/* Настройка стилей для слайдера */
.slider {
  margin-top: 50px;
}

/* Стили для блока "о нас" */
.about-text {
  word-break: break-word;
}

/* Стили для заголовка h2 */
h2 {
  text-align: center;
  margin-top: 50px;
}

.products {
  margin-bottom: 50px;
}




</style>
