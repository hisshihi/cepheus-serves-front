<template>
  <button :class="styleButton" :type="type">{{ name }}</button>
</template>

<script>
export default {
  props: {
    name: String,
    type: String,
    styleButton: { type: String, required: false, default: "button" },
  },
};
</script>

<style scoped>
.button {
  background-color: #26a8f2;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  /* max-width: 160px; */
  height: 48px;
  padding: 10px;
  color: #f7fafc;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
}

.buttonGray {
  background-color: #e8edf4;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  /* max-width: 160px; */
  height: 48px;
  padding: 10px;
  color: black;
  font-size: 16px;
  margin-bottom: 10px;
  width: 100%;
}

.buttonMiniDefault {
  background-color: #26a8f2;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  height: 48px;
  padding: 10px;
  color: #f7fafc;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 100%; */
}

.buttonMiniDefaultGray {
  background-color: #e8edf4;
  border-radius: 12px;
  border: none;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  height: 48px;
  padding: 10px;
  color: black;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 100%; */
}

.buttonMiniTranspanent {
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  max-width: 160px;
  height: 48px;
  /* padding: 10px; */
  color: black;
  font-size: 16px;
  margin-bottom: 10px;
  /* width: 100%; */
}
</style>
