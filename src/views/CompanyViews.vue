<template>
  <div>
    <h1 class="title">О компании</h1>
    <div class="info">
      <div class="info-block">
        Цефей сервис успешно работает в сфере компьютеров и комплектующих
        для ПК. Современный формат онлайн магазина с широким ассортиментом,
        индивидуальным подходом к покупателю и квалифицированными сотрудниками.
        Мы нацелены на отличный результат, мы ценим Ваше время, мы надеемся
        на долгосрочное и взаимовыгодное сотрудничество.Впервые на нашем сайте?
        Рады знакомству! На этой странице Вы узнаете о достижениях
        и возможностях Цефея, особенностях работы и обслуживания, а также
        о наших основных преимуществах.
      </div>
      <div class="contact-block">
        <div class="contact-title">Общие сведения о компании</div>
        <div class="contact-text">
          <div class="title-small">Полное наименование</div>
          <div class="text-info">ООО «Цефей сервис»</div>
        </div>
        <div class="contact-text">
          <div class="title-small">ИНН/КПП</div>
          <div class="text-info">7730234438/773001001</div>
        </div>
        <div class="contact-text">
          <div class="title-small">Юридический адрес</div>
          <div class="text-info">
            640020, г. Курган, Ул. Кирова д.51, офис 110, 1 этаж
          </div>
        </div>
      </div>
    </div>

    <!-- Местоположение -->
    <h1 class="title">Контакты</h1>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d336.512231942568!2d65.34110180354921!3d55.431709880062535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43b7bc4736caa097%3A0x12561b7e44d9d0bd!2z0YPQuy4g0JrQuNGA0L7QstCwLCA1MSwg0JrRg9GA0LPQsNC9LCDQmtGD0YDQs9Cw0L3RgdC60LDRjyDQvtCx0LsuLCA2NDAwMDA!5e0!3m2!1sru!2sru!4v1715803257223!5m2!1sru!2sru" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

    <div class="contact-container">
      <div class="svg-container">
        <img class="image" src="../assets/phone.svg" alt="phone image" />
      </div>
      <p class=""><a href="tel:+7 (3522) 600378">+7 (3522) 600378</a></p>
    </div>

    <div class="contact-container">
      <div class="svg-container">
        <img class="image" src="../assets/email.svg" alt="email image" />
      </div>
      <p class=""><a href="mailto:help@cm45.ru">help@cm45.ru</a></p>
    </div>

    <div class="contact-container">
      <div class="svg-container">
        <svg
          width="30.000000"
          height="30.000000"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <desc>Created with Pixso.</desc>
          <defs>
            <pattern
              id="pattern_4_130"
              patternContentUnits="objectBoundingBox"
              width="1.000000"
              height="1.000000"
            >
              <use
                xlink:href="#image4_13_0"
                transform="matrix(0.01,0,0,0.01,0,0)"
              />
            </pattern>
            <image
              id="image4_13_0"
              width="100.000000"
              height="100.000000"
              xlink:href="data:image/png;base64,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"
            />
          </defs>
          <rect
            id="image 22"
            width="30.000000"
            height="30.000000"
            fill="url(#pattern_4_130)"
            fill-opacity="1.000000"
          />
        </svg>
      </div>
      <p class="time">ПН-ПТ 10-18</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$route.path == "/company") {
      console.log("yes");
    }
  },
};
</script>

<style scoped>
.title {
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 39px;
}

.info {
  /* margin-top: 41px; */
}

.info-block {
  font-size: 17px;
  font-weight: 300;
  max-width: 467px;
  max-height: 271px;
}

.contact-title {
  margin-bottom: 22px;
  font-size: 18px;
}

.text-info {
  font-weight: 300;
  font-size: 16px;
}

.title-small {
  font-weight: 300;
  font-size: 13px;
}

.info {
  display: flex;
  justify-content: space-between;
  /* align-items: baseline; */
}

.contact-block {
  background-color: rgb(38, 169, 243);
  border-radius: 15px;
  padding: 20px;
  display: grid;
  align-items: center;
  max-width: 359px;
}

a,
.time {
  text-decoration: revert !important;
  font-size: 19px;
  font-weight: 400;
  margin-left: 25px;
}

.contact-container {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

/* map */
iframe {
  border-radius: 15px;
  width: 100%;
  margin-bottom: 51px;
}

@media screen and (max-width: 425px) {
  .info {
    flex-wrap: wrap;
  }
  .info-block {
    max-width: 100%;
  }
  .contact-block {
    max-width: 100%;
    margin-top: 20px;
  }
}

@media screen and (max-width: 375px) {
  .contact-block {
    margin-top: 40px;
  }
}

@media screen and (max-width: 320px) {
  .contact-block {
    margin-top: 120px;
  }
}
</style>
