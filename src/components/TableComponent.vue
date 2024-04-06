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

<template>
  <table class="table">
    <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Категория</th>
        <th>Цена</th>
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
        <td class="button">
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
        </td>
        <td class="button">
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
        <td class="button">
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

<style scoped>
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
</style>
