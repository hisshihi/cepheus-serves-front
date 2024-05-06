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
      show: false,
      id: null,
      card: [],
      title: "",
      text: "",
      price: 0,
      file: null,
      getCategory: "",
      specificationsProduct: "",
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
          console.log(this.newCards);

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
    deleteCard(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete("http://localhost:8080/products/" + id, { headers })
        .then((response) => {
          const index = this.cards.findIndex((card) => card.id === id);
          if (index !== -1) {
            this.cards.splice(index, 1);
          }
        })
        .catch((error) => console.log(error));
    },
    showModal(id) {
      this.show = true;
      this.id = id;
      console.log(this.id);
      axios
        .get("http://localhost:8080/products/" + this.id)
        .then((response) => {
          const data = response.data;
          this.card = data;
          this.title = this.card.title;
          this.text = this.card.text;
          this.price = this.card.price;
          this.file = this.card.imageProductDto;
          this.specificationsProduct = this.card.specifications;
          this.image = this.card.imageProductDto;
        })
        .catch((error) => console.log(error));
    },
    closeModal() {
      this.show = false;
    },
    addCategory() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:8080/category", { headers })
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => console.log(error));
    },
    previewFile(event) {
      this.file = event.target.files[0];
    },
    putData() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("text", this.text);
      formData.append("specifications", this.specificationsProduct);
      formData.append("price", this.price);
      formData.append("category_id", this.getCategory);
      formData.append("image", this.file);
      console.log(this.getCategory);
      axios
        .patch("http://localhost:8080/products/" + this.id, formData, {
          headers,
        })
        .then((response) => {
          console.log(response);
          this.title = "";
          this.text = "";
          this.price = 0;
          this.categoryDto = "";
          this.file = null;
          this.show = false;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.addCategory();
  },
};
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Цена</th>
        <th>Кол-во продаж</th>
        <th>Подробнее</th>
        <th>Обновить</th>
        <th>Удалить</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="card in cards" :key="card.id">
        <td>{{ card.id }}</td>
        <td>{{ card.title }}</td>
        <td>{{ card.categoryDto.title }}</td>
        <td>{{ card.price }} ₽</td>
        <td>{{ card.count }}</td>
        <td class="button">
          <router-link :to="{ name: 'show-card', params: { id: card.id } }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path
                d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"
              />
            </svg>
          </router-link>
        </td>
        <td class="button" @click="showModal(card.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"
            />
          </svg>
        </td>

        <div :style="style" class="modal-mask" v-if="show">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-header">
                <h2>Смена данных товара</h2>
                <button @click="closeModal" class="modal-close-button">
                  &times;
                </button>
              </div>
              <form @submit.prevent="putData">
                <label for="">Название</label>
                <input
                  v-model="title"
                  type="text"
                  name=""
                  id=""
                  autocomplete="title"
                  autofocus
                />
                <label for="">Описание</label>
                <textarea
                  v-model="text"
                  type="text"
                  name=""
                  id=""
                  autocomplete="text"
                  autofocus
                  cols="1180"
                ></textarea>
                <label for="">Характеристики товара</label>
                <span
                  >Указывайте характеристики через ; (Название:
                  содержание;)</span
                >
                <textarea
                  v-model="specificationsProduct"
                  type="text"
                  name=""
                  id=""
                  autocomplete="text"
                  autofocus
                  required
                  cols="1180"
                ></textarea>
                <label for="">Цена</label>
                <input
                  v-model="price"
                  type="number"
                  name=""
                  id=""
                  autocomplete="price"
                  autofocus
                />
                <label for="">Изображение</label>
                <input
                  type="file"
                  name=""
                  id=""
                  autofocus
                  @change="previewFile"
                />
                <label for="">Категория</label>
                <select name="" id="" v-model="getCategory">
                  <option value="" disabled selected>Категории</option>
                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category.id"
                  >
                    {{ category.title }}
                  </option>
                </select>
                <button-component :name="'Создать'"></button-component>
              </form>
            </div>
          </div>
        </div>

        <td class="button" @click="deleteCard(card.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
            />
          </svg>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
.table {
  width: 100%;
  border: none;
  border-collapse: separate;
  margin: 50px 0;
}

.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #ededed;
  font-size: 14px;
  border-top: 1px solid #ddd;
}

.table tr th:first-child,
.table tr td:first-child {
  border-left: 1px solid #ddd;
}

.table tr th:last-child,
.table tr td:last-child {
  border-right: 1px solid #ddd;
}

.table thead tr th:first-child {
  border-radius: 20px 0 0 0;
}

.table thead tr th:last-child {
  border-radius: 0 20px 0 0;
}

.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}

.table tbody tr:nth-child(even) {
  background: #f8f8f8;
}

.table tbody tr:last-child td {
  border-bottom: 1px solid #ddd;
}

.table tbody tr:last-child td:first-child {
  border-radius: 0 0 0 20px;
}

.table tbody tr:last-child td:last-child {
  border-radius: 0 0 20px 0;
}

.button {
  text-align: center !important;
  cursor: pointer;
}

/* Модальное окно */
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.modal-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-close-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}
</style>
