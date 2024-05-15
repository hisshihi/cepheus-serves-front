<template>
  <main>
    <div class="all-sidebar">
      <div id="mysidebar" class="sidebar" :class="{ shrink_sidebar: isOpen }">
        <!-- <div class="sidebar-arrow">
        <img
          :class="{ 'slidebar-arrow-180': isOpen }"
          src="../assets/arrow2.png"
          alt="arrow"
          @click="toggleSidebar()"
        />
      </div> -->
        <ul class="sidebar-navlink">
          <!-- Не админ -->
          <div v-if="role != '[ADMIN]'" class="navigation">
            <li class="li"><router-link to="/">
              <span>Главная</span>
            </router-link></li>
            <li class="li"><router-link to="/products">
              <span>Товары</span>
            </router-link></li>
            <li class="li"><router-link to="/company">
              <span>Компания</span>
            </router-link></li>
            <!-- <router-link to="/company" class="li link">
              <p>Компания</p>
            </router-link> -->
          </div>

          <div v-else class="navigation">
            <router-link to="/admin/user" class="li"
              ><li class="li">
                <a class="" href="#">Пользователи</a>
              </li></router-link
            >
            <router-link to="/admin/products" class="li">
              <li class="li"><a class="" href="#">Товары</a></li>
            </router-link>
            <router-link to="/admin/orders" class="li">
              <li class="li"><a class="" href="#">Заказы</a></li>
            </router-link>
            <router-link to="/admin/statistics" class="li">
              <li class="li"><a class="" href="#">Статистика</a></li>
            </router-link>
            <router-link to="/admin/slider" class="li">
              <li class="li"><a class="" href="#">Слайдер</a></li>
            </router-link>
          </div>

          <li class="li"><router-link to="/favorites">
              <span>Избранное</span>
            </router-link></li>

          <li class="li" v-if="token">
            <router-link to="/authenticate">
              <!-- <div class="svg-container">
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.0406 15.0625C15.8508 13.0055 14.0172 11.5305 11.8773 10.8313C14.053 9.53609 15.0951 6.94698 14.4235 4.50575C13.7518 2.06451 11.5319 0.372875 9 0.372875C6.46806 0.372875 4.24816 2.06451 3.57652 4.50575C2.90487 6.94698 3.94704 9.53609 6.12266 10.8313C3.98281 11.5297 2.14922 13.0047 0.959375 15.0625C0.840586 15.2562 0.836273 15.4991 0.948109 15.6969C1.05995 15.8947 1.27031 16.0162 1.49752 16.0142C1.72473 16.0123 1.93298 15.8872 2.04141 15.6875C3.51328 13.1437 6.11484 11.625 9 11.625C11.8852 11.625 14.4867 13.1437 15.9586 15.6875C16.067 15.8872 16.2753 16.0123 16.5025 16.0142C16.7297 16.0162 16.9401 15.8947 17.0519 15.6969C17.1637 15.4991 17.1594 15.2562 17.0406 15.0625V15.0625ZM4.625 6C4.625 3.58375 6.58375 1.625 9 1.625C11.4162 1.625 13.375 3.58375 13.375 6C13.375 8.41625 11.4162 10.375 9 10.375C6.58483 10.3724 4.62758 8.41517 4.625 6V6Z"
                    fill="#0D141C"
                  />
                </svg>
              </div> -->
              <span>Авторизироваться</span>
            </router-link>
          </li>
          <li class="li" v-else>
            <router-link to="/user">
              <span>Пользователь</span>
            </router-link>
          </li>

          <li class="li"><router-link to="/basket">
              <span>Корзина</span>
            </router-link></li>
        </ul>
      </div>
      <div class="open-button" @click="toggleSidebar()">
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z"
            fill="#0F0F0F"
          />
        </svg>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
    };
  },
  props: {
    role: {
      type: String,
      required: true,
      token: true,
    },
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      localStorage.removeItem("token");
      window.location.href = "/";
    },
    checkToken() {
      const isExistsToken = localStorage.getItem("token");
      if (isExistsToken) {
        this.token = false;
      }
    },
  },
  mounted() {
    this.checkToken();
  },
};
</script>

