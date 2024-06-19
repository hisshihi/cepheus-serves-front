<template>
  <h1 class="title">Избранное</h1>
  <!-- Фильтры -->
  <!-- <div class="filters">
    <div class="all-filters">
      <div class="filters-all">
        <select name="" id="">
          <option value="" disabled selected>Все</option>
          <option value="popular">Сначала популярные</option>
          <option value="">Цена: от меньшего</option>
          <option value="">Цена: от большего</option>
        </select>
      </div>
      <div class="filters-category">
        <select name="" id="" @change="filterByCategory($event)">
          <option value="" disabled selected>Категории</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="searching">
      <div class="search">
        <input class="input-search" type="text" placeholder="Поиск" />
      </div>
    </div>
  </div> -->
  <!-- Если в избранном ничего нет -->
  <div class="favorite-null" v-if="allCards.length == 0">
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M4.45067 13.9082L11.4033 20.4395C11.6428 20.6644 11.7625 20.7769 11.9037 20.8046C11.9673 20.8171 12.0327 20.8171 12.0963 20.8046C12.2375 20.7769 12.3572 20.6644 12.5967 20.4395L19.5493 13.9082C21.5055 12.0706 21.743 9.0466 20.0978 6.92607L19.7885 6.52734C17.8203 3.99058 13.8696 4.41601 12.4867 7.31365C12.2913 7.72296 11.7087 7.72296 11.5133 7.31365C10.1304 4.41601 6.17972 3.99058 4.21154 6.52735L3.90219 6.92607C2.25695 9.0466 2.4945 12.0706 4.45067 13.9082Z"
          stroke="#33363F"
          stroke-width="2"
        ></path>
      </g>
    </svg>
    <h1 style="text-align: center">Ничего нет</h1>
  </div>

  <!-- Выбрать всё, в корзину или удалить -->
  <div class="choose">
    <div class="choose-all">
      <input
        type="checkbox"
        class="ui-checkbox"
        :checked="allSelected"
        @change="selectedCardAll"
      />
      <label for="">Выбрать всё</label>
    </div>
    <div class="in-basket-and-delete">
      <!-- <div class="in-basket">В корзину</div> -->
      <div class="delete" @click="deleteSelected">Удалить</div>
    </div>
  </div>

  <!-- Карточки -->

  <div
    class="cards"
    :style="'margin-bottom: 120px' ? allCards.length == 1 : ''"
  >
    <div class="cards-container" v-for="card in allCards" :key="card.id">
      <div class="card">
        <div class="select">
          <input
            type="checkbox"
            class="ui-checkbox"
            v-model="selected[card.id]"
          />
        </div>
        <div class="card-data">
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
              <button class="basket-button" @click="addBasket(card.id)">
                <img
                  class="img-button-basket"
                  src="../assets/image 49.png"
                  alt="basket"
                />
                <p v-if="addedToBasket[card.id]">Добавлено</p>
                <p v-else-if="baskets.has(card.id)">В корзине</p>
                <p v-else>В корзину</p>
              </button>
              <div class="delete-button" @click="deleteCard(card.id)">
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
  </div>
  <div v-if="loading">
    <load-data-component></load-data-component>
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
    cards: String,
    url: String,
    totalElemetns: Number,
  },

  data() {
    return {
      allCards: [],
      buttonName: "Загрузить ещё",
      currentPage: 0, // Текущая страница
      loading: false, // Индикатор загрузки
      newCards: [],
      addedToBasket: {},
      baskets: new Set(),
      inBasket: [],
      urlString: this.url,
      nameCards: this.cards,
      links: [],
      totalElemetnsCards: 0,
      selected: {},
      allSelected: false,
      categories: [],
      selectedCategory: null,
    };
  },

  methods: {
    async responseData() {
      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "https://cepheus-serves-spring-production.up.railway.app/" +
            this.urlString,
          {
            headers,
          }
        );
        this.links = response.data;
        const cardPromises = response.data.map((card) => {
          return axios.get(
            `https://cepheus-serves-spring-production.up.railway.app/products/${card.productId}`
          );
        });

        const cards = await Promise.all(cardPromises);

        this.allCards = cards.map((card) => card.data);
        this.loading = false;
        // console.log(this.links);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    // Добавление в корзину
    addBasket(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const formData = new FormData();
      formData.append("productId", id);
      axios
        .post(
          "https://cepheus-serves-spring-production.up.railway.app/basket",
          formData,
          { headers }
        )
        .then((response) => {
          // Прямое присваивание для обновления реактивного объекта
          this.addedToBasket[id] = true;
          this.baskets.add(id); // Добавляем ID в набор
        })
        .catch((error) => console.log(error));
    },
    getResponseBasket() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          "https://cepheus-serves-spring-production.up.railway.app/baskets",
          { headers }
        )
        .then((response) => {
          this.baskets = new Set(
            response.data._embedded.baskets.map((basket) => basket.productId)
          );
        })
        .catch((error) => console.log(error));
    },
    isProductInBasket(productId) {
      return this.baskets.has(productId);
    },

    makeMoney(n) {
      return parseFloat(n)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    },
    // Выбор
    selectedCardAll() {
      this.allSelected = !this.allSelected; // Переключение состояния
      this.allCards.forEach((card) => {
        this.selected[card.id] = this.allSelected;
        // console.log(this.selected);
      });
    },
    // Удаление одного экземпляра
    deleteCard(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const findId = this.links.filter((item) => item.productId == id);
      axios
        .delete(
          "https://cepheus-serves-spring-production.up.railway.app/favorite/" +
            findId[0].productId,
          {
            headers,
          }
        )
        .then((response) => {
          this.allCards = this.allCards.filter((card) => card.id !== id);
        })
        .catch((error) => console.log(error));
    },
    async deleteSelected() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const selectedIds = Object.keys(this.selected).filter(
          (id) => this.selected[id]
        );
        console.log(selectedIds);
        // Получаем все соответствующие идентификаторы `favorite`
        const idsToDelete = selectedIds
          .map((id) => {
            const link = this.links.find((item) => item.productId == id);
            return link ? link.productId : null;
          })
          .filter(Boolean);

        // Удаляем все выбранные элементы на сервере
        await Promise.all(
          idsToDelete.map((id) =>
            axios.delete(
              `https://cepheus-serves-spring-production.up.railway.app/favorite/${id}`,
              { headers }
            )
          )
        );

        // Удаляем карточки на фронтенде
        this.allCards = this.allCards.filter(
          (card) => !selectedIds.includes(String(card.id))
        );
        this.links = this.links.filter(
          (link) => !selectedIds.includes(String(link.productId))
        );

        // Очистите выбранные элементы после удаления
        selectedIds.forEach((id) => {
          this.$delete(this.selected, id);
        });

        // Сбросьте флаг `allSelected`
        this.allSelected = false;
      } catch (error) {
        this.handleError(error);
      }
    },

    handleError(error) {
      console.error("Error:", error);
      // Add more robust error handling here
    },

    // Категории
    getCategories() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          "https://cepheus-serves-spring-production.up.railway.app/category",
          { headers }
        )
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => console.log(error));
    },
    // Фильтры
    filterByCategory(event) {
      const selectedCategoryId = event.target.value;
      console.log(selectedCategoryId);
      console.log(this.allCards[0].categoryDto.id);
      this.allCards = this.allCards.filter(
        (card) => card.categoryDto.id === selectedCategoryId
      );
    },
  },

  mounted() {
    this.responseData();
    this.getResponseBasket();
    this.getCategories();
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

.card-data {
  display: flex;
  align-items: center;
}

/* Изображение карточки */
.img {
  max-width: 200px;
  max-height: 200px;
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
  /* align-items: center; */
}

.price {
  margin-bottom: 29px;
  font-size: 17px;
  font-weight: 700;
}

svg {
  max-width: 40px;
  max-height: 40px;
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
  margin-right: 10px;
}

.basket-button:hover {
  background-color: #86bff8;
}

.img-button-basket {
  margin-right: 3px;
}

.delete-button > svg {
  fill: black;
}

.delete-button > svg:hover {
  fill: #f22626;
}

h1 {
  margin-top: 16px;
  margin-bottom: 26px;
}

.delete-button > svg {
  width: 40px;
  height: 40px;
}
/* Фильтры */
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.all-filters {
  display: flex;
}

.filters-all {
  margin-right: 49px;
}

/* Выбрать всё, удалить или в корзину */
.choose {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  margin-bottom: 12px;
  padding: 19px 0;
}

.choose-all {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.choose-all > label {
  margin-bottom: 7px;
  margin-left: 10px;
  font-weight: 500;
  font-size: 15px;
}

.in-basket-and-delete {
  display: flex;
}

.in-basket {
  font-weight: 500;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 26px;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.in-basket:hover {
  color: rgb(0, 0, 0);
}

.delete {
  font-weight: 500;
  font-size: 15px;
  color: rgba(255, 0, 0, 0.5);
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.delete:hover {
  color: rgb(255, 0, 0);
}

.select > input {
  margin-left: 10px;
}

/* Checkbox */
/* checkbox settings 👇 */

.ui-checkbox {
  --primary-color: #1677ff;
  --secondary-color: #fff;
  --primary-hover-color: #4096ff;
  /* checkbox */
  --checkbox-diameter: 20px;
  --checkbox-border-radius: 5px;
  --checkbox-border-color: #d9d9d9;
  --checkbox-border-width: 1px;
  --checkbox-border-style: solid;
  /* checkmark */
  --checkmark-size: 1.2;
  padding: 10px;
}

.ui-checkbox,
.ui-checkbox *,
.ui-checkbox *::before,
.ui-checkbox *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.ui-checkbox {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: var(--checkbox-diameter);
  height: var(--checkbox-diameter);
  border-radius: var(--checkbox-border-radius);
  background: var(--secondary-color);
  border: var(--checkbox-border-width) var(--checkbox-border-style)
    var(--checkbox-border-color);
  -webkit-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
}

.ui-checkbox::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5)
    var(--primary-color);
  box-shadow: 0 0 0 calc(var(--checkbox-diameter) / 2.5) var(--primary-color);
  border-radius: inherit;
  opacity: 0;
  -webkit-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  -o-transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
  transition: all 0.5s cubic-bezier(0.12, 0.4, 0.29, 1.46);
}

.ui-checkbox::before {
  top: 40%;
  left: 50%;
  content: "";
  position: absolute;
  width: 4px;
  height: 7px;
  border-right: 2px solid var(--secondary-color);
  border-bottom: 2px solid var(--secondary-color);
  -webkit-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  -ms-transform: translate(-50%, -50%) rotate(45deg) scale(0);
  transform: translate(-50%, -50%) rotate(45deg) scale(0);
  opacity: 0;
  -webkit-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6),
    opacity 0.1s;
  -o-transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
  transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
}

/* actions */

.ui-checkbox:hover {
  border-color: var(--primary-color);
}

.ui-checkbox:checked {
  background: var(--primary-color);
  border-color: transparent;
}

.ui-checkbox:checked::before {
  opacity: 1;
  -webkit-transform: translate(-50%, -50%) rotate(45deg)
    scale(var(--checkmark-size));
  -ms-transform: translate(-50%, -50%) rotate(45deg)
    scale(var(--checkmark-size));
  transform: translate(-50%, -50%) rotate(45deg) scale(var(--checkmark-size));
  -webkit-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  -o-transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
  transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
}

.ui-checkbox:active:not(:checked)::after {
  -webkit-transition: none;
  -o-transition: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  transition: none;
  opacity: 1;
}

.favorite-null > svg {
  max-width: 200px;
  max-height: 200px;
}

.favorite-null {
  display: grid;
  justify-items: center;
}

@media screen and (max-width: 768px) {
  .favorite {
    padding: 16px;
  }
  .img {
    width: 120px;
    height: 120px;
  }
  .title {
    font-size: 18px;
  }
}

@media screen and (max-width: 425px) {
  .card-data {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
