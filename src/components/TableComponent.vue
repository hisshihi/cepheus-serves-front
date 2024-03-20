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
      <td>{{card.id}}</td>
      <td>{{card.title}}</td>
      <td>{{card.categoryDto.title}}</td>
      <td>{{card.price}} ₽</td>
      <td>Кнопка</td>
      <td>Кнопка</td>
      <td>Кнопка</td>
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
  background: #EDEDED;
  font-size: 14px;
  border-top: 1px solid #ddd;
}

.table tr th:first-child, .table tr td:first-child {
  border-left: 1px solid #ddd;
}

.table tr th:last-child, .table tr td:last-child {
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
  background: #F8F8F8;
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
</style>