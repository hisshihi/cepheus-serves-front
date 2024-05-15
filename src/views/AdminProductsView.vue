<template>
  <div class="margin-button">
    <button-component
      :name="'Добавить товар'"
      @click="showAddProduct = !showAddProduct"
    ></button-component>
  </div>
  <div class="margin-button">
    <button-component
      :name="'Добавить категорию'"
      @click="showAddCategory = !showAddCategory"
    ></button-component>
  </div>
  <div class="add-product" v-if="showAddProduct">
    <form @submit.prevent="sendData">
      <label for="">Название</label>
      <input
        v-model="title"
        type="text"
        name=""
        id=""
        autocomplete="title"
        autofocus
        required
      />
      <label for="">Описание</label>
      <textarea
        v-model="text"
        type="text"
        name=""
        id=""
        autocomplete="text"
        autofocus
        required
        cols="1180"
      ></textarea>

      <label for="">Характеристики товара</label>
      <span>Указывайте характеристики через ; (Название: содержание;)</span>
      <textarea
        v-model="specifications"
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
        required
      />
      <label for="">Изображение</label>
      <input
        type="file"
        name=""
        id=""
        autofocus
        required
        @change="previewFile"
      />
      <label for="">Категория</label>
      <select name="" id="" v-model="getCategory">
        <option value="" disabled>Категории</option>
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

  <div :style="style" class="modal-mask" v-if="showChangeCategory">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Смена данных категории</h2>
          <button
            @click="showChangeCategory = false"
            class="modal-close-button"
          >
            &times;
          </button>
        </div>
        <form @submit.prevent="putDataCategory">
          <label for="">Название</label>
          <input
            v-model="changeTitle"
            type="text"
            name=""
            id=""
            autocomplete="title"
            autofocus
          />
          <button-component :name="'Создать'"></button-component>
        </form>
      </div>
    </div>
  </div>

  <div class="add-product" v-if="showAddCategory">
    <form action="" method="post">
      <label for="">Категория</label>
      <input
        v-model="inputCategory"
        type="text"
        name=""
        id=""
        autocomplete="title"
        autofocus
        required
      />
    </form>
    <button-component
      :name="'Создать'"
      @click.prevent="sendCategory"
    ></button-component>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Название</th>
            <th>Обновить</th>
            <th>Удалить</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>{{ category.title }}</td>
            <td class="button" @click="requestAddCategory(category.id)">
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
            <td class="button" @click="deleteCategory(category.id)">
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
    </div>
  </div>

  <div v-if="previewLoading">
    <load-data-component />
  </div>
  <!-- <cards-component-->
  <!--      :url="url"-->
  <!--      :totalElements="totalElements"-->
  <!--      :cards="products"-->
  <!--  ></cards-component> -->
  <table-component
    :url="url"
    :totalElements="totalElements"
    :cards="products"
    style="margin-bottom: 434px"
  ></table-component>
</template>

<script>
import axios from "axios";
import CardsComponent from "@/components/CardsComponent.vue";
import LoadDataComponent from "@/components/LoadDataComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import ButtonComponent from "@/components/ButtonComponent";

export default {
  components: {
    CardsComponent,
    LoadDataComponent,
    TableComponent,
    ButtonComponent,
  },
  data() {
    return {
      url: "products",
      totalElements: 0,
      products: [],
      currentPage: 0,
      previewLoading: true,
      title: "",
      text: "",
      specifications: "",
      price: "",
      categories: [],
      getCategory: "",
      file: {},
      showAddProduct: false,
      showAddCategory: false,
      inputCategory: "",
      showChangeCategory: false,
      changeTitle: "",
      categoryId: null,
    };
  },
  mounted() {
    this.addProducts();
    this.addCategory();
  },
  methods: {
    addProducts() {
      axios
        .get(
          `https://cepheus-serves-spring-production.up.railway.app/${this.url}`
        )
        .then((response) => {
          this.previewLoading = false;
          const data = response.data;
          this.totalElements = data.totalElements;
          this.products = data.content;
          // console.log(this.products);
        })
        .catch((error) => console.log(error));
    },
    previewFile(event) {
      this.file = event.target.files[0];
    },
    previewSelect(event) {
      this.category = event.target.value;
    },
    addCategory() {
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
    sendData() {
      console.log(this.file);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("text", this.text);
      formData.append("specifications", this.specifications);
      formData.append("price", this.price);
      formData.append("category_id", this.getCategory);
      formData.append("image", this.file);

      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      axios
        .post(
          "https://cepheus-serves-spring-production.up.railway.app/products",
          formData,
          { headers }
        )
        .then((response) => {
          const newCard = response.data;
          this.products.push(newCard);
          this.categories = response.data;
          this.showAddProduct = false;
          this.title = "";
          this.text = "";
          this.price = "";
          this.getCategory = "";
        })
        .catch((error) => console.log(error));
    },
    sendCategory() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          "https://cepheus-serves-spring-production.up.railway.app/category",
          { title: this.inputCategory },
          { headers }
        )
        .then((response) => {
          const newCategories = response.data;
          this.categories.push(newCategories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCategory(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete(
          "https://cepheus-serves-spring-production.up.railway.app/category/" +
            id,
          { headers }
        )
        .then((response) => {
          const index = this.categories.findIndex(
            (category) => category.id === id
          );
          if (index !== -1) {
            this.categories.splice(index, 1);
          }
        })
        .catch((error) => console.log(error));
    },
    requestAddCategory(id) {
      this.showAddCategory = !this.showAddCategory;
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          "https://cepheus-serves-spring-production.up.railway.app/category/" +
            id,
          { headers }
        )
        .then((response) => {
          this.showChangeCategory = true;
          this.changeTitle = response.data.title;
          this.categoryId = id;
        })
        .catch((error) => console.log(error));
    },
    putDataCategory() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .put(
          "https://cepheus-serves-spring-production.up.railway.app/category/" +
            this.categoryId,
          { title: this.changeTitle },
          { headers }
        )
        .then((response) => (this.showChangeCategory = false))
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.margin-button {
  margin-top: 50px;
}

select {
  margin: 10px 0 20px 0;
}

select {
  margin-bottom: 20px;
  margin-top: 10px;
  border-radius: 12px;
  border: 1px #6583a2 solid;
  padding: 20px 10px;
}

select:focus {
  border-color: #6583a2;
  outline: none;
  color: #6583a2;
}

span {
  color: red;
  font-weight: 700;
  margin-top: 0;
}

@media screen and (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }
}
</style>
