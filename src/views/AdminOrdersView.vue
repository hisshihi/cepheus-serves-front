<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Кол-во проданного товара</th>
          <th scope="col">Сумма</th>
          <th scope="col">Покупатель</th>
          <th scope="col">Способ доставки</th>
          <th scope="col">Город</th>
          <th scope="col">Статус</th>
          <th scope="col"># товара</th>
          <th scope="col">Название</th>
          <th scope="col">Email пользователя</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.allCountProduct }}</td>
          <td>{{ order.allPrice }}</td>
          <td>{{ order.buyer }}</td>
          <td>{{ order.deliveryMethod }}</td>
          <td>{{ order.city }}</td>
          <td>
            <select @change="updateStatusOrder(order.id, $event)">
              <option
                v-for="orderStatus in orderStatuses"
                :key="orderStatus"
                :selected="order.statuses == orderStatus.value"
                :value="orderStatus.value"
              >
                {{ orderStatus.label }}
              </option>
            </select>
          </td>
          <td>
            <tr v-for="product in order.orderProductDto" :key="product.id">
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
            </tr>
          </td>
          <td>
            <tr v-for="product in order.orderProductDto" :key="product.id">
              {{
                product.productTitleImpl
              }}
            </tr>
          </td>
          <td>{{ order.userEmailImpl }}</td>
          <td>{{ order.userFirstNameImpl }}</td>
          <td>{{ order.userLastNameImpl }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: [],
      orderStatuses: [
        { value: "DONE", label: "Выполнен" },
        { value: "PENDING", label: "В ожидании" },
        { value: "REJECTED", label: "Отклонен" },
      ],
    };
  },
  methods: {
    getOrder() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          "https://cepheus-serves-spring-production.up.railway.app/order/all",
          { headers }
        )
        .then((response) => {
          this.orders = response.data;
          console.log(this.orders);
        })
        .catch((error) => console.log(error));
    },
    updateStatusOrder(id, event) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const status = event.target.value;
      axios
        .patch(
          "https://cepheus-serves-spring-production.up.railway.app/order/" + id,
          { statuses: status },
          { headers }
        )
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border: none;
  border-collapse: separate;
  margin: 50px 0;
}

.table thead th {
  font-weight: bold;
  text-align: left;
  border: none;
  padding: 10px 15px;
  background: #ededed;
  font-size: 14px;
  border-top: 1px solid #ddd;
}

.table tr th:first-child,
.table tr td:first-child {
  border-left: 1px solid #ddd;
}

.table tr th:last-child,
.table tr td:last-child {
  border-right: 1px solid #ddd;
}

.table thead tr th:first-child {
  border-radius: 20px 0 0 0;
}

.table thead tr th:last-child {
  border-radius: 0 20px 0 0;
}

.table tbody td {
  text-align: left;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  vertical-align: top;
}

.table tbody tr:nth-child(even) {
  background: #f8f8f8;
}

.table tbody tr:last-child td {
  border-bottom: 1px solid #ddd;
}

.table tbody tr:last-child td:first-child {
  border-radius: 0 0 0 20px;
}

.table tbody tr:last-child td:last-child {
  border-radius: 0 0 20px 0;
}

@media screen and (max-width: 768px) {
  .table-container {
    overflow-x: auto;
  }
}
</style>
