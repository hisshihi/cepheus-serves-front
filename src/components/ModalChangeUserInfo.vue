<template>
  <div :style="style" class="modal-mask" v-if="show">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Смена контактных данных</h2>
          <button @click="closeModal" class="modal-close-button">
            &times;
          </button>
        </div>
        <form @submit.prevent="putData">
          <label for="">Email</label>
          <input v-model="email" type="text" name="" id="" autofocus />

          <label for="">Телефон</label>
          <input v-model="phone" type="text" name="" id="" autofocus />

          <label for="">Адрес</label>
          <input v-model="address" type="text" name="" id="" autofocus />

          <button-component
            :name="'Редактировать'"
            @click="patchData"
          ></button-component>
        </form>
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

  data() {
    return {
      show: true,
      email: "",
      phone: "",
      address: "",
    };
  },
  methods: {
    closeModal() {
      this.show = false;
    },
    getUsersData() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(
          "https://cepheus-serves-spring-production.up.railway.app/users/name",
          { headers }
        )
        .then((response) => {
          this.email = response.data.email;
          this.phone = response.data.phone;
          this.address = response.data.address;
        })
        .catch((error) => console.log(error));
    },
    patchData() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .patch(
          "https://cepheus-serves-spring-production.up.railway.app/users/editing",
          { email: this.email, phone: this.phone, address: this.address },
          { headers }
        )
        .then((response) => {
          this.show = false;
          this.$emit("modal-closed-info", {
            show: this.show,
            email: this.email,
            phone: this.phone,
            address: this.address,
          });
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getUsersData();
  },
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
  max-width: 600px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
</style>
