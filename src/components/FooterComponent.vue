<template>
  <footer>
    <div class="container">
      <p>Copyright &copy; 2024</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",

  props: {
    hasScroll: Boolean
  },
};
</script>

<style scoped>
footer {
  border-top: black 1px solid;
  height: 80px;
  flex-shrink: 0;
}

.fixed {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

footer p {
  margin-top: 30px;
}
</style>
