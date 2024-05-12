<template>
  <div class="basket">
    <CardsBasketComponent
      :cards="nameCard"
      :url="url"
      :totalElemetns="2"
    ></CardsBasketComponent>
    <div class="order">
      <h2 class="order-title">Оформление заказа</h2>
      <div class="form-order">
        <form action="" @submit.prevent="">
          <div class="city-and-user">
            <div class="city"><input type="text" v-model="city" /></div>
            <div class="user">
              <div class="mydict">
                <div>
                  <label>
                    <input type="radio" name="radio" checked="" />
                    <span>Частное лицо</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" />
                    <span>Организация</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="delivery"></div>
          <div class="all-info"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardsBasketComponent from "./../components/CardsBasketComponent.vue";

export default {
  name: "Basket",

  components: {
    CardsBasketComponent,
  },

  data() {
    return {
      links: [],
      baskets: [],
      products: [],
      totalElemetns: 0,
      url: "basket/in-basket",
      nameCard: "baskets",
      city: "",
      cities: [],
    };
  },
  methods: {
    async responseData() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://localhost:8080/baskets", {
          headers,
        });
        // console.log(response.data.page)
        this.totalElemetns = response.data.page.totalElemetns;
        const baskets = response.data._embedded.baskets;

        const products = await Promise.all(
          baskets.map(async (item) => {
            const productLink = item._links.product.href;
            const productResponse = await axios.get(productLink, { headers });
            return productResponse.data;
          })
        );

        // Store the products in a Vuex store or a Pinia store
        // For simplicity, I'll just assign it to a data property
        this.products = products;

        // You can now use this.products in your Vue 3 component
      } catch (error) {
        // Handle error more robustly, e.g., using a centralized error handler
        console.error("Error fetching data:", error);
      }
    },
    startGeo() {
      axios
        .get(
          "https://ipgeolocation.abstractapi.com/v1?fields=city&api_key=95c887b463bd439684a473998e8d0ca9&ip_address="
        )
        .then((response) => {
          this.city = response.data.city;
        })
        .catch((error) => {
          console.log(error);
        });

      const token = "aSUJjlmXMTLWHtPWirCZGJkRXkgEbn";
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios
        .get(
          "https://data-api.oxilor.com/rest/regions?type=city&countryCode=ru&first=100",
          { headers }
        )
        .then((response) => {
          this.cities = response.data.edges;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.responseData();
    this.startGeo();
  },
};
</script>

<style scoped>
.order-title {
  font-weight: 700;
  font-size: 23px;
  margin-top: 61px;
  margin-bottom: 10px;
}

input {
  width: auto;
}

/* Форма */
.city-and-user {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
}

/* Форма для выбора доставки */
:focus {
  outline: 0;
  border-color: #2260ff;
  box-shadow: 0 0 0 4px #b5c9fc;
}

.mydict div {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  /* justify-content: center; */
}

.mydict input[type="radio"] {
  clip: rect(0 0 0 0);
  clip-path: inset(100%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

.mydict input[type="radio"]:checked + span {
  box-shadow: 0 0 0 0.0625em #0043ed;
  background-color: #dee7ff;
  z-index: 1;
  color: #0043ed;
}

label span {
  display: block;
  cursor: pointer;
  background-color: #fff;
  padding: 0.375em 0.75em;
  position: relative;
  margin-left: 0.0625em;
  box-shadow: 0 0 0 0.0625em #b5bfd9;
  letter-spacing: 0.05em;
  color: #3e4963;
  text-align: center;
  transition: background-color 0.5s ease;
}

label:first-child span {
  border-radius: 0.375em 0 0 0.375em;
}

label:last-child span {
  border-radius: 0 0.375em 0.375em 0;
}
</style>
