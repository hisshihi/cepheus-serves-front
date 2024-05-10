<template>
  <div class="favorite">
    <CardsFavoriteComponent
      :cards="nameCard"
      :url="url"
      :totalElemetns="2"
    ></CardsFavoriteComponent>
  </div>
</template>

<script>
import axios from "axios";
import CardsFavoriteComponent from './../components/CardsFavoriteComponent.vue'

export default {
  components: {
    CardsFavoriteComponent,
  },
  data() {
    return {
      url: "favorite/in-favorite",
      nameCard: "favorites",
    };
  },
};
</script>

<style scoped></style>
