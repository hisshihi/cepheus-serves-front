import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";
import PrimeVue from "primevue/config"

// const store = createStore({Vuex});


const store = createStore({
  state() {
    return {
      role: "",
    };
  },
});


createApp(App).use(store).use(store).use(PrimeVue).use(router).use(createStore).mount("#app");
