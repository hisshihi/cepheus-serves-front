<template>
  <div class="basket" v-for="product in products" :key="product.id">
    {{ product }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Basket",
  data() {
    return {
      links: [],
      baskets: [],
      products: [],
    };
  },
  methods: {
    async responseData() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://localhost:8080/baskets", {
          headers,
        });
        console.log(response.data.page)
        const baskets = response.data._embedded.baskets;

        const products = await Promise.all(
          baskets.map(async (item) => {
            const productLink = item._links.product.href;
            const productResponse = await axios.get(productLink, { headers });
            return productResponse.data;
          })
        );

        // Store the products in a Vuex store or a Pinia store
        // For simplicity, I'll just assign it to a data property
        this.products = products;

        // You can now use this.products in your Vue 3 component
      } catch (error) {
        // Handle error more robustly, e.g., using a centralized error handler
        console.error("Error fetching data:", error);
      }
    },
  },
  mounted() {
    this.responseData();
  },
};
</script>
