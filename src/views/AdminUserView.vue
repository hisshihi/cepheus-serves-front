<template>
  <div>
    <table class="table" style="margin-bottom: 600px;">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Email</th>
          <th scope="col">Телефон</th>
          <th scope="col">Роль</th>
          <th scope="col">Удалить</th>
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
          <td>
            <button-component
              :name="'Удалить'"
              :type="'button'"
              @click="deleteUser(user.id)"
            ></button-component>
          </td>
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
      userRoles: ["ADMIN", "USER", "MANAGER"],
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
        .get("http://localhost:8080/users", { headers })
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
        .delete("http://localhost:8080/users/" + this.userId, { headers })
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
        .patch("http://localhost:8080/users/" + id, {role: role}, { headers })
        .then((response) => {
          // console.log(response);
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
  background: #EDEDED;
  font-size: 14px;
  border-top: 1px solid #ddd;
}

.table tr th:first-child, .table tr td:first-child {
  border-left: 1px solid #ddd;
}

.table tr th:last-child, .table tr td:last-child {
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
  background: #F8F8F8;
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
</style>
