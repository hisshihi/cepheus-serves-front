<template>
  <footer>
    <div class="container-footer">
      <div class="links">
        <div class="link">
          <img class="image" src="../assets/phone.svg" alt="phone image">
          <p class="text"><a href="tel:+7 (3522) 600378">+7 (3522) 600378</a></p>
        </div>
        <div class="link">
          <img class="image" src="../assets/email.svg" alt="email image">
          <p class="text"><a href="mailto:help@cm45.ru">help@cm45.ru</a></p>
        </div>
      </div>
      <div class="date">ПН-ПТ 10-18</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  props: {
    hasScroll: Boolean
  },
  mounted() {
    
  }

};
</script>

<style scoped>
footer {
  background-color: #EFEEEE;
  height: 80px;
  flex-shrink: 0;
}

.container-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
}

.fixed {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

footer p {
  /* margin-top: 30px; */
  margin-left: 5px;
  font-size: 19px;
  font-weight: 400;
}

.links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.link {
  display: flex;
  align-items: center;
  margin-right: 49px;
  max-height: 30px;
}

.link > p {
  margin-top: 0;
}

a {
  text-decoration: revert !important;
}

@media screen and (max-width: 425px) {
  .links {
    flex-wrap: wrap;
  }
}
</style>
