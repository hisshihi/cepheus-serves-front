<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

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
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>
          Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами
          M.2, 8 каскадами питания, HDMI, DisplayPort, USB 3.2 Gen 2 Type-A и
          Type-C
        </p>
        <button-component
          name="Подробнее"
          type="button"
          class="buttonMiniDefault"
        />
      </div>

      <div></div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>
          Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами
          M.2, 8 каскадами питания, HDMI, DisplayPort, USB 3.2 Gen 2 Type-A и
          Type-C
        </p>
        <button-component
          name="Подробнее"
          type="button"
          class="buttonMiniDefault"
        />
      </div>
      <div></div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>
          Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами
          M.2, 8 каскадами питания, HDMI, DisplayPort, USB 3.2 Gen 2 Type-A и
          Type-C
        </p>
        <button-component
          name="Подробнее"
          type="button"
          class="buttonMiniDefault"
        />
      </div>
      <div></div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>
          Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами
          M.2, 8 каскадами питания, HDMI, DisplayPort, USB 3.2 Gen 2 Type-A и
          Type-C
        </p>
        <button-component
          name="Подробнее"
          type="button"
          class="buttonMiniDefault"
        />
      </div>
      <div></div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>
          Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами
          M.2, 8 каскадами питания, HDMI, DisplayPort, USB 3.2 Gen 2 Type-A и
          Type-C
        </p>
        <button-component
          name="Подробнее"
          type="button"
          class="buttonMiniDefault"
        />
      </div>
      <div></div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
img {
  max-width: 900px;
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

.text > p {
  text-shadow: 0 0 7px black;
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
</style>
