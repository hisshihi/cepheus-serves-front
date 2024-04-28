<template>
  <div class="home">
    <!-- Слайдер -->
    <div class="slider">
      <slider class="slider"></slider>
    </div>
    <!-- Раздел о нас -->
<!--    <h2>О нас</h2>-->
<!--    <div class="about">-->
<!--      <div class="about-img">-->
<!--        <img src="../assets/logo.png" alt="about image" />-->
<!--      </div>-->
<!--      <div class="about-text">-->
<!--        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum id soluta,-->
<!--        eius a error unde eos commodi, cum incidunt sint libero autem-->
<!--        accusantium eveniet, reiciendis modi voluptatem quaerat quas neque?-->
<!--        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nihil autem-->
<!--        placeat optio cum sunt ut expedita, ex mollitia blanditiis obcaecati! Et-->
<!--        sequi voluptatum suscipit reprehenderit rerum accusantium assumenda-->
<!--        repudiandae.-->
<!--      </div>-->
<!--    </div>-->
    <!-- Блок с товарами -->
    <h2>Самые продаваемые продукты</h2>
    <div v-if="previewLoading">
      <load-data-component/>
    </div>
    <div class="products">
      <cards-component :cards="products" :url="url" :totalElements="totalElements"></cards-component>
    </div>
    <div class="reviews">
      <h2 class="reviews-title">Ваши отзывы</h2>
      <reviews-component/>
    </div>
<!--    Раздел отзывов-->

  </div>
  
</template>

<script>
// @ is an alias to /src
import Slider from "@/components/Slider";
import axios from "axios";
import CardsComponent from "@/components/CardsComponent.vue";
import LoadDataComponent from "@/components/LoadDataComponent.vue";
import ReviewsComponent from "@/components/ReviewsComponent.vue";


export default {
  components: {
    Slider,
    CardsComponent,
    LoadDataComponent,
    ReviewsComponent
  },

  data() {
    return {
      name: "Hello",
      products: [],
      currentPage: 0,
      url: "products/hot",
      totalElements: 0,
      loading: false,
      previewLoading: true,
    };
  },

  mounted() {
    this.addPosts();
    this.progressLoading();
  },

  methods: {
    addPosts() {
      axios
        .get("http://localhost:8080/" + this.url + "?size=6&page=0")
        .then((response) => {
          this.previewLoading = false;
          const data = response.data;

          this.totalElements = data.totalElements;

          this.products = data.content;
        })
        .catch((error) => console.log(error));
    },
    progressLoading() {
      if (this.products.length <= 0) {
        this.loading = true
      }
    }
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

/* Стили для блока "о нас" */
.about-text {
  word-break: break-word;
}

/* Стили для заголовка h2 */
h2 {
  text-align: start;
  margin-top: 50px;
  font-size: 33px;
  max-width: 405px;
  font-weight: 700;
  line-height: 40.23px;
}

.reviews-title {
  width: 202px;
}

.products {
  margin-bottom: 50px;
}

@media screen and (max-width: 1024px) {
  .home {
    padding: 0 20px;
  }
}

</style>
