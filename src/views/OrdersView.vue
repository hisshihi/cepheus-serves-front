<template>this is orders</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getOrder() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("https://cepheus-serves-spring-production.up.railway.app/order", {
          headers,
        })
        .then((response) => {
          this.orders = response.data;
          this.getOrderProducts();
        })
        .catch((error) => console.log(error));
    },
    getOrderProducts() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      this.orders.forEach((order) => {
        axios
          .get(
            `https://cepheus-serves-spring-production.up.railway.app/order/product/${order.id}`,
            { headers }
          )
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      });
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>

<style scoped></style>
