<script>
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import 'swiper/css/bundle';

export default {
    name: "Slider",
    components: {
        Swiper,
        SwiperSlide,
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
        :slides-per-view="3"
        :space-between="50"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :loop="true"

    >
        <swiper-slide><img style="width: 300px" src="../assets/logo.png"></swiper-slide>
        <swiper-slide><img style="width: 300px" src="../assets/logo.png"></swiper-slide>
        <swiper-slide><img style="width: 300px" src="../assets/logo.png"></swiper-slide>
        <swiper-slide><img style="width: 300px" src="../assets/logo.png"></swiper-slide>
    </swiper>
</template>

<style scoped>


</style>
