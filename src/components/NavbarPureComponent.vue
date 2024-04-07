<template>
  <main>
    <div id="mysidebar" class="sidebar" :class="{'shrink_sidebar': isOpen}">
        <div class="sidebar-arrow">
            <img :class="{'slidebar-arrow-180': isOpen}" src="../assets/arrow2.png" alt="arrow" @click="toggleSidebar()">
        </div>
      <ul class="sidebar-navlink">
        <li>
          <a href="#">
            <i class="fa-solid fa-house"><img src="../assets/acc.svg" alt="acc"></i>
            <span>Профиль</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-chart-simple"><img src="../assets/favorite.png" alt="favorite"></i>
            <span>Избранное</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-clock-rotate-left"><img src="../assets/busket.png" alt="busket"></i>
            <span>Корзина</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-list-check"><img src="../assets/img.png" alt="notifications"></i>
            <span>Уведомления</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa-solid fa-users"><img src="../assets/logout.png" alt="notifications"></i>
            <span>Выход</span>
          </a>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        toggleSidebar() {
            this.isOpen = !this.isOpen
        }
    }
}

</script>

<style scoped>

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
  max-height: 800px;
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
  padding: 12px 20px 12px 12px !important;
}
ul li:not(:last-child) {
  padding-bottom: 40px;
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
  max-width: 110px;
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
</style>
