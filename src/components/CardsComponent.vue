<template>
  <div class="cards">
    <div class="card-container" v-for="card in cards" :key="card.id">
      <div class="card-image-container">
        <img
          class="card-img"
          :src="'data:image/png;base64,' + card.imageProductDto?.bytes"
          :alt="card.imageProductDto?.name"
        />
      </div>
      <div class="card-text-container">
        <div class="card-price">{{ card.price }} ₽</div>
        <div class="card-title">{{ card.title }}</div>
        <div class="card-text">{{ card.text }}</div>
      </div>
      <div class="center-product">
        <button-component :name="'В корзину'" :type="button"></button-component>
        <button-component
          :name="'В избранное'"
          :type="button"
        ></button-component>
      </div>
    </div>
  </div>
  <div class="center" v-if="buttonLogics()">
    <button-component
      @click="loadMore"
      :name="buttonName"
      :type="button"
    ></button-component>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "axios";

export default {
  components: {
    ButtonComponent,
  },

  data() {
    return {
      buttonName: "Загрузить ещё",
      currentPage: 0, // Текущая страница
      totalPages: 0, // Общее количество страниц
      loading: false, // Индикатор загрузки
      newCards: [],
      infoCards: [],
      pageCount: 1,
    };
  },
  props: {
    cards: Array,
    url: String,
    totalElements: Number,
  },
  methods: {
    loadMore() {
      // if (this.loading || this.currentPage >= this.totalPages) return;
      this.currentPage++;
      this.pageCount++;

      this.loading = true;
      axios
        .get(
          `http://localhost:8080/${this.url}?size=6&page=${this.currentPage}`
        )
        .then((response) => {
          // Извлекаем данные из объекта ответа
          const data = response.data;

          // Присваиваем данные массиву newCards
          this.newCards = data.content;

          // Получаем общее кол-во страниц
          this.totalPages = data.totalPages;

          // Объединяем новые карты с существующими
          this.cards.splice(this.cards.length, 0, ...this.newCards);

          // Обновляем состояние загрузки
          this.loading = false;

          // Обновляем общее количество страниц
          // this.totalPages = data.totalPages;
        })
        .catch((error) => {
          console.error(error);
          this.loading = false;
        });
    },
    buttonLogics() {
      if (this.url == "products/hot") {
        this.totalPages = 1;
        if (this.totalPages != this.currentPage) {
          return true;
        } else return false;
      }
      if (this.totalElements != this.cards.length) {
        return true;
      } else return false;
    },
  },
};
</script>

<style scoped>
/* Стили для карточек */
/* .card-img {
  width: 100px;
} */

.cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.card-container {
  width: 30%;
  margin-top: 30px;
  -webkit-box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 8px 4px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
  padding: 2px;
}

.products {
  margin-bottom: 50px;
}

.card-text-container {
  /* max-width: 300px; */
  font-size: 20px;
  margin: 0 10px 5px 10px;
}

.card-title {
  margin-top: 5px;
  font-weight: 600;
  text-align: center;
}

img {
  border-radius: 10px;
  width: 364px;
}

.card-price {
  font-size: 21px;
  font-weight: bold;
  margin-top: 10px;
  text-align: end;
}

/* Отображение кнопок */
.center-product {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}
</style>
