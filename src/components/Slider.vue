<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import axios from "axios";

// Import Swiper styles
import "swiper/css";
// import 'swiper/css/navigation';
import "swiper/css/pagination";
// import 'swiper/css/scrollbar';
// import "swiper/css/bundle";

export default {
  name: "Slider",
  components: {
    Swiper,
    SwiperSlide,
    ButtonComponent,
  },
  setup() {
    const onSwiper = (swiper) => {
      // console.log(swiper);
    };
    const onSlideChange = () => {
      // console.log('slide change');
    };
    return {
      onSwiper,
      onSlideChange,
      modules: [Navigation, Pagination, Scrollbar, A11y],
    };
  },
  data() {
    return {
      sliderData: [],
    };
  },
  methods: {
    responseData() {
      axios
        .get("https://cepheus-serves-spring-production.up.railway.app/slider")
        .then((response) => {
          const data = response.data;
          this.sliderData = data;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.responseData();
  },
};
</script>

<template>
  <swiper
    :modules="modules"
    :slides-per-view="1"
    :space-between="50"
    navigation
    :pagination="{ clickable: true }"
    :scrollbar="{ draggable: true }"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
    :loop="true"
  >
    <swiper-slide
      class="swiper-slide"
      v-for="item in sliderData"
      :key="item.id"
    >
      <img
        class="img"
        :src="'data:image/png;base64,' + item?.bytes"
        :alt="item?.name"
      />
      <div class="text">
        <h2>{{ item.title }}</h2>
        <p class="description">
          {{ item.text }}
        </p>
        <router-link :to="{ name: 'show-card', params: { id: item.link_id } }">
          <button-component
            name="Подробнее"
            type="button"
            class="buttonMiniDefault"
          />
        </router-link>
      </div>

      <div></div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
img {
  max-width: 900px;
  max-height: 600px;
  border-radius: 12px;
  cursor: grab;
}

.swiper-slide {
  position: relative;
}

.swiper {
  padding-bottom: 30px !important;
}

.text {
  position: absolute;
  color: white;
  z-index: 1000;
  bottom: 100px;
  left: 170px;
  max-width: 700px;
  margin: 0 auto;
}

.text > h2 {
  font-size: 40px;
  font-weight: bold;
  text-shadow: 0 0 7px black;
}

.description {
  text-shadow: 0 0 7px black;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  padding: 1px;
}

.swiper .swiper-slide {
  margin-top: 50px;
  border-radius: 12px;
}

.swiper-button-next {
  color: white !important;
}
.swiper-button-next::before {
}

@media screen and (max-width: 1200px) {
  img {
    width: 1000px;
    margin: 0 auto;
    display: grid;
  }
}

@media screen and (max-width: 768px) {
  img {
    width: 600px;
    margin: 0 auto;
    display: grid;
  }
  .text {
    left: 70px;
  }
  .text > h2 {
    font-size: 30px;
  }
  .text > .description {
    max-width: 450px;
  }
}

@media screen and (max-width: 640px) {
  img {
    width: 450px;
    margin: 0 auto;
    display: grid;
  }
  .text {
    left: 70px;
    bottom: 40px;
  }
  .text > h2 {
    font-size: 20px;
  }
  .text > .description {
    max-width: 450px;
  }
}

@media screen and (max-width: 425px) {
  img {
    width: 350px;
    margin: 0 auto;
    display: grid;
  }
  .text {
    left: 40px;
    bottom: 20px;
  }
  .text > h2 {
    font-size: 16px;
  }
  .text > .description {
    display: none;
  }
}

@media screen and (max-width: 375px) {
  img {
    width: 300px;
    margin: 0 auto;
    display: grid;
  }
}

@media screen and (max-width: 320px) {
  img {
    width: 250px;
    margin: 0 auto;
    display: grid;
  }
}
</style>
