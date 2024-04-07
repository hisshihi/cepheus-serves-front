<script>
import axios from "axios";
import StarRatingComponent from "@/components/StarRatingComponent";
import AddStarRatingComponent from "@/components/AddStarRatingComponent";
import ButtonComponent from "./ButtonComponent.vue";

export default {
  components: {
    StarRatingComponent,
    AddStarRatingComponent,
    ButtonComponent,
  },
  data() {
    return {
      reviews: [],
      progressBar: 5,
      allReviews: null,
      countLines: 5,
      rating: 0,
      percentageCount5: 0,
      percentageCount4: 0,
      percentageCount3: 0,
      percentageCount2: 0,
      percentageCount1: 0,
      userRating: 0,
      userText: "",
      token: null,
      reviewsUserBoolean: false,
      isSendReviews: false,
    };
  },
  methods: {
    getReviews() {
      axios
        .get("http://localhost:8080/reviews")
        .then((response) => {
          this.reviews = response.data;
          this.allReviews = this.reviews.length;

          let sum = 0;
          let count5 = 0;
          let count4 = 0;
          let count3 = 0;
          let count2 = 0;
          let count1 = 0;

          for (let i = 0; i < this.allReviews; i++) {
            sum += this.reviews[i].rating;
            if (this.reviews[i].rating == 5) count5++;
            if (this.reviews[i].rating == 4) count4++;
            if (this.reviews[i].rating == 3) count3++;
            if (this.reviews[i].rating == 2) count2++;
            if (this.reviews[i].rating == 1) count1++;
          }

          this.rating = Number((sum / this.allReviews).toFixed(1));

          this.percentageCount5 = Number(
            ((count5 / this.allReviews) * 100).toFixed(2)
          );
          this.percentageCount4 = Number(
            ((count4 / this.allReviews) * 100).toFixed(2)
          );
          this.percentageCount3 = Number(
            ((count3 / this.allReviews) * 100).toFixed(2)
          );
          this.percentageCount2 = Number(
            ((count2 / this.allReviews) * 100).toFixed(2)
          );
          this.percentageCount1 = Number(
            ((count1 / this.allReviews) * 100).toFixed(2)
          );
        })
        .catch((error) => console.log(error));
    },
    handeRatingChange(newUserRating) {
      this.userRating = newUserRating;
    },
    sendData() {
      this.isSendReviews = true;
      this.reviewsUserBoolean = true;
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(
          "http://localhost:8080/reviews",
          { text: this.userText, rating: this.userRating },
          { headers }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    reviewsExists() {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("http://localhost:8080/reviews/exists", { headers })
        .then((response) => (this.reviewsUserBoolean = response.data))
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getReviews();
    this.token = localStorage.getItem("token");
    this.reviewsExists();
  },
};
</script>

<template>
  <div>
    <div class="evaluations">
      <div class="evaluation-numbers">
        <h1 class="evaluation">{{ rating }}</h1>
        <div class="star-ratings">
          <star-rating-component :rating="rating"></star-rating-component>
        </div>
        <template v-if="this.allReviews < 5">
          <p class="numbers">{{ this.allReviews }} отзыва</p>
        </template>
        <template v-else>
          <p class="numbers">{{ this.allReviews }} отзывов</p>
        </template>
      </div>
      <div class="evaluation-lines">
        <div class="line">
          <div class="line-numbers">5</div>
          <!-- <div class="filled-in"></div>
          <div class="empty" :style="{width: percentageCount5 + '%'}"></div> -->
          <div class="progress">
            <div
              class="progress-value"
              :style="{ width: percentageCount5 + '%' }"
            ></div>
          </div>
          <div class="line-percent">{{ percentageCount5 }}%</div>
        </div>
        <div class="line">
          <div class="line-numbers">4</div>
          <div class="progress">
            <div
              class="progress-value"
              :style="{ width: percentageCount4 + '%' }"
            ></div>
          </div>
          <div class="line-percent">{{ percentageCount4 }}%</div>
        </div>
        <div class="line">
          <div class="line-numbers">3</div>
          <div class="progress">
            <div
              class="progress-value"
              :style="{ width: percentageCount3 + '%' }"
            ></div>
          </div>
          <div class="line-percent">{{ percentageCount3 }}%</div>
        </div>
        <div class="line">
          <div class="line-numbers">2</div>
          <div class="progress">
            <div
              class="progress-value"
              :style="{ width: percentageCount2 + '%' }"
            ></div>
          </div>
          <div class="line-percent">{{ percentageCount2 }}%</div>
        </div>
        <div class="line">
          <div class="line-numbers">1</div>
          <div class="progress">
            <div
              class="progress-value"
              :style="{ width: percentageCount1 + '%' }"
            ></div>
          </div>
          <div class="line-percent">{{ percentageCount1 }}%</div>
        </div>
      </div>
    </div>
    <!--      Отзывы покупателей-->
    <div class="evaluations-users">
      <div class="users" v-for="review in reviews" :key="review.id">
        <div class="user">
          <div class="name">{{ review.user.firstname }}</div>
          <div class="rating">
            <star-rating-component
              :rating="review.rating"
            ></star-rating-component>
          </div>
          <div class="date">Июль 9, 2023</div>
          <div class="evaluations-text">{{ review.text }}</div>
          <div class="reaction">
            <div class="like">
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.2812 5.25938C16.9252 4.85594 16.4131 4.62489 15.875 4.625H11.5V3.375C11.5 1.64911 10.1009 0.25 8.375 0.25C8.13818 0.24983 7.9216 0.383527 7.81563 0.595312L4.86406 6.5H1.5C0.809644 6.5 0.25 7.05964 0.25 7.75V14.625C0.25 15.3154 0.809644 15.875 1.5 15.875H14.9375C15.8827 15.8753 16.6803 15.1721 16.7984 14.2344L17.7359 6.73438C17.8032 6.20023 17.6375 5.66297 17.2812 5.25938ZM1.5 7.75H4.625V14.625H1.5V7.75ZM16.4953 6.57812L15.5578 14.0781C15.5184 14.3907 15.2526 14.6251 14.9375 14.625H5.875V7.27266L8.74297 1.53594C9.61946 1.71136 10.2502 2.48112 10.25 3.375V5.25C10.25 5.59518 10.5298 5.875 10.875 5.875H15.875C16.0544 5.87494 16.2252 5.95198 16.3439 6.08652C16.4626 6.22106 16.5177 6.40012 16.4953 6.57812Z"
                  fill="#4F7396"
                />
              </svg>
            </div>
            <div class="dislike">
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M17.7359 9.26562L16.7984 1.76562C16.6803 0.827882 15.8827 0.124676 14.9375 0.125H1.5C0.809644 0.125 0.25 0.684644 0.25 1.375V8.25C0.25 8.94036 0.809644 9.5 1.5 9.5H4.86406L7.81563 15.4047C7.9216 15.6165 8.13818 15.7502 8.375 15.75C10.1009 15.75 11.5 14.3509 11.5 12.625V11.375H15.875C16.4132 11.3752 16.9256 11.1441 17.2817 10.7404C17.6378 10.3368 17.8032 9.79964 17.7359 9.26562ZM4.625 8.25H1.5V1.375H4.625V8.25ZM16.3438 9.91328C16.2259 10.0489 16.0547 10.1262 15.875 10.125H10.875C10.5298 10.125 10.25 10.4048 10.25 10.75V12.625C10.2502 13.5189 9.61946 14.2886 8.74297 14.4641L5.875 8.72734V1.375H14.9375C15.2526 1.37489 15.5184 1.60929 15.5578 1.92188L16.4953 9.42188C16.519 9.59995 16.4636 9.77949 16.3438 9.91328Z"
                  fill="#4F7396"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!reviewsUserBoolean">
      <div class="feedback" v-if="token || reviewsUserBoolean">
        <div class="stars">
          <!-- <svg
          height="200px"
          width="200px"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-1.44 -1.44 50.82 50.82"
          xml:space="preserve"
          fill="#FFFFFF"
          stroke="#26A8F2"
          stroke-width="2.8764"
          class="star"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
            ></path>
          </g>
        </svg> -->
          <add-star-rating-component
            @update-rating="handeRatingChange"
          ></add-star-rating-component>
          <div class="rating-form">
            <form action="" method="post">
              <label for="">Оставьте свой отзыв</label>
              <textarea
                v-model="userText"
                type="text"
                name=""
                id=""
                placeholder="Ваши впечатления (минимум 10 символов)"
                required
                minlength="10"
                maxlength="1000"
              ></textarea>
            </form>
          </div>
        </div>
        <div
          class="button-reviews"
          v-if="this.userRating > 0 && this.userText.length > 10"
        >
          <button-component
            @click="sendData"
            :name="'Отправить'"
            :type="button"
          ></button-component>
        </div>
      </div>
    </div>
    <div class="feedback" v-if="isSendReviews">
      <h2>Спасибо за отзыв!</h2>
    </div>
  </div>
</template>

<style scoped>
.evaluations {
  display: flex;
  align-items: center;
}

/*блок с оценками */
.evaluation-numbers {
  margin-right: 23px;
}

svg {
  /*fill: #FFFFFF !important;*/
  width: 18px;
  height: 18px;
  margin-right: 2px;
}

.evaluation {
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 8px;
}

/* Блок с progress bar */
.numbers {
  font-size: 16px;
  font-weight: 400;
}

.line {
  display: flex;
  align-items: center;
  position: relative;
}

.line-percent {
  max-width: 340px;
}

.filled-in {
  width: 340px;
  height: 8px;
  background-color: #d1dbe8;
  border-radius: 12px;
  margin: 0 10px;
}

.empty {
  height: 8px;
  background-color: #1a80e5;
  border-radius: 12px;
  position: absolute;
  margin-left: 20px;
  max-width: 340px;
}

/* Отзывы пользователей */
.evaluations-users {
  background-color: #efeeee;
  padding: 16px;
  border-radius: 10px;
  margin-top: 35px;
  margin-bottom: 23px;
}

.user {
  margin-bottom: 32px;
}

.name {
  font-size: 16px;
  font-weight: 500;
  color: #0d141c;
}

.date {
  color: #4f7396;
  font-weight: 400;
  font-size: 14px;
}

.evaluations-text {
  font-weight: 400;
  font-size: 16px;
}

.like {
  margin-right: 36px;
}

.like,
.dislike {
  cursor: pointer;
}

.reaction {
  display: flex;
  margin-top: 12px;
}

/* Оставить свой отзыв */
.feedback {
  margin: 0 auto;
  text-align: center;
  background-color: #efeeee;
  max-width: 414px;
  border-radius: 15px;

  display: grid;
  align-items: center;

  margin-bottom: 44px;
}

.stars {
  display: grid;
}

.stars > svg {
  margin-top: 6px;
  width: 50px;
  height: 50px;
  margin-right: 21px;
  cursor: pointer;
}

.stars > svg:nth-child(5) {
  margin-right: 0;
}

.feedback-text {
  font-size: 26px;
  font-weight: 400;
  margin-bottom: 12px;
}

.rating {
  display: flex;
}

.progress {
  background: #d1dbe8;
  justify-content: flex-start;
  border-radius: 100px;
  align-items: center;
  position: relative;
  /* padding: 0 5px; */
  margin: 0 5px;
  display: flex;
  height: 10px;
  width: 500px;
}

.progress-value {
  animation: load 3s normal forwards;
  box-shadow: 0 10px 40px -10px #1a80e5;
  border-radius: 100px;
  background: #1a80e5;
  height: 10px;
  width: 0;
}

.star-ratings {
  display: flex;
}

/* @keyframes load {
  0% { width: 0; }
  100% { width: 0; }
} */

/* Стили для формы */
form {
  margin-top: 10px;
}
textarea {
  resize: vertical;
  max-width: 400px;
  min-width: 350px;
  min-height: 100px;
  margin: 0 auto;
  border-radius: 12px;
  border: 1px #6583a2 solid;
  margin-bottom: 10px;
}

textarea::placeholder {
  color: #6583a2;
  font-size: 16px;
}

textarea:focus {
  border-color: #6583a2;
  outline: none;
  color: #6583a2;
}

.button-reviews {
  margin: 10px 27px;
}
</style>
