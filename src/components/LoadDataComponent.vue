<script setup>
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import Splitting from "splitting";

import {gsap} from "gsap";

const animateCells = () => {
  Splitting(); // Splitting might not be directly used in GSAP animation

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.75 });

  tl
      .from('.box .cell', {
        scale: 0,
        transformOrigin: 'center',
        x: '1.5rem',
        duration: 0.25,
        ease: 'circ.out',
        stagger: { amount: 3, from: 'start' }
      })
      .to('.box .cell', {
            scale: 0,
            xPercent: -900,
            duration: 0.5,
            stagger: { amount: 0.75, from: 'start' }
          },
          '+=0.5');
};
setTimeout(() => {
  animateCells()
}, 0)
</script>

<template>
    <div class="container">
      <p data-splitting>Загрузка ....</p>
      <div class="wrap">
        <div class="box" data-splitting="cells" data-columns="10" data-rows="1" data-image="true">
        </div>
      </div>
    </div>
</template>

<style scoped>
.container {
  margin: 20px 0;
  display: grid;
  justify-content: center;
}

.box {
  width: 10rem;
  height: 1rem;
  /* margin-block-start: 0.5rem; */
  background: #26A8F2;
  margin: 7px;
  border-radius: 12px;
}

.wrap {
  outline: 1px solid #efefef;
  outline-offset: 0.25rem;
  box-shadow: 0px 0px 20px 4px rgba(34, 60, 80, 0.2);
  border-radius: 12px;
}

p {
  opacity: 0.5;
}
</style>