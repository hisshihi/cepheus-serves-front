<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Email</th>
          <th scope="col">Телефон</th>
          <th scope="col">Роль</th>
          <th scope="col">Обновить</th>
          <th scope="col">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
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
              :name="'Обновить'"
              :type="'button'"
            ></button-component>
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

<style scoped></style>
