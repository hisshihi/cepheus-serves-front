<template>
  <!-- <img
            class="card-img lazyload"
            :src="'data:image/png;base64,' + card.imageProductDto?.bytes"
            :alt="card.imageProductDto?.name"
        /> -->
  <div class="cards">
    <div class="card-container" v-for="card in cards" :key="card.id">
      <div class="card">
        <div class="card-img">
          <img
            class="img lazyload"
            :src="'data:image/png;base64,' + card.imageProductDto?.bytes"
            :alt="card.imageProductDto?.name"
          />
        </div>
        <div class="card-text">
          <div class="id-and-hot">
            <div class="id">ID:{{ card.id }}</div>
            <div class="hot">Хит продаж</div>
          </div>
          <div class="title-and-subtitle">
            <div class="title">{{ card.title }}</div>
            <div class="subtitle">{{ card.text }}</div>
          </div>
        </div>
        <div class="card-button-and-price">
          <div class="price">{{ makeMoney(card.price) }} ₽</div>
          <div class="card-button">
            <button-component
              :name="'В корзину'"
              :type="button"
              :class="'buttonMiniTranspanent'"
            ></button-component>
          </div>
          <div class="favorite-button">В избранное</div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <load-data-component />
  </div>
  <div v-else>
    <div class="center" v-if="buttonLogics()">
      <button-component
        @click="loadMore()"
        :name="buttonName"
        :type="button"
      ></button-component>
    </div>
  </div>
</template>

<script>
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "axios";
import "lazysizes";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import LoadDataComponent from "@/components/LoadDataComponent.vue";

export default {
  components: {
    ButtonComponent,
    LoadDataComponent,
  },

  data() {
    return {
      buttonName: "Загрузить ещё",
      currentPage: 0, // Текущая страница
      loading: false, // Индикатор загрузки
      newCards: [],
    };
  },
  props: {
    cards: Array,
    url: String,
    totalElements: Number,
  },
  mounted() {
    this.checkAuth();
  },
  methods: {
    loadMore() {
      // if (this.loading || this.currentPage >= this.totalPages) return;
      this.currentPage++;

      this.loading = true;
      axios
        .get(
          `http://localhost:8080/${this.url}?size=6&page=${this.currentPage}`
        )
        .then((response) => {
          this.previewLoading = false;
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
        // this.totalPages = 1;
        if (this.currentPage >= 1 || this.totalElements <= 6) {
          return false;
        } else return true;
      }
      if (this.totalElements != this.cards.length) {
        return true;
      } else return false;
    },
    // Отображение валют
    makeMoney(n) {
      return parseFloat(n)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    },
    checkAuth() {
      const token = localStorage.getItem("token");
      if (!token) {
        return true;
      }
    },
  },
};
</script>

<style scoped>
/* Стили для карточек */
/* .card-img {
  width: 100px;
} */

/* Главный контейнер */
.cards {
  /* display: flex; */
  /* justify-content: space-between; */
  /* flex-wrap: wrap; */
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vw;
  max-width: 1200px;
  /* margin: 0 auto; */
}

/* Контейнер с карточками */
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img {
  max-width: 136px;
  max-height: 136px;
  margin-right: 70px;
}

/* Текст карточки */
.id-and-hot {
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 300;
  line-height: 20px;
  margin-bottom: 8px;
}

.id {
  margin-right: 20px;
}

.hot {
  padding: 2px 10px;
  background-color: #e8edf2;
  border-radius: 5px;
}

/* Кнопки */
.card-button-and-price {
  display: flex;
  align-items: center;
}
</style>
