<template>
  <button class="button" :type="type">{{ name }}</button>
</template>

<script>
export default {
  props: {
    name: String,
    type: String,
  },
};
</script>

<style scoped>

.button {
  background-color: rgb(227, 227, 227);
  border-radius: 7px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  padding: 10px;
}

</style>
