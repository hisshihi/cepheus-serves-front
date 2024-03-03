<template>
  Добавить товар
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

export default {
  components: {
    CardsComponent,
    LoadDataComponent,
    TableComponent
  },
  data() {
    return {
      url: "products",
      totalElements: 0,
      products: [],
      currentPage: 0,
      previewLoading: true,
    };
  },
  mounted() {
    this.addProducts();
  },
  methods: {
    addProducts() {
      axios
          .get(`http://localhost:8080/${this.url}?size=6&page=0`)
          .then((response) => {
            this.previewLoading = false;
            const data = response.data;
            this.totalElements = data.totalElements;
            this.products = data.content;
          })
          .catch((error) => console.log(error));
    },
  },
};
</script>
