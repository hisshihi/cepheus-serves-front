<template>
  <input class="btn btn-success" type="button" :value="name" />
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style scoped>

</style>
