<template>
  <div class="basket">This is basket page</div>
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
    responseData() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get("http://localhost:8080/baskets", { headers })
        .then((response) => {
          this.baskets = response.data._embedded.baskets;
          this.baskets.forEach((item) => {
            const productLink = item._links.product.href; // Получаем ссылку на товар

            // Выполняем запрос для каждого товара
            axios
              .get(productLink, { headers })
              .then((productResponse) => {
                // Обрабатываем данные товара
                console.log("Данные товара:", productResponse.data);
                // Здесь вы можете добавить данные товара в массив или объект
              })
              .catch((error) =>
                console.log("Ошибка при получении данных товара:", error)
              );
          });
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.responseData();
  },
};
</script>
