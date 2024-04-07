<template>
  <div class="margin-button">
    <button-component :name="'Добавить'"></button-component>
  </div>
  <!-- <div class="add-product">
    <form action="" method="post">
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
      <input
        v-model="text"
        type="text"
        name=""
        id=""
        autocomplete="text"
        autofocus
        required
      />
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
      <label for="">Изображение</label>
      <select name="" id="" v-for="category in categories" :key="category" v-model="getCategory">
        <option value="" disabled >Категории</option>
        <option :value="category.id">{{ category.title }}</option>
      </select>
    </form>
    <button-component :name="'Создать'" @click.prevent="sendData"></button-component>
  </div> -->
  <div v-if="previewLoading">
    <load-data-component/>
  </div>
<!--  <cards-component-->
<!--      :url="url"-->
<!--      :totalElements="totalElements"-->
<!--      :cards="products"-->
<!--  ></cards-component>-->
  <table-component :url="url"
                  :totalElements="totalElements"
                  :cards="products"
                   style="margin-bottom: 434px;"
  ></table-component>
</template>

<script>
import axios from "axios";
import CardsComponent from "@/components/CardsComponent.vue";
import LoadDataComponent from "@/components/LoadDataComponent.vue";
import TableComponent from "@/components/TableComponent.vue";
import ButtonComponent from '@/components/ButtonComponent'

export default {
  components: {
    CardsComponent,
    LoadDataComponent,
    TableComponent,
    ButtonComponent
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
      price: "",
      categories: [],
      getCategory: "",
      file: {},
    };
  },
  mounted() {
    this.addProducts();
    this.addCategory();
  },
  methods: {
    addProducts() {
      axios
          .get(`https://cepheus-serves-spring-production.up.railway.app/${this.url}?size=6&page=0`)
          .then((response) => {
            this.previewLoading = false;
            const data = response.data;
            this.totalElements = data.totalElements;
            this.products = data.content;
          })
          .catch((error) => console.log(error));
    },
    previewFile(event) {
      this.file = event.target.files[0];
    },
    previewSelect(event) {
      this.category = event.target.value
    },
    addCategory() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("https://cepheus-serves-spring-production.up.railway.app/category", { headers })
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => console.log(error));
    },
    sendData() {
      console.log(this.file);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post("https://cepheus-serves-spring-production.up.railway.app/products", {
          title: this.title,
          text: this.text,
          price: this.price,
          id: this.getCategory,
          image: this.file
        }, { headers })
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => console.log(error));
    }
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

</style>
