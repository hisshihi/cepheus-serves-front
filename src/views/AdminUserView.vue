<template>
  <div class="filters">
    <div class="search-container">
      <input
        type="text"
        placeholder="Поиск"
        class="search-input"
        v-model="getInputSearch"
        @keyup="getProductsBySearch"
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="search-icon"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15 10.5C15 12.9853 12.9853 15 10.5 15C8.01472 15 6 12.9853 6 10.5C6 8.01472 8.01472 6 10.5 6C12.9853 6 15 8.01472 15 10.5ZM14.1793 15.2399C13.1632 16.0297 11.8865 16.5 10.5 16.5C7.18629 16.5 4.5 13.8137 4.5 10.5C4.5 7.18629 7.18629 4.5 10.5 4.5C13.8137 4.5 16.5 7.18629 16.5 10.5C16.5 11.8865 16.0297 13.1632 15.2399 14.1792L20.0304 18.9697L18.9697 20.0303L14.1793 15.2399Z"
            fill="#6583a2"
          ></path>
        </g>
      </svg>
    </div>
  </div>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Email</th>
          <th scope="col">Телефон</th>
          <th scope="col">Роль</th>
          <!-- <th scope="col">Удалить</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <select @change="updateRoleUser(user.id, $event)">
              <option
                v-for="userRole in userRoles"
                :key="userRole"
                :selected="user.role == userRole"
                :value="userRole"
              >
                {{ userRole }}
              </option>
            </select>
          </td>
          <!-- <td>
            <button-component
              :name="'Удалить'"
              :type="'button'"
              @click="deleteUser(user.id)"
            ></button-component>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import ButtonComponent from "@/components/ButtonComponent.vue";
export default {
  components: {
    ButtonComponent,
  },

  data() {
    return {
      users: [],
      userId: null,
      userRoles: ["ADMIN", "USER"],
      getInputSearch: null,
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("https://cepheus-serves-spring-production.up.railway.app/users", {
          headers,
        })
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => console.log(error));
    },
    deleteUser(id) {
      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      this.userId = id;
      axios
        .delete(
          "https://cepheus-serves-spring-production.up.railway.app/users/" +
            this.userId,
          { headers }
        )
        .then((response) => {
          this.users = this.users.filter((user) => user.id !== this.userId);
          const userToken = response.data;
          localStorage.removeItem(userToken);
        })
        .catch((error) => console.log(error));
    },
    updateRoleUser(id, event) {
      const token = localStorage.getItem("token");
      console.log(token);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const role = event.target.value;
      axios
        .patch(
          "https://cepheus-serves-spring-production.up.railway.app/users/" + id,
          { role: role },
          { headers }
        )
        .then((response) => {
          // console.log(response);
        })
        .catch((error) => console.log(error));
    },

    getProductsBySearch() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (!this.getInputSearch) {
        this.getUsers();
      }
      axios
        .get(
          `https://cepheus-serves-spring-production.up.railway.app/user/${this.getInputSearch}`,
          { headers }
        )
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.users = data;
          // this.users = data.content;
          // this.totalElements = data.totalElements;
          // this.url = "user/" + this.getInputSearch;
          // this.previewLoading = false;
        })
        .catch((error) => console.log(error));
    },
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
  font-size: 18px;
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

/* Фильтры */
.filters {
  display: flex;
  justify-content: space-between;
}

input {
  width: auto;
}

.search-container {
  position: relative;
  display: inline-block;
}

.search-icon {
  position: absolute;
  top: 43%;
  right: 8px;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
  width: 40px;
}
</style>
