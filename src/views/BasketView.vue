<template>
  <div class="basket">
    <CardsBasketComponent
      ref="cardsBasket"
      :cards="products"
      :url="url"
      :totalElemetns="totalElemetns"
      :delete="isDelete"
      @order-placed="handleOrderPlaced"
      @product-count-changed="handleProductCountChanged"
      @product-info="updateCardsData"
    ></CardsBasketComponent>
    <div class="order">
      <h2 class="order-title">Оформление заказа</h2>
      <div class="form-order">
        <form action="" @submit.prevent="responseDataUser">
          <div class="city-and-user">
            <div class="form-container city">
              <label for="">Город доставки</label>
              <select name="" id="" v-model="userCity" required>
                <option :value="city" selected>{{ city }}</option>
                <option
                  :value="city.node.name"
                  v-for="city in cities"
                  :key="city.id"
                >
                  {{ city.node.name }}
                </option>
              </select>
            </div>
            <div class="form-container user">
              <label for="">Покупатель</label>
              <div class="mydict">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="radio1"
                      :checked="!user.inOrganization"
                      required
                    />
                    <span>Частное лицо</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio1"
                      :checked="user.inOrganization"
                      required
                    />
                    <span>Организация</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <h2 class="order-title">Способ доставки</h2>
          <div class="delivery">
            <div class="delivery-container">
              <div class="delivery-container-text">
                <div class="delivery-title">Пункт выдачи заказов</div>
                <div class="delivery-text">от 250₽ / до 8 дней</div>
              </div>
              <div class="delivery-container-radio">
                <input
                  type="radio"
                  name="radio2"
                  class="radio-button__input"
                  value="Пункт выдачи заказов"
                  v-model="deliveryMethod"
                  required
                />
              </div>
            </div>
            <div class="delivery-container">
              <div class="delivery-container-text">
                <div class="delivery-title">Самовывоз</div>
                <div class="delivery-text">Бесплатно</div>
              </div>
              <div class="delivery-container-radio">
                <input
                  type="radio"
                  name="radio2"
                  checked
                  class="radio-button__input"
                  value="Самовывоз"
                  v-model="deliveryMethod"
                  required
                />
              </div>
            </div>
          </div>
          <div class="all-info">
            <div class="info-container products-count-and-price">
              <div class="products">Ваши товары ({{ allCount }})</div>
              <div class="price">{{ makeMoney(allPriceNumber) }}₽</div>
            </div>
            <div class="info-container delivery-method">
              <div class="method-title">Способ получения</div>
              <div class="method">{{ deliveryMethod }}</div>
            </div>
            <hr />
            <div class="info-container payment-all">
              <div class="payment-title">Итого к оплате:</div>
              <div class="payment">{{ makeMoney(allPriceNumber) }}₽</div>
            </div>
            <div class="button-info">
              <button-component :name="'Оформить заказ'"></button-component>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardsBasketComponent from "./../components/CardsBasketComponent.vue";
import ButtonComponent from "./../components/ButtonComponent.vue";

