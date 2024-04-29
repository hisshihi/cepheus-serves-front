<template>
  <fieldset class="rating">
    <input
      type="radio"
      id="star5"
      name="rating"
      value="5"
      v-model="userRating"
      @change="emitRating"
    /><label class="full" for="star5" title="Оценка - 5"></label>

    <input
      type="radio"
      id="star4"
      name="rating"
      value="4"
      v-model="userRating"
      @change="emitRating"
    /><label class="full" for="star4" title="Оценка - 4"></label>
    <input
      type="radio"
      id="star3"
      name="rating"
      value="3"
      v-model="userRating"
      @change="emitRating"
    /><label class="full" for="star3" title="Оценка - 3"></label>
    <input
      type="radio"
      id="star2"
      name="rating"
      value="2"
      v-model="userRating"
      @change="emitRating"
    /><label class="full" for="star2" title="Оценка - 2"></label>
    <input
      type="radio"
      id="star1"
      name="rating"
      value="1"
      v-model="userRating"
      @change="emitRating"
    /><label class="full" for="star1" title="Оценка - 1"></label>
  </fieldset>
</template>

<script>
export default {
  data() {
    return {
      userRating: 0,
    };
  },
  methods: {
    emitRating() {
      // Emit an event named "update-rating" with the userRating value
      this.$emit('update-rating', this.userRating);
    },
  },
};
</script>

<style scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

fieldset,
label {
  margin: 0;
  padding: 0;
}

/****** Style Star Rating Widget *****/

.full {
  cursor: pointer;
}

.rating {
  border: none;
  float: left;
  display: flex;
  margin: 0 auto;
  flex-direction: row-reverse;
}

.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 40px;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}

.rating > .half:before {
  content: "\f087";
  position: absolute;
}

.rating > label {
  color: #ddd;
  float: right;
}

/***** CSS Magic to Highlight Stars on Hover *****/

.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label {
  color: #1a80e5;
} /* hover previous stars in list */

.rating > input:checked + label:hover, /* hover current star when changing rating */
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label, /* lighten current selection */
.rating > input:checked ~ label:hover ~ label {
  color: #81b6eb;
}
</style>
