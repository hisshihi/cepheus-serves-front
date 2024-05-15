<template>
  <div class="user-container">
    <!-- Панель навигации -->
    <!-- <div class="nav-bar">
      <navbar-pure-component></navbar-pure-component>
    </div> -->
    <!-- Информация о пользователе -->
    <div class="user">
      <!-- Изображение и другие данные -->
      <div class="user-data">
        <div class="user-image">
          <img src="../assets/logo.png" alt="user" />
        </div>
        <div class="user-info">
          <div class="name">{{ firstname }} {{ lastname }}</div>
          <div class="user-change-data">
            <button-component
              :name="'Редактировать'"
              @click="modalLastAndFirstVisible = true"
            ></button-component>
          </div>
        </div>
      </div>
      <!-- Заказы пользователя -->
      <div class="user-orders">
        <div class="orders orders-success" @click="openModal('DONE')">
          <div class="order-number">{{ orderDone.length }}</div>
          <div class="order-text">Выполненные</div>
        </div>
        <div class="orders orders-in-waiting" @click="openModal('PENDING')">
          <div class="order-number">{{ orderPending.length }}</div>
          <div class="order-text">В ожидании</div>
        </div>
        <div class="orders orders-rejected" @click="openModal('REJECTED')">
          <div class="order-number">{{ orderRejected.length }}</div>
          <div class="order-text">Отклонённые</div>
        </div>
      </div>
      <!-- Контакты пользователя -->
      <div class="user-contact">
        <div class="title-contact">Контактная информация</div>
        <div class="contact-info">
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Email</div>
                <div class="contact">{{ email }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component
                :name="'Редактировать'"
                @click="modalChangeInfo = true"
              ></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path
                      d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Телефон</div>
                <div class="contact">{{ phone }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component
                :name="'Редактировать'"
                @click="modalChangeInfo = true"
              ></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M23.1956 5.96875L21.8831 2.6875C21.6553 2.11944 21.1039 1.74789 20.4919 1.75H17.25V1C17.25 0.585786 16.9142 0.25 16.5 0.25H2.25C1.42157 0.25 0.75 0.921573 0.75 1.75V12.25C0.75 13.0784 1.42157 13.75 2.25 13.75H3.84375C4.18363 15.0774 5.37974 16.0059 6.75 16.0059C8.12026 16.0059 9.31637 15.0774 9.65625 13.75H14.3438C14.6836 15.0774 15.8797 16.0059 17.25 16.0059C18.6203 16.0059 19.8164 15.0774 20.1562 13.75H21.75C22.5784 13.75 23.25 13.0784 23.25 12.25V6.25C23.2503 6.15361 23.2318 6.05809 23.1956 5.96875ZM17.25 3.25H20.4919L21.3919 5.5H17.25V3.25ZM2.25 1.75H15.75V7.75H2.25V1.75ZM6.75 14.5C5.92157 14.5 5.25 13.8284 5.25 13C5.25 12.1716 5.92157 11.5 6.75 11.5C7.57843 11.5 8.25 12.1716 8.25 13C8.25 13.8284 7.57843 14.5 6.75 14.5ZM14.3438 12.25H9.65625C9.31637 10.9226 8.12026 9.99412 6.75 9.99412C5.37974 9.99412 4.18363 10.9226 3.84375 12.25H2.25V9.25H15.75V10.4041C15.0534 10.8067 14.547 11.4715 14.3438 12.25ZM17.25 14.5C16.4216 14.5 15.75 13.8284 15.75 13C15.75 12.1716 16.4216 11.5 17.25 11.5C18.0784 11.5 18.75 12.1716 18.75 13C18.75 13.8284 18.0784 14.5 17.25 14.5ZM21.75 12.25H20.1562C19.8124 10.9261 18.6179 10.0013 17.25 10V7H21.75V12.25Z"
                      fill="#121417"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Адрес</div>
                <div class="contact">{{ address }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component
                :name="'Редактировать'"
                @click="modalChangeInfo = true"
              ></button-component>
            </div>
          </div>
        </div>
        <div class="title-contact" v-if="inOrganization">Организация</div>
        <div class="contact-info" v-if="inOrganization">
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    fill="#000000"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.25 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6.5 9.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM7.25 5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM10 12.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zm.75-4.25a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM10 5.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM14.25 12a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zm-.75-2.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM14.25 5a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M3 20a2 2 0 002 2h3.75a.75.75 0 00.75-.75V19h3v2.25c0 .414.336.75.75.75H17c.092 0 .183-.006.272-.018a.758.758 0 00.166.018H21.5a2 2 0 002-2v-7.625a2 2 0 00-.8-1.6l-1-.75a.75.75 0 10-.9 1.2l1 .75a.5.5 0 01.2.4V20a.5.5 0 01-.5.5h-2.563c.041-.16.063-.327.063-.5V3a2 2 0 00-2-2H5a2 2 0 00-2 2v17zm2 .5a.5.5 0 01-.5-.5V3a.5.5 0 01.5-.5h12a.5.5 0 01.5.5v17a.5.5 0 01-.5.5h-3v-2.25a.75.75 0 00-.75-.75h-4.5a.75.75 0 00-.75.75v2.25H5z"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Название орагнизации</div>
                <div class="contact">{{ orgName }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component
                :name="'Редактировать'"
                @click="modalChangeOrg = true"
              ></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 8.4666669 8.4666669"
                    id="svg8"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:cc="http://creativecommons.org/ns#"
                    xmlns:dc="http://purl.org/dc/elements/1.1/"
                    xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                    xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                    xmlns:svg="http://www.w3.org/2000/svg"
                  >
                    <defs id="defs2" />
                    <g id="layer1" transform="translate(0,-288.53332)">
                      <path
                        d="m 4.2324219,288.79688 c -1.6042437,0 -2.9101556,1.30591 -2.9101563,2.91015 -10e-7,2.82277 2.7460938,4.96875 2.7460938,4.96875 a 0.26460978,0.26460978 0 0 0 0.3300781,0 c 0,0 2.7460996,-2.14598 2.7460937,-4.96875 -3.4e-6,-1.60424 -1.3078657,-2.91015 -2.9121093,-2.91015 z m 0,0.52929 c 1.3182605,0 2.3828097,1.0626 2.3828125,2.38086 4.8e-6,2.30926 -2.0910618,4.13374 -2.3808594,4.38086 -0.2884142,-0.24588 -2.3828134,-2.0707 -2.3828125,-4.38086 5e-7,-1.31826 1.0625988,-2.38086 2.3808594,-2.38086 z"
                        id="path929"
                        style="
                          color: #000000;
                          font-style: normal;
                          font-variant: normal;
                          font-weight: normal;
                          font-stretch: normal;
                          font-size: medium;
                          line-height: normal;
                          font-family: sans-serif;
                          font-variant-ligatures: normal;
                          font-variant-position: normal;
                          font-variant-caps: normal;
                          font-variant-numeric: normal;
                          font-variant-alternates: normal;
                          font-feature-settings: normal;
                          text-indent: 0;
                          text-align: start;
                          text-decoration: none;
                          text-decoration-line: none;
                          text-decoration-style: solid;
                          text-decoration-color: #000000;
                          letter-spacing: normal;
                          word-spacing: normal;
                          text-transform: none;
                          writing-mode: lr-tb;
                          direction: ltr;
                          text-orientation: mixed;
                          dominant-baseline: auto;
                          baseline-shift: baseline;
                          text-anchor: start;
                          white-space: normal;
                          shape-padding: 0;
                          clip-rule: nonzero;
                          display: inline;
                          overflow: visible;
                          visibility: visible;
                          opacity: 1;
                          isolation: auto;
                          mix-blend-mode: normal;
                          color-interpolation: sRGB;
                          color-interpolation-filters: linearRGB;
                          solid-color: #000000;
                          solid-opacity: 1;
                          vector-effect: none;
                          fill: #000000;
                          fill-opacity: 1;
                          fill-rule: nonzero;
                          stroke: none;
                          stroke-width: 0.52916664;
                          stroke-linecap: round;
                          stroke-linejoin: round;
                          stroke-miterlimit: 4;
                          stroke-dasharray: none;
                          stroke-dashoffset: 0;
                          stroke-opacity: 1;
                          paint-order: stroke fill markers;
                          color-rendering: auto;
                          image-rendering: auto;
                          shape-rendering: auto;
                          text-rendering: auto;
                          enable-background: accumulate;
                        "
                      />
                      <path
                        d="m 4.2324219,290.38477 c -0.7274912,0 -1.3222633,0.59477 -1.3222657,1.32226 -4.5e-6,0.7275 0.5947697,1.32422 1.3222657,1.32422 0.727496,0 1.3242233,-0.59672 1.3242187,-1.32422 -2.3e-6,-0.72749 -0.5967275,-1.32226 -1.3242187,-1.32226 z m 0,0.52929 c 0.4415089,0 0.7949204,0.35146 0.7949219,0.79297 2.7e-6,0.44151 -0.35341,0.79492 -0.7949219,0.79492 -0.441512,0 -0.7929715,-0.35341 -0.7929688,-0.79492 1.4e-6,-0.44151 0.3514598,-0.79297 0.7929688,-0.79297 z"
                        id="circle931"
                        style="
                          color: #000000;
                          font-style: normal;
                          font-variant: normal;
                          font-weight: normal;
                          font-stretch: normal;
                          font-size: medium;
                          line-height: normal;
                          font-family: sans-serif;
                          font-variant-ligatures: normal;
                          font-variant-position: normal;
                          font-variant-caps: normal;
                          font-variant-numeric: normal;
                          font-variant-alternates: normal;
                          font-feature-settings: normal;
                          text-indent: 0;
                          text-align: start;
                          text-decoration: none;
                          text-decoration-line: none;
                          text-decoration-style: solid;
                          text-decoration-color: #000000;
                          letter-spacing: normal;
                          word-spacing: normal;
                          text-transform: none;
                          writing-mode: lr-tb;
                          direction: ltr;
                          text-orientation: mixed;
                          dominant-baseline: auto;
                          baseline-shift: baseline;
                          text-anchor: start;
                          white-space: normal;
                          shape-padding: 0;
                          clip-rule: nonzero;
                          display: inline;
                          overflow: visible;
                          visibility: visible;
                          opacity: 1;
                          isolation: auto;
                          mix-blend-mode: normal;
                          color-interpolation: sRGB;
                          color-interpolation-filters: linearRGB;
                          solid-color: #000000;
                          solid-opacity: 1;
                          vector-effect: none;
                          fill: #000000;
                          fill-opacity: 1;
                          fill-rule: nonzero;
                          stroke: none;
                          stroke-width: 0.52916664;
                          stroke-linecap: round;
                          stroke-linejoin: round;
                          stroke-miterlimit: 4;
                          stroke-dasharray: none;
                          stroke-dashoffset: 0;
                          stroke-opacity: 1;
                          paint-order: stroke fill markers;
                          color-rendering: auto;
                          image-rendering: auto;
                          shape-rendering: auto;
                          text-rendering: auto;
                          enable-background: accumulate;
                        "
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">Адрес организации</div>
                <div class="contact">{{ orgAddress }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component
                :name="'Редактировать'"
                @click="modalChangeOrg = true"
              ></button-component>
            </div>
          </div>
          <div class="contant-container">
            <div class="contact-container-data">
              <div class="contact-img">
                <div class="svg-container">
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 -0.5 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.5 10H18.5"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M15.5 13H18.5"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16"
                      stroke="#000000"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <div class="contact-label">ИНН организации</div>
                <div class="contact">{{ orgINN }}</div>
              </div>
            </div>
            <div class="contact-button">
              <button-component
                :name="'Редактировать'"
                @click="modalChangeOrg = true"
              ></button-component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <modal-change-user-name
    v-if="modalLastAndFirstVisible"
    @modal-closed="handleModalClose"
  ></modal-change-user-name>
  <modal-change-user-info
    v-if="modalChangeInfo"
    @modal-closed-info="handleModalCloseInfo"
  ></modal-change-user-info>
  <modal-change-user-org
    v-if="modalChangeOrg"
    @modal-closed-org="handleModalCloseOrg"
  ></modal-change-user-org>
  <modal-orders
    @close-modal="show = false"
    :orders="orders"
    v-if="show"
  ></modal-orders>
</template>

<script>
import axios from "axios";
import NavbarPureComponent from "@/components/NavbarPureComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import ModalChangeUserName from "./../components/ModalChangeUserName.vue";
import ModalChangeUserInfo from "./../components/ModalChangeUserInfo.vue";
import ModalChangeUserOrg from "@/components/ModalChangeUserOrg.vue";
import ModalOrders from "./../components/ModalOrders.vue";

export default {
  components: {
    NavbarPureComponent,
    ButtonComponent,
    ModalChangeUserName,
    ModalChangeUserInfo,
    ModalChangeUserOrg,
    ModalOrders,
  },

  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      orgAddress: "",
      orgINN: 0,
      orgName: "",
      inOrganization: false,
      modalLastAndFirstVisible: false,
      modalChangeInfo: false,
      modalChangeOrg: false,

      orders: [],
      orderDone: [],
      orderPending: [],
      orderRejected: [],
      show: false,
    };
  },

  mounted() {
    this.getUser();
    this.getOrder();
  },

  methods: {
    getUser() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          "https://cepheus-serves-spring-production.up.railway.app/users/" +
            token,
          {},
          { headers }
        )
        .then((response) => {
          const user = response.data;
          // console.log(user);
          this.firstname = user.firstname;
          this.lastname = user.lastname;
          this.email = user.email;
          this.phone = user.phone;
          this.address = user.address;
          this.orgName = user.orgName;
          this.orgAddress = user.orgAddress;
          this.orgINN = user.orgINN;
          this.inOrganization = user.inOrganization;
        })
        .catch((error) => console.log(error));
    },
    handleModalClose(data) {
      this.modalLastAndFirstVisible = data.show;
      this.firstname = data.firstname;
      this.lastname = data.lastname;
    },
    handleModalCloseInfo(data) {
      this.modalChangeInfo = data.show;
      this.email = data.email;
      this.phone = data.phone;
      this.address = data.address;
    },
    handleModalCloseOrg(data) {
      this.modalChangeOrg = data.show;
      this.orgName = data.orgName;
      this.orgAddress = data.orgAddress;
      this.orgINN = data.orgINN;
    },

    // Получение заказов
    getOrder() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("https://cepheus-serves-spring-production.up.railway.app/order", {
          headers,
        })
        .then((response) => {
          const data = response.data;
          data.forEach((element) => {
            if (element.statuses == "PENDING") {
              this.orderPending.push(element);
            } else if (element.statuses == "DONE") {
              this.orderDone.push(element);
            } else {
              this.orderRejected.push(element);
            }
          });
        })
        .catch((error) => console.log(error));
    },
    openModal(status) {
      console.log(status);
      if (status == "PENDING") {
        this.orders = this.orderPending;
        console.log(this.orders);
      } else if (status == "DONE") {
        this.orders = this.orderDone;
      } else {
        this.orders = this.orderRejected;
      }
      this.show = true;
    },
  },
};
</script>

