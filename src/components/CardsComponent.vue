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
            <button class="basket-button">
              <img
                class="img-button-basket"
                src="../assets/image 49.png"
                alt="basket"
              />
              В корзину
            </button>
            <div class="favorite-button">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#26A9F3"
                stroke-width="1.8"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#CCCCCC"
                  stroke-width="0.144"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
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
  border-bottom: 1px black solid;
}

/* Изображение карточки */
.img {
  max-width: 250px;
  max-height: 250px;
  margin-right: 70px;
}

/* Текст карточки */
.id-and-hot {
  display: flex;
  align-items: center;
  font-size: 21px;
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

.title {
  font-size: 26px;
  margin-bottom: 5px;
  word-break: break-word;
  max-width: 454px;
}

.sub-title {
  font-size: 20px;
}

/* Кнопки и цена карточки */
.card-button-and-price {
  margin-top: 105px;
}

.card-button {
  display: flex;
  align-items: center;
}

.price {
  margin-bottom: 29px;
  font-size: 17px;
  font-weight: 700;
}

svg {
  width: 40px;
  height: 40px;
  cursor: pointer;
  fill: white;
  transition: fill cubic-bezier(0.65, 0.05, 0.36, 1) 0.2s;
}

.favorite-button {
  margin-left: 23px;
}

svg:hover {
  fill: #26a9f3;
}

.basket-button {
  background-color: rgb(232, 237, 245);
  transition: background-color 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05);
  border-radius: 5px;
  border: none;
  text-align: center;
  padding: 10px 15px;
  cursor: pointer;
  max-width: 160px;
  font-weight: 500;
  height: 48px;
  /* padding: 10px; */
  color: black;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 100%; */
  display: flex;
  align-items: center;
}

.basket-button:hover {
  background-color: #86bff8;
}

.img-button-basket {
  margin-right: 3px;
}
</style>
