<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="img-and-data">
      <div class="image">
        <img
          class="img lazyload"
          :src="'data:image/png;base64,' + image?.bytes"
          :alt="image?.name"
        />
      </div>
      <div class="data">
        <div class="price-and-count">
          <p class="price">Цена: {{ makeMoney(price) }}₽</p>
          <p class="price">В наличи: {{ count }} шт.</p>
        </div>
        <div class="specifications-and-buttons">
          <span
            class="specification"
            v-for="(specification, index) in specifications"
            :key="index"
          >
            {{ specification }}
          </span>
        </div>
      </div>
    </div>
    <p class="title">О товаре: {{ text }}</p>
    <p class="category">{{ category }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "",
      text: "",
      image: null,
      category: null,
      price: 0,
      count: 0,
      specifications: "",
    };
  },
  methods: {
    showCard() {
      const route = this.$route.params.id;
      axios
        .get(
          "https://cepheus-serves-spring-production.up.railway.app/products/" +
            route
        )
        .then((response) => {
          const data = response.data;
          this.title = data.title;
          this.text = data.text;
          this.image = data.imageProductDto;
          this.category = data.categoryDto.title;
          this.price = data.price;
          this.count = data.count;
          this.specifications = data.specifications.split(";");
        })
        .catch((error) => console.log(error));
    },
    makeMoney(n) {
      return parseFloat(n)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    },
  },
  mounted() {
    this.showCard();
  },
};
</script>

<style scoped>
.img {
  max-width: 600px;
  max-height: 600px;
  padding: 50px;
}

.image {
  box-shadow: 0 0 15px 2px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  max-height: 600px;
  border-radius: 15px;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
}

p {
  margin-bottom: 20px;
}

.title {
  font-weight: 400;
  font-size: 23px;
}

.category {
  padding: 2px 10px;
  background-color: #e8edf2;
  border-radius: 5px;
  max-width: 150px;
  text-align: center;
  font-size: 18px;
}

.img-and-data {
  display: flex;
  /* flex-wrap: wrap; */
}

.price {
  font-weight: 700;
  font-size: 23px;
}

.data {
  margin-left: 70px;
  width: 100%;
}

.price-and-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.specification {
  display: grid;
  margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
  .img-and-data {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 640px) {
  .img {
    max-width: 400px;
  }
}

@media screen and (max-width: 425px) {
  .img {
    max-width: 300px;
  }
  h1 {
    font-size: 20px;
  }
  .title {
    font-size: 18px;
  }
  .data {
    margin-left: 0px;
  }
}
</style>
