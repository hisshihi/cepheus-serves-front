<template>
  <div :style="style" class="modal-mask" v-if="show">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <h2>Смена данных организации</h2>
          <button @click="closeModal" class="modal-close-button">
            &times;
          </button>
        </div>
        <form @submit.prevent="putData">
          <label for="">Название организации</label>
          <input v-model="orgName" type="text" name="" id="" autofocus />

          <label for="">Адрес организации</label>
          <input v-model="orgAddress" type="text" name="" id="" autofocus />

          <label for="">ИНН организации</label>
          <input v-model="orgINN" type="text" name="" id="" autofocus />

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
      orgName: "",
      orgAddress: "",
      orgINN: "",
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
        .get("http://localhost:8080/users/name", { headers })
        .then((response) => {
          this.orgName = response.data.orgName;
          this.orgAddress = response.data.orgAddress;
          this.orgINN = response.data.orgINN;
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
          "http://localhost:8080/users/editing",
          {
            orgName: this.orgName,
            orgAddress: this.orgAddress,
            orgINN: this.orgINN,
          },
          { headers }
        )
        .then((response) => {
          this.show = false;
          this.$emit("modal-closed-org", {
            show: this.show,
            orgName: this.orgName,
            orgAddress: this.orgAddress,
            orgINN: this.orgINN,
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
