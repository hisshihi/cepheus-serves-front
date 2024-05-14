<template>
  <div :style="style" class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Заказы</h2>
          <button @click="closeModal" class="modal-close-button">
            &times;
          </button>
        </div>
        <h1 style="text-align: center;" v-if="orders.length == 0">Заказов нет</h1>
        <div class="modal-body" v-for="order in orders" :key="order.id">
          <div class="modal">
            <div class="id-and-status">
              <div class="order-id">
                Номер заказа <strong>{{ order.id }}</strong>
              </div>
              <div class="order-status">
                Статус:
                <strong  v-if="order.statuses == 'DONE'">Выполнено</strong>
                <strong  v-if="order.statuses == 'PENDING'">Обрабатывается</strong>
                <strong  v-if="order.statuses == 'REJECTED'">Отклонён</strong>
              </div>
            </div>
            <div class="order-info">
              <div class="order-info-title">Информация о заказе</div>
              <div class="order-info-text">Город: {{ order.city }}</div>
              <div class="all-order-info-text">
                <div>
                  <div class="order-info-text">
                    Покупатель: {{ order.buyer }}
                  </div>
                  <div class="order-info-text">
                    Тип доставки: {{ order.deliveryMethod }}
                  </div>
                </div>
                <div>
                  <div class="order-info-text">
                    Кол-во товаров: {{ order.allCountProduct }}
                  </div>
                  <div class="order-info-text">
                    Стоимость: {{ order.allPrice }}
                  </div>
                </div>
              </div>
              <div
                class="order-product"
                v-for="product in order.orderProductDto"
                :key="product.id"
              >
                <div class="all-order-info-text">
                  <div class="order-info-text">
                    {{ product.productTitleImpl }}
                  </div>
                  <div class="order-info-text">
                    <router-link
                      :to="{
                        name: 'show-card',
                        params: { id: product.productEntityId },
                      }"
                    >
                      <div class="svg-container">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20px"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M22 2.00001L11.75 12.25"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M21.9998 6.49999L21.9998 1.99999L17.0568 1.99999"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                            <path
                              d="M11 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12.75"
                              stroke="#000000"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </g>
                        </svg>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ButtonComponent from "./ButtonComponent.vue";

export default {
  components: {
    ButtonComponent,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      ordersUser: this.orders,
      products: [],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    }
  },
  mounted() {},
};
</script>

<style scoped>
/* Модальное окно */
.modal-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-wrapper {
  width: 100%;
  max-width: 640px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px #26a9f3 solid;
  max-height: 805px;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #26a9f3 #f5f5f5;
}

.modal-wrapper::-webkit-scrollbar {
  width: 10px;
  border-radius: 15px !important;
}

.modal-wrapper::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 15px !important;
}

.modal-wrapper::-webkit-scrollbar-thumb {
  background-color: #26a9f3;
  border-radius: 15px !important;
}

.modal-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.modal-close-button {
  background-color: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

/* Информация */
.all-order-info-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.id-and-status {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.order-info-title {
  font-weight: 700;
  font-size: 18px;
  margin: 10px 0;
}

.order-info-text {
  font-weight: 500;
  font-size: 17px;
  margin: 5px 0;
}

.svg-container {
  background-color: rgb(232, 237, 245);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: background-color 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05);
  cursor: pointer;
  position: relative;
}

.svg-container:hover {
  background-color: rgba(13, 127, 242, 0.5);
}
</style>
