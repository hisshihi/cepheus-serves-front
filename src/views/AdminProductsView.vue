<template>
  This is products page
  <cards-component
    :url="url"
    :totalElements="totalElements"
    :cards="products"
  ></cards-component>
</template>

<script>
import axios from "axios";
import CardsComponent from "@/components/CardsComponent.vue";

export default {
  components: {
    CardsComponent,
  },
  data() {
    return {
      url: "products",
      totalElements: 0,
      products: [],
      currentPage: 0,
    };
  },
  mounted() {
    this.addProducts();
  },
  methods: {
    addProducts() {
      axios
        .get(`https://cepheus-serves-spring-production.up.railway.app/${this.url}?size=6&page=0`)
        .then((response) => {
          console.log(console.log(response));
          const data = response.data;
          this.totalElements = data.totalElements;
          this.products = data.content;
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>
