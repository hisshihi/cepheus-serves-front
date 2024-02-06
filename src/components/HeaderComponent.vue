<template>
  <header>
    <div class="container">
      <nav class="nav">
        <router-link to="/"
          ><img src="../assets/logo.png" alt=""
        /></router-link>
        <ul class="ul" v-if="role != '[ADMIN]'">
          <li class="li"><a class="link" href="#">О нас</a></li>
          <li class="li"><a class="link" href="#">Товары</a></li>
          <li class="li"><a class="link" href="#">Контакты</a></li>
        </ul>
        <ul class="ul" v-else>
          <li class="li"><a class="link" href="#">Пользователи</a></li>
          <li class="li"><a class="link" href="#">Товары</a></li>
          <li class="li"><a class="link" href="#">Заказы</a></li>
          <li class="li"><a class="link" href="#">Статистика</a></li>
        </ul>
        <ul class="ul">
          <li class="li">
            <a class="link" href="#"> </a>
            <router-link to="/basket">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M221-120q-27 0-48-16.5T144-179L42-549q-5-19 6.5-35T80-600h190l176-262q5-8 14-13t19-5q10 0 19 5t14 13l176 262h192q20 0 31.5 16t6.5 35L816-179q-8 26-29 42.5T739-120H221Zm-1-80h520l88-320H132l88 320Zm260-80q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM367-600h225L479-768 367-600Zm113 240Z"
                />
              </svg>
            </router-link>
          </li>
          <li class="li" v-if="token">
            <router-link to="/authenticate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                />
              </svg>
            </router-link>
          </li>
          <li class="li" v-else>
            <router-link to="/user">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"
                />
              </svg>
            </router-link>
          </li>
          <li class="li">
            <a class="link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path
                  d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",

  props: {
    role: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      token: true,
    };
  },

  mounted() {
    this.checkToken();
  },

  methods: {
    checkToken() {
      const isExistsToken = localStorage.getItem("token");
      if (isExistsToken) {
        this.token = false;
      }
    },
  },
};
</script>

<style scoped>
.ul {
  display: flex;
  padding: 0;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.li:nth-child(2) {
  /* margin: 0 10px; */
  margin-right: 10px;
  margin-left: 10px;
}

.li:nth-child(3) {
  /* margin: 0 10px; */
  margin-right: 10px;
}

.li > .link {
  font-size: 20px;
  font-weight: 600;
}

img {
  width: 40px;
}

svg {
  width: 40px;
  height: 40px;
}

header {
  border-bottom: 1px black solid;
}
</style>