<style scoped>
.li {
  font-size: 22px;
}

.all-sidebar {
  display: none;
  align-items: center;
  position: fixed;
  z-index: 2000;
}
.open-button {
  width: 30px;
  height: 50px;
  background-color: #efeeee;
  display: grid;
  align-items: center;
  border-radius: 0 60px 60px 0;
  backdrop-filter: blur(10px) saturate(100%);
  -webkit-backdrop-filter: blur(10px) saturate(100%);
  background-color: rgba(238, 238, 238, 0.66);
}

main {
  display: flex;
}
section {
  flex: 1;
  min-height: 100vh;
  position: relative;
  background-color: var(--section);
}
.sidebar {
  max-width: 300px;
  /* height: 100vh; */
  max-height: auto;
  /* background-color: var(--white); */
  background-color: rgb(239, 238, 238);
  border-right: 1px solid var(--gray);
  overflow: auto;
  position: relative;
  transition: max-width 0.5s;
  overflow: hidden;
  margin: 50px 0;
  border-radius: 15px;
}
.colleps-btn {
  background-color: transparent;
  position: absolute;
  bottom: 40px;
  right: 30px;
  border: none;
  font-size: 26px;
  transform: rotate(-90deg);
  cursor: pointer;
  padding: 12px;
  color: var(--black);
  transition: all 0.4s ease;
}
.content-page {
  height: 100%;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.content-page h1 {
  font-size: 60px;
  line-height: 70px;
  color: var(--black);
}
.sidebar-navlink {
  padding: 26px;
  /* padding-top: 100px; */
}
ul {
  list-style: none;
  padding-top: 100px;
}
a {
  text-decoration: none;
  /* padding: 12px 20px 12px 12px !important; */
}
ul li:not(:last-child) {
  /* padding-bottom: 40px; */
}
ul li a {
  padding: 12px;
  color: var(--black);
  font-size: 22px;
  line-height: 30px;
  transition: all 0.3s ease;
  border-radius: 6px;
  display: block;
  white-space: nowrap;
}
ul li a span {
  white-space: nowrap;
}
ul li a:hover {
  background-color: rgba(13, 127, 242, 0.5);
}
.toggle-dark-theme {
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
}
.toggle-dark-theme button {
  width: 70px;
  background-color: gray;
  border-radius: 20px;
  border: none;
  position: relative;
  padding: 4px;
  cursor: pointer;
}
.toggle-dark-theme .icon {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background-color: rgb(50, 0, 106);
  position: relative;
  transition: all 0.5s ease;
}
.toggle-dark-theme .icon::before {
  font-family: "Font Awesome 6 Free";
  font-weight: 400;
  content: "\f186";
  position: absolute;
  color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.5s ease;
}
body.dark .toggle-dark-theme .icon {
  transform: translateX(calc(100% + 10px));
  background-color: yellow;
}
body.dark .toggle-dark-theme .icon::before {
  color: black;
  content: "\f185";
}
.sidebar.shrink_sidebar ul li a span {
  opacity: 0;
  transition: all 0.4s ease;
}
.sidebar.shrink_sidebar {
  max-width: 0px;
  transition: max-width 0.5s;
}

.sidebar.shrink_sidebar .colleps-btn {
  transform: rotate(90deg);
}

a {
  display: flex !important;
}

img {
  margin-right: 5px;
}

.sidebar-arrow {
  display: flex;
  justify-content: flex-end;
  margin: 10px;
}

.slidebar-arrow-180 {
  transform: rotate(180deg);
}

@media screen and (max-width: 768px) {
  .all-sidebar {
    display: flex;
  }
}
</style>
