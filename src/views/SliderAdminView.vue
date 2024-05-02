<template>
  <div class="slider">
    <slider class="slider"></slider>
  </div>

  <!-- Создание нового блока слайдера -->
  <h2>Создание нового блока слайдера</h2>
  <form @submit.prevent="addSlider">
    <label for="">Заголовок</label>
    <input type="text" v-model="title" required />
    <label for="">Описание</label>
    <textarea type="text" v-model="text" required></textarea>
    <label for="">Ссылка на товар</label>
    <input type="text" v-model="link" required />
    <label for="">Изображение</label>
    <input type="file" @change="previewFile" required> 

    <button-component :name="'Создать'"></button-component>
  </form>

  <!-- Подробности о слайдере -->
  <h2>О слайдере</h2>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Изображение</th>
        <th scope="col">Заголовок</th>
        <th scope="col">Описание</th>
        <th scope="col">Ссылка</th>
        <th scope="col">Изменить</th>
        <th scope="col">Удалить</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sliderData" :key="item.id">
        <td>{{ item?.id }}</td>
        <td>
          <img
            class="img"
            :src="'data:image/png;base64,' + item?.bytes"
            :alt="item?.name"
          />
        </td>
        <td>{{ item?.title }}</td>
        <td>{{ item?.text }}</td>
        <td><a :href="item?.link">Product</a></td>
        <td class="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M480-120q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-480q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q82 0 155.5 35T760-706v-94h80v240H600v-80h110q-41-56-101-88t-129-32q-117 0-198.5 81.5T200-480q0 117 81.5 198.5T480-200q105 0 183.5-68T756-440h82q-15 137-117.5 228.5T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"
            />
          </svg>
        </td>
        <td class="button" @click="deleteSlider(item.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path
              d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
            />
          </svg>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Slider from "@/components/Slider.vue";
import axios from "axios";
import ButtonComponent from "@/components/ButtonComponent.vue";
import FileUpload from "primevue/fileupload";

export default {
  components: {
    Slider,
    ButtonComponent,
    FileUpload,
  },
  data() {
    return {
      sliderData: [],
      title: "",
      text: "",
      file: {},
      link: "",
    };
  },
  methods: {
    responseData() {
      axios
        .get("http://localhost:8080/slider")
        .then((response) => {
          const data = response.data;
          this.sliderData = data;
        })
        .catch((error) => console.log(error));
    },
    deleteSlider(id) {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .delete("http://localhost:8080/admin/slider/" + id, { headers })
        .then((response) => {
          const index = this.sliderData.findIndex((slider) => slider.id === id);
          if (index !== -1) {
            this.sliderData.splice(index, 1);
          }
        })
        .catch((error) => console.log(error));
    },
    previewFile(event) {
      this.file = event.target.files[0];
    },
    addSlider() {
      console.log(this.file);
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("text", this.text);
      formData.append("link", this.link);
      formData.append("image", this.file);
      axios
        .post("http://localhost:8080/admin/slider", formData, { headers })
        .then((response) => {
          this.title = "";
          this.text = "";
          this.link = "";
          this.file = "";
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.responseData();
  },
};
</script>

<style scoped>
.img {
  width: 100px;
}

.button {
  cursor: pointer;
}


</style>