<style scoped>
.user-container {
  display: flex;
  margin-bottom: 40px;
}

/* Стили пользователя */
.user {
  display: grid;
  margin: 0 auto;
  margin-top: 50px;
  /* margin-bottom: 40px; */
}

.user-data {
  display: grid;
  justify-items: center;
}

.user-image > img {
  max-width: 200px;
  max-height: 200px;
  /* border-radius: 50%; */
  margin-bottom: 13px;
}

.name {
  font-weight: 700;
  text-align: center;
  font-size: 23px;
  margin-bottom: 11px;
}

/* Стили заказов */

.orders {
  width: 211px;
  height: 76px;
  border: 1px solid black;
  margin: 0 21.5px;
  border-radius: 10px;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
}

.user-orders {
  display: flex;
  margin: 27px 0 37px 0;
}

.order-number {
  font-size: 23px;
  font-weight: 400;
}

.order-text {
  font-size: 23px;
  font-weight: 400;
}

/* Стили для блока с контактами */
.title-contact {
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 38px;
}

.contant-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 28px;
}

.contact-label {
  font-size: 18px;
  font-weight: 500;
}

.contact {
  font-size: 16px;
  font-weight: 400;
}

svg {
  width: 20px;
  height: 20px;
}

.svg-container {
  background-color: rgb(232, 237, 245);
  border-radius: 12px;
  width: 40px;
  height: 40px;
  display: grid;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  transition: background-color 0.2s cubic-bezier(0.6, -0.28, 0.74, 0.05);
  cursor: pointer;
}

.svg-container:hover {
  background-color: rgba(13, 127, 242, 0.5);
}

.contact-container-data {
  display: flex;
}

@media screen and (max-width: 768px) {
  .user-contact {
    padding: 15px;
  }
}

@media screen and (max-width: 425px) {
  .user-orders {
    flex-wrap: wrap;
    justify-content: center;
  }
  .orders {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
