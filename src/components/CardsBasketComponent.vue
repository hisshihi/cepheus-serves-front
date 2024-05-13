<template>
  <h1 class="title">Корзина</h1>
  <div class="no-cards" v-if="cards.length === 0">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M4 4H5.62563C6.193 4 6.47669 4 6.70214 4.12433C6.79511 4.17561 6.87933 4.24136 6.95162 4.31912C7.12692 4.50769 7.19573 4.7829 7.33333 5.33333L7.51493 6.05972C7.616 6.46402 7.66654 6.66617 7.74455 6.83576C8.01534 7.42449 8.5546 7.84553 9.19144 7.96546C9.37488 8 9.58326 8 10 8V8"
          stroke="#33363F"
          stroke-width="2"
          stroke-linecap="round"
        ></path>
        <path
          d="M18 17H7.55091C7.40471 17 7.33162 17 7.27616 16.9938C6.68857 16.928 6.28605 16.3695 6.40945 15.7913C6.42109 15.7367 6.44421 15.6674 6.49044 15.5287V15.5287C6.54177 15.3747 6.56743 15.2977 6.59579 15.2298C6.88607 14.5342 7.54277 14.0608 8.29448 14.0054C8.3679 14 8.44906 14 8.61137 14H14"
          stroke="#33363F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>
        <path
          d="M14.5279 14H10.9743C9.75838 14 9.15042 14 8.68147 13.7246C8.48343 13.6083 8.30689 13.4588 8.15961 13.2825C7.81087 12.8652 7.71092 12.2655 7.51103 11.0662C7.30849 9.85093 7.20722 9.2433 7.44763 8.79324C7.54799 8.60536 7.68722 8.44101 7.85604 8.31113C8.26045 8 8.87646 8 10.1085 8H16.7639C18.2143 8 18.9395 8 19.2326 8.47427C19.5257 8.94854 19.2014 9.59717 18.5528 10.8944L18.1056 11.7889C17.5677 12.8647 17.2987 13.4026 16.8154 13.7013C16.3321 14 15.7307 14 14.5279 14Z"
          stroke="#33363F"
          stroke-width="2"
          stroke-linecap="round"
        ></path>
        <circle cx="17" cy="20" r="1" fill="#33363F"></circle>
        <circle cx="9" cy="20" r="1" fill="#33363F"></circle>
      </g>
    </svg>
    <h1>Корзина пуста</h1>
  </div>
  <div class="cards">
    <div class="cards-container" v-for="(card, index) in cards" :key="card.id">
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
            <!-- <div class="hot">Хит продаж</div> -->
          </div>
          <div class="title-and-subtitle">
            <div class="title">{{ card.title }}</div>
            <!-- <div class="subtitle">{{ card.text }}</div> -->

            <router-link :to="{ name: 'show-card', params: { id: card.id } }">
              <button-component
                :name="'Подробнее'"
                :class="'buttonMiniDefaultGray'"
              ></button-component>
            </router-link>
          </div>
        </div>

        <div class="card-button-and-price">
          <div class="price">{{ makeMoney(card.price) }} ₽</div>
          <div class="card-button">
            <div class="card-count">
              <!-- Убавить -->
              <button class="basket-button" @click="decreaseProduct(card.id, card.price)">
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L18 12"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>

              <!-- Кол-во -->
              <div class="quantity">{{ counts[index] }}</div>

              <!-- Прибавить -->
              <button class="basket-button" @click="addBasket(card.id, card.price)">
                <svg
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12H18M12 6V18"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div class="favorite-button" @click="addFavorite(card.id)">
              <!-- :fill="inFavorite.includes(card.id) ? '#26A9F3' : 'none'" -->
              <svg
                viewBox="0 0 24 24"
                fill="#26A9F3"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#26A9F3"
                stroke-width="1.8"
                v-if="favorites.has(card.id)"
                :class="{ svgFill: isAddInFavorite[card.id] }"
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
              <svg
                viewBox="0 0 24 24"
                :fill="isAddInFavorite[card.id] ? '#26A9F3' : 'none'"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#26A9F3"
                stroke-width="1.8"
                v-else
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
            <div class="delete-button" @click="deleteCard(card.id, card.price, card.count)">
              <svg
                viewBox="0 0 1024 1024"
                fill="#000000"
                class="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z"
                    fill=""
                  ></path>
                  <path
                    d="M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z"
                    fill=""
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
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

  props: {
    cards: Array,
    url: String,
    totalElemetns: Number,
  },

  data() {
    return {
      cards: [],
      buttonName: "Загрузить ещё",
      currentPage: 0, // Текущая страница
      loading: false, // Индикатор загрузки
      newCards: [],
      urlString: this.url,
      // nameCards: this.cards,
      links: [],
      totalElemetnsCards: 0,
      isAddInFavorite: {},
      favorites: new Set(),
      inFavorite: false,
      fillBoolean: false,
      counts: [],
    };
  },

  methods: {
    async responseData() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://localhost:8080/" + this.urlString,
          {
            headers,
          }
        );
        this.links = response.data;
        const cardPromises = response.data.map((card) => {
          this.counts.push(card.count);
          return axios.get(`http://localhost:8080/products/${card.productId}`);
        });

        const cards = await Promise.all(cardPromises);

        this.cards = cards.map((card) => card.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    // Добавление в избранное
    addFavorite(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const formData = new FormData();
      formData.append("productId", id);
      axios
        .post("http://localhost:8080/favorite", formData, { headers })
        .then((response) => {
          this.isAddInFavorite[id] = true;
          this.favorites.add(id); // Добавляем ID в набор
          this.inFavorite.add(id); // Обновляем inFavorite как множество
        })
        .catch((error) => console.log(error));
    },
    getResponseFavorite() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:8080/favorites", { headers })
        .then((response) => {
          this.favorites = new Set(
            response.data._embedded.favorites.map(
              (favorite) => favorite.productId
            )
          );
        })
        .catch((error) => console.log(error));
    },
    getProductsInFavorite() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:8080/favorite/in-favorite", { headers })
        .then((response) => {
          this.inFavorite = response.data.map((favorite) => favorite.productId);
        })
        .catch((error) => console.log(error));
    },

    makeMoney(n) {
      return parseFloat(n)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    },
    placeOrder() {
      const productIds = this.cards.map((card) => card.id);
      const productPrices = this.cards.map((card) => card.price);

      console.log(productIds);

      this.$emit("order-placed", { productIds, productPrices });
    },
    // Удаление корзины
    deleteCard(id, price, count) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const findId = this.links.filter((item) => item.productId == id);

      axios
        .delete("http://localhost:8080/basket/" + findId[0].id, { headers })
        .then((response) => {
          this.cards = this.cards.filter((card) => card.id !== id);

          const findIndex = this.links.findIndex(
            (item) => item.productId == id
          );
          let newCount = this.counts[findIndex] = this.counts[findIndex]
          this.emitProductCountChanged(id, newCount, price, "delete");
        })
        .catch((error) => console.log(error));
    },
    // Добавиление единицы товара в корзину
    addBasket(id, price) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const formData = new FormData();
      formData.append("productId", id);

      axios
        .post("http://localhost:8080/basket", formData, { headers })
        .then((response) => {
          const findIndex = this.links.findIndex(
            (item) => item.productId == id
          );
          let newCount = this.counts[findIndex] = this.counts[findIndex] + 1;
          this.emitProductCountChanged(id, newCount, price, "plus");
        })
        .catch((error) => console.log(error));
    },
    decreaseProduct(id, price) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const findId = this.links.filter((item) => item.productId == id);

      axios
        .patch(
          `http://localhost:8080/basket/decrease/${findId[0].id}`,
          {},
          { headers }
        )
        .then((response) => {
          const findIndex = this.links.findIndex(
            (item) => item.productId == id
          );
          let newCount = this.counts[findIndex] = this.counts[findIndex] - 1;
          this.emitProductCountChanged(id, newCount, price, "minus");
        })
        .catch((error) => console.log(error));
    },
    emitProductCountChanged(id, count, price, operation) {
      this.$emit("product-count-changed", {id: id, count: count, price: price, operation: operation});
    },
    getCardCount(productId) {
    const link = this.links.find(link => link.productId === productId);
    return link ? link.count : 0;
  },
  },

  mounted() {
    this.responseData().then(() => {
      this.getResponseFavorite();
      this.getProductsInFavorite();
      this.placeOrder(); // Перенесено внутрь обработчика успешного завершения запроса данных
    });
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

.subtitle {
  display: none;
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
  /* margin-top: 105px; */
}

.card-button {
  display: flex;
  align-items: baseline;
}

.price {
  margin-bottom: 29px;
  font-size: 17px;
  font-weight: 700;
}

.card-count {
  display: flex;
  /* align-items: center; */
}

.quantity {
  margin-right: 20px;
  font-size: 20px;
  margin-left: 20px;
  margin-top: 3px;
}

svg {
  width: 40px;
  height: 40px;
  cursor: pointer;
  /* fill: white; */
  transition: fill cubic-bezier(0.65, 0.05, 0.36, 1) 0.2s;
}

.favorite-button {
  margin-left: 23px;
}

svg:hover {
  fill: #26a9f3;
}

.delete-button > svg {
  fill: black;
  margin-left: 20px;
}

.delete-button > svg:hover {
  fill: #f22626;
}

.no-cards {
  display: grid;
  justify-items: center;
  margin-top: 20px;
}

.no-cards > svg {
  width: 200px;
  height: 200px;
}

.no-cards:hover > svg {
  cursor: default;
  fill: white;
}

.basket-button {
  background-color: rgb(232, 237, 245);
  transition: background-color 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05);
  border-radius: 5px;
  border: none;
  text-align: center;
  /* padding: 0 5px; */
  cursor: pointer;
  width: 30px;
  font-weight: 500;
  height: 30px;
  /* padding: 10px; */
  color: black;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.basket-button:hover {
  background-color: #86bff8;
}

.basket-button > svg {
  max-width: 20px;
}

.img-button-basket {
  margin-right: 3px;
}

h1 {
  margin-top: 42px;
  margin-bottom: 35px;
}

.svgFill {
  fill: #26a9f3;
}
</style>
