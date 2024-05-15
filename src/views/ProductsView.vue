<template>
  <h1 class="title">Все товары</h1>
  <!-- Фильтры -->
  <div class="filters">
    <div class="filters-select">
      <div class="container-select">
        <select
          name=""
          id=""
          v-model="getBasicFilter"
          @change="getProductsByBasicFilter"
        >
          <option value="all">Все</option>
          <option value="popular">Сначала популярные</option>
          <option value="asc">Цена: от меньшего</option>
          <option value="desc">Цена: от большего</option>
        </select>
        <div class="selected">
          <!-- <label for="">Категории</label> -->
          <select
            name=""
            id=""
            v-model="getCategory"
            @change="getProductsByCategory"
          >
            <option value="all">Все</option>
            <option
              :value="category.id"
              v-for="category in categories"
              :key="category.id"
            >
              {{ category.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="search-container">
      <input
        type="text"
        placeholder="Поиск"
        class="search-input"
        v-model="getInputSearch"
        @keyup="getProductsBySearch"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="search-icon"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
            fill="#6583a2"
          ></path>
        </g>
      </svg>
    </div>
  </div>

  <div v-if="previewLoading">
    <load-data-component />
  </div>
  <div class="products">
    <cards-component
      :cards="products"
      :url="url"
      :totalElements="totalElements"
    ></cards-component>
  </div>
</template>

<script>
import axios from "axios";
import CardsComponent from "./../components/CardsComponent.vue";
import LoadDataComponent from "@/components/LoadDataComponent.vue";

export default {
  components: {
    CardsComponent,
    LoadDataComponent,
  },

  data() {
    return {
      products: [],
      totalElements: 0,
      url: "products",
      categories: [],
      previewLoading: true,
      getCategory: "all",
      getBasicFilter: "all",
      getInputSearch: "",
      debounceTimeout: null,
      isRequestInProgress: false,
    };
  },
  methods: {
    getProducts() {
      axios
        .get(
          `https://cepheus-serves-spring-production.up.railway.app/${this.url}?size=6&page=${this.currentPage}`
        )
        .then((response) => {
          const data = response.data;

          this.totalElements = data.totalElements;
          console.log(this.totalElements);

          this.products = data.content;

          this.previewLoading = false;
        })
        .catch((error) => console.log(error));
    },
    getCategories() {
      axios
        .get("https://cepheus-serves-spring-production.up.railway.app/category")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => console.log(error));
    },
    getProductsByCategory() {
      this.previewLoading = true;
      if (this.getCategory === "all") {
        this.getProducts(); // Загружаем все продукты
        this.previewLoading = false;
      } else {
        axios
          .get(
            `https://cepheus-serves-spring-production.up.railway.app/products/filter/category/${this.getCategory}?size=6&page=${this.currentPage}`
          )
          .then((response) => {
            const data = response.data;
            this.products = data.content;
            this.totalElements = data.totalElements;
            this.url = "products/filter/category/" + this.getCategory;
            this.previewLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
    getProductsByBasicFilter() {
      this.previewLoading = true;
      if (this.getBasicFilter === "all") {
        this.url = "products";
        this.getProducts(); // Загружаем все продукты
        this.previewLoading = false;
      } else {
        axios
          .get(
            `https://cepheus-serves-spring-production.up.railway.app/products/${this.getBasicFilter}?size=6&page=${this.currentPage}`
          )
          .then((response) => {
            const data = response.data;
            // console.log(data)
            this.products = data.content;
            this.totalElements = data.totalElements;
            this.url = "products/" + this.getBasicFilter;
            this.previewLoading = false;
          });
      }
    },
    getProductsBySearch() {
      this.previewLoading = true;
      //   console.log(this.getInputSearch.length < 2);
      if (this.getInputSearch.length == 0) {
        this.getProducts(); // Загружаем все продукты
        this.previewLoading = false;
      } else {
        axios
          .get(
            `https://cepheus-serves-spring-production.up.railway.app/products/name/${this.getInputSearch}?size=6&page=${this.currentPage}`
          )
          .then((response) => {
            const data = response.data;
            console.log(data);
            this.products = data.content;
            this.totalElements = data.totalElements;
            this.url = "products/name/" + this.getInputSearch;
            this.previewLoading = false;
          })
          .catch((error) => console.log(error));
      }
    },
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
};
</script>

<style scoped>
.title {
  margin-top: 16px;
  margin-bottom: 26px;
}

.container-select {
  display: flex;
}

.filters {
  display: flex;
  justify-content: space-between;
}

input {
  width: auto;
}

select {
  margin-right: 30px;
}

.search-container {
  position: relative;
  display: inline-block;
}

/* .search-input {
  width: 200px;
  padding: 8px 8px 8px 28px;
  border: 1px solid #ccc;
  border-radius: 4px;
} */

.search-icon {
  position: absolute;
  top: 43%;
  right: 8px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  width: 40px;
}

@media screen and (max-width: 425px) {
  .filters {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 320px) {
  .container-select {
    flex-wrap: wrap;
  }
}
</style>
