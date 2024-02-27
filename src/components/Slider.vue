<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

// Import Swiper styles
import 'swiper/css';
// import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
// import "swiper/css/bundle";

export default {
  name: "Slider",
  components: {
    Swiper,
    SwiperSlide,
    ButtonComponent
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
        <p>Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами M.2, 8 каскадами питания, HDMI,
          DisplayPort, USB 3.2 Gen 2 Type-A и Type-C</p>
        <button-component name="Подробнее" type="button" style-button="button-mini-default"/>
      </div>

    <div>

    </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами M.2, 8 каскадами питания, HDMI,
          DisplayPort, USB 3.2 Gen 2 Type-A и Type-C</p>
        <button-component name="Подробнее" type="button" style-button="button-mini-default"/>
      </div>
      <div>

      </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами M.2, 8 каскадами питания, HDMI,
          DisplayPort, USB 3.2 Gen 2 Type-A и Type-C</p>
        <button-component name="Подробнее" type="button" style-button="button-mini-default"/>
      </div>
      <div>

      </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами M.2, 8 каскадами питания, HDMI,
          DisplayPort, USB 3.2 Gen 2 Type-A и Type-C</p>
        <button-component name="Подробнее" type="button" style-button="button-mini-default"/>
      </div>
      <div>

      </div>
    </swiper-slide>
    <swiper-slide class="swiper-slide">
      <img src="../assets/text.jpg" />
      <div class="text">
        <h2>Материнская плата ASUS Prime Z590-P ATX</h2>
        <p>Материнская плата Intel Z590 (LGA 1200) ATX с PCIe 4.0, тремя слотами M.2, 8 каскадами питания, HDMI,
          DisplayPort, USB 3.2 Gen 2 Type-A и Type-C</p>
        <button-component name="Подробнее" type="button" style-button="button-mini-default"/>
      </div>
      <div>

      </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>
img {
  max-width: 1200px;
  border-radius: 12px;
}

.swiper-slide {
  position: relative;
}

.text {
  position: absolute;
  color: white;
  z-index: 1000;
  bottom: 100px;
  left: 50px;
  max-width: 1100px;
  margin: 0 auto;
}

.text > h2 {
  font-size: 40px;
  font-weight: bold;
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
</style>
