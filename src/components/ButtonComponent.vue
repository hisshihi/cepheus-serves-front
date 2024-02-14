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
  background-color: #0d80f2;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  padding: 10px;
  color: #F7FAFC;
}
</style>