export default {
  name: "Basket",

  components: {
    CardsBasketComponent,
    ButtonComponent,
  },

  data() {
    return {
      baskets: [],
      products: [],
      totalElemetns: 0,
      url: "basket/in-basket",
      nameCard: "baskets",
      city: "",
      cities: [],
      allPriceNumber: 0,
      allCount: 0,
      userCity: "",
      user: [],
      deliveryMethod: "Самовывоз",
      cardsData: [],
      isDelete: false,
    };
  },

  methods: {
    async responseDataTest() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Запрос для получения всех корзин пользователя
        const response = await axios.get(
          "http://localhost:8080/basket/in-basket",
          { headers }
        );

        console.log("Корзины пользователя:", response.data);

        const productList = [];

        // Запрос для получения данных о каждом товаре в корзине
        const products = await Promise.all(
          response.data.map(async (basket) => {
            const productResponse = await axios.get(
              `http://localhost:8080/products/${basket.productId}`,
              { headers }
            );
            productList.push(productResponse.data);
          })
        );

        // Вывод всех товаров на консоль
        console.log("Товары в корзине:", productList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    async responseData() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Запрос для получения всех корзин пользователя
        const response = await axios.get(
          "http://localhost:8080/basket/in-basket",
          { headers }
        );

        console.log("Корзины пользователя:", response.data);

        const productList = [];

        // Запрос для получения данных о каждом товаре в корзине
        const products = await Promise.all(
          response.data.map(async (basket) => {
            const productResponse = await axios.get(
              `http://localhost:8080/products/${basket.productId}`,
              { headers }
            );
            const product = productResponse.data;
            return {
              ...product,
              count: basket.count,
              // Добавляем любую дополнительную информацию, если необходимо
            };
          })
        );

        this.products = products;
        console.log("Товары в корзине:", this.products);

        this.allPrice(products);
        this.updateCardsData();
      } catch (error) {
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
          this.userCity = this.city;
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

    handleOrderPlaced(data) {
      const { productIds, productPrices } = data;

      console.log(productIds, productPrices);
    },
    handleProductCountChanged(data) {
      const cardIndex = this.cardsData.findIndex((card) => card.id === data.id);

      if (data.operation == "plus") {
        this.cardsData[cardIndex].count++;
        this.allPriceNumber += data.price;
        this.allCount++;
      } else if (data.operation == "minus") {
        this.cardsData[cardIndex].count--;
        this.allPriceNumber -= data.price;
        this.allCount--;
      } else if (data.operation == "delete") {
        const price = data.price;
        const count = data.count;
        this.allPriceNumber -= price * count;
        this.allCount -= count;
        this.cardsData.splice(cardIndex, 1);
      }
    },

    makeMoney(n) {
      return parseFloat(n)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1 ");
    },

    updateCardsData(data) {
      const cardsData = [];

      console.log(this.products);

      for (const product of data) {
        const matchingData = this.products.find(
          (item) => item.title === product.title
        );

        if (matchingData) {
          cardsData.push({
            id: product.id,
            name: product.title,
            count: matchingData.count,
            price: product.price,
          });
        } else {
          cardsData.push({
            id: product.id,
            name: product.title,
            count: 0,
            price: product.price,
          });
        }
      }

      this.cardsData = cardsData;
      console.log(this.cardsData);
    },

    placeOrder() {
      const productIds = this.products.map((product) => product.id);
      const productPrices = this.products.map((product) => product.price);

      this.$emit("order-placed", { productIds, productPrices });
    },

    // Добавление единицы товара в корзину
    async addBasket(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const formData = new FormData();
      formData.append("productId", id);

      try {
        await axios.post("http://localhost:8080/basket", formData, { headers });

        const product = this.products.find((product) => product.id === id);
        if (product) {
          product.count++;
        }

        this.updateCardsData();
        this.$forceUpdate(); // Обновляем отображение
      } catch (error) {
        console.error("Error adding product to basket:", error);
      }
    },

    // Уменьшение единицы товара в корзине
    async decreaseProduct(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const basketItem = this.baskets.find((item) => item.productId === id);

      if (!basketItem) return;

      try {
        await axios.patch(
          `http://localhost:8080/basket/decrease/${basketItem.id}`,
          {},
          { headers }
        );

        const product = this.products.find((product) => product.id === id);
        if (product && product.count > 1) {
          product.count--;
        } else if (product) {
          this.products = this.products.filter((p) => p.id !== id);
        }

        this.$forceUpdate(); // Обновляем отображение
      } catch (error) {
        console.error("Error decreasing product count:", error);
      }
    },

    // Удаление корзины
    async deleteCard(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const basketItem = this.baskets.find((item) => item.productId === id);

      if (!basketItem) return;

      try {
        await axios.delete(`http://localhost:8080/basket/${basketItem.id}`, {
          headers,
        });

        this.products = this.products.filter((product) => product.id !== id);

        this.$forceUpdate(); // Обновляем отображение
      } catch (error) {
        console.error("Error deleting product from basket:", error);
      }
    },
    allPrice(products) {
      this.allPriceNumber = products.reduce(
        (total, product) => total + product.price * product.count,
        0
      );
      console.log(this.allPriceNumber);

      this.allCount = products.reduce(
        (total, product) => total + product.count,
        0
      );
    },
    // Получаем пользователя
    getUser() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:8080/users/name", { headers })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => console.log(error));
    },
    // Отправка данных
    responseDataUser() {
      console.log(this.cardsData);

      const order = {
        city: this.userCity,
        deliveryMethod: this.deliveryMethod,
        allPrice: this.allPriceNumber,
        buyer: this.user.inOrganization ? "Частное лицо" : "Организация",
        allCountProduct: this.allCount,
        orderProducts: this.cardsData.map((product) => ({
          product: {
            id: product.id,
          },
          productCounts: product.count,
        })),
      };
      console.log(order);

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post("http://localhost:8080/order", order, { headers })
        .then((response) => {
          console.log(response.data);
          this.isDelete = true;
          this.clearCards();
        })
        .catch((error) => console.log(error));
    },
    clearCards() {
      this.$refs.cardsBasket.clearCards(); // Вызов метода дочернего компонента через ref
    },
  },

  mounted() {
    this.responseData();
    this.startGeo();
    this.getUser();
    this.responseDataTest();
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
  align-items: baseline;
}

.form-container {
  display: grid;
}

.delivery-container {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #dee7ff;
  border-radius: 5px;
}

.delivery {
  display: flex;
  justify-content: space-between;
  margin-bottom: 70px;
}

.delivery-container-text {
  margin-right: 177px;
}

.info-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
  align-items: center;
}

.payment-all {
  margin-top: 28px;
  font-weight: 700;
  font-size: 17px;
}

.button-info {
  display: grid;
  justify-items: end;
}

.all-info {
  border: rgba(0, 0, 0, 0.5) 1px solid;
  padding: 40px;
  border-radius: 5px;
  margin-bottom: 140px;
}

button {
  max-width: 176px;
}

.delivery-title {
  font-weight: 300;
  font-size: 17px;
  margin-bottom: 10px;
}

.delivery-text {
  font-weight: 300;
  font-size: 15px;
}

/* radio */
.radio-button__input:checked + .radio-button__label .radio-button__custom {
  transform: translateY(-50%) scale(0.9);
  border: 5px solid #4c8bf5;
  color: #4c8bf5;
}

.radio-button__input:checked + .radio-button__label {
  color: #4c8bf5;
}

.radio-button__label:hover .radio-button__custom {
  transform: translateY(-50%) scale(1.2);
  border-color: #4c8bf5;
  box-shadow: 0 0 10px #4c8bf580;
}

/* Форма для выбора доставки */
:focus {
  outline: 0;
  border-color: #2260ff;
  /* box-shadow: 0 0 0 4px #b5c9fc; */
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

@media screen and (max-width: 425px) {
  .delivery {
    flex-wrap: wrap;
  }
  .delivery-container {
    width: 100%;
  }
}

@media screen and (max-width: 320px) {
  .all-info {
    width: 300px;
  }
}
</style>
