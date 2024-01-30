<template>
  <div class="cards">
    <div class="card-container" v-for="card in cards" :key="card.id">
      <div class="card-image-container">
        <img
          class="card-img"
          :src="'data:image/png;base64,' + card.imageProductDto?.bytes"
          :alt="card.imageProductDto?.name"
        />
      </div>
      <div class="card-text-container">
        <div class="card-title">{{ card.title }}</div>
        <div class="card-text">{{ card.text }}</div>
        <div class="card-price">{{ card.price }}₽</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    cards: Array,
  },
};
</script>

<style scoped>
/* Стили для карточек */
/* .card-img {
  width: 100px;
} */

.cards {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 50px;
}

.card-container {
  width: 32%;
  margin-top: 30px;
}

.products {
  margin-bottom: 50px;
}

.card-text-container {
  /* max-width: 300px; */
  font-size: 20px;
}

.card-title {
  margin-top: 10px;
  font-weight: 600;
}
</style>
