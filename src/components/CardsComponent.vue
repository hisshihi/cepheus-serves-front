<template>
  <div class="cards">
    <div class="card-container" v-for="card in cards" :key="card.id">
      <div class="card-button-container">
        <button class="svg-container" :disabled="checkAuth()">
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
        </button>
        <button class="svg-container" :disabled="checkAuth()">
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
        </button>
      </div>
      <div class="card-image-container">
        <img
            class="card-img lazyload"
            :src="'data:image/png;base64,' + card.imageProductDto?.bytes"
            :alt="card.imageProductDto?.name"
        />
      </div>
      <div class="card-text-container">
        <div class="card-title">{{ card.title }}</div>
        <div class="card-price">{{ makeMoney(card.price) }} ₽</div>
      </div>
      <div class="center-product">
        <div class="center">
          <button-component
              :name="'Подробнее'"
              :type="button"
          ></button-component>
        </div>
      </div>
    </div>
  </div>
  <div v-if="loading">
    <load-data-component/>
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
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'
import LoadDataComponent from "@/components/LoadDataComponent.vue"

export default {
  components: {
    ButtonComponent,
    LoadDataComponent
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
    this.checkAuth()
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
            this.previewLoading = false
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
      return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    },
    checkAuth() {
      const token = localStorage.getItem("token")
      if (!token) {
        return true;
      }
    }
  },
};
</script>

<style scoped>
/* Стили для карточек */
/* .card-img {
  width: 100px;
} */

.cards {
  /* display: flex; */
  /* justify-content: space-between; */
  /* flex-wrap: wrap; */
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vw;
  max-width: 1200px;
  /* margin: 0 auto; */
}

.card-container {
  /* width: 30%; */
  margin-top: 30px;
  -webkit-box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.39);
  -moz-box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.39);
  box-shadow: 0px 7px 4px 0px rgba(0,0,0,0.24);
  border-radius: 20px;

  background-color: #EFEEEE;
}

.products {
  margin-bottom: 50px;
}

.card-text-container {
  /* max-width: 300px; */
  font-size: 14px;
  margin: 0 10px 10px 10px;
  text-align: center;
}

.card-title {
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 19px;
  word-break: break-word;
}

img {
  max-width: 100%;
  height: 184px;
  object-fit: cover;
  object-position: bottom;
  border-radius: 12px;
}

.card-image-container {
  display: grid;
  justify-items: center;
}

.card-price {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  /* text-align: end; */
}

/* Отображение кнопок */
.center-product {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
}

/* Кнопки для избранного и корзины */
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
  border: none
}

.svg-container:disabled {
  opacity: 0.5;
  cursor: default;
}

.svg-container:hover {
  background-color: rgba(13, 127, 242, 0.5);
}

.card-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
