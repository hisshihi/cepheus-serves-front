import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createStore } from "vuex";

// const store = createStore({Vuex});


const store = createStore({
  state() {
    return {
      role: "",
    };
  },
});


createApp(App).use(store).use(store).use(router).use(createStore).mount("#app");
