<script>
import axios from "axios";
export default {
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
    }
  },
  methods: {
    getReviews() {
      axios.get("http://localhost:8080/reviews")
          .then(response => {
            this.reviews = response.data;
            this.allReviews = this.reviews.length

            let sum = 0;
            let count5 = 0
            let count4 = 0
            let count3 = 0
            let count2 = 0
            let count1 = 0


            for (let i = 0; i < this.allReviews; i++) {
              sum += this.reviews[i].rating;
              if (this.reviews[i].rating == 5) count5++
              if (this.reviews[i].rating == 4) count4++
              if (this.reviews[i].rating == 3) count3++
              if (this.reviews[i].rating == 2) count2++
              if (this.reviews[i].rating == 1) count1++
            }

            this.rating = sum/this.allReviews;

            this.percentageCount5 = count5/this.allReviews * 100
            this.percentageCount4 = count4/this.allReviews * 100
            this.percentageCount3 = count3/this.allReviews * 100
            this.percentageCount2 = count2/this.allReviews * 100
            this.percentageCount1 = count1/this.allReviews * 100



          })
          .catch(error => console.log(error))
    },

  },
  mounted() {
    this.getReviews()
  }
}


</script>

<template>
  <div>
    <div class="evaluations">
      <div class="evaluation-numbers">
        <h1 class="evaluation">{{rating}}</h1>
        <div class="star-ratings">
          <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.44 -1.44 50.82 50.82" xml:space="preserve"
               fill="#26A8F2" stroke="#26A8F2" stroke-width="2.8764"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path
                                               d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g>
          </svg>
          <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.44 -1.44 50.82 50.82" xml:space="preserve"
               fill="#26A8F2" stroke="#26A8F2" stroke-width="2.8764"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path
                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g>
          </svg>
          <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.44 -1.44 50.82 50.82" xml:space="preserve"
               fill="#26A8F2" stroke="#26A8F2" stroke-width="2.8764"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path
                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g>
          </svg>
          <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.44 -1.44 50.82 50.82" xml:space="preserve"
               fill="#26A8F2" stroke="#26A8F2" stroke-width="2.8764"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path
                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g>
          </svg>
          <svg height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-1.44 -1.44 50.82 50.82" xml:space="preserve"
               fill="#26A8F2" stroke="#26A8F2" stroke-width="2.8764"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <path
                d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path> </g>
          </svg>
        </div>
        <template v-if="this.allReviews < 5">
          <p class="numbers">{{this.allReviews}} отзыва</p>
        </template>
        <template v-else>
          <p class="numbers">{{this.allReviews}} отзывов</p>
        </template>
      </div>
      <div class="evaluation-lines">
        <div class="line">
          <div class="line-numbers">5</div>
          <div class="filled-in"></div>
          <div class="empty" :style="{width: percentageCount5 + '%'}"></div>
          <div class="line-percent">{{percentageCount5}}%</div>
        </div>
        <div class="line">
          <div class="line-numbers">4</div>
          <div class="filled-in"></div>
          <div class="empty" :style="{width: percentageCount4 + '%'}"></div>
          <div class="line-percent">{{percentageCount4}}%</div>
        </div>
        <div class="line">
          <div class="line-numbers">3</div>
          <div class="filled-in"></div>
          <div class="empty"></div>
          <div class="line-percent">50%</div>
        </div>
        <div class="line">
          <div class="line-numbers">2</div>
          <div class="filled-in"></div>
          <div class="empty"></div>
          <div class="line-percent">50%</div>
        </div>
        <div class="line">
          <div class="line-numbers">1</div>
          <div class="filled-in"></div>
          <div class="empty"></div>
          <div class="line-percent">50%</div>
        </div>
      </div>
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
  fill: #FFFFFF !important;
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

.filled-in {
  width: 340px;
  height: 8px;
  background-color: #D1DBE8;
  border-radius: 12px;
  margin: 0 10px;
}

.empty {
  height: 8px;
  background-color: #1A80E5;
  border-radius: 12px;
  position: absolute;
  margin-left: 20px;
}
</style>