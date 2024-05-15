<template>
    <div class="card">
      <Chart v-if="chartData" type="bar" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import Chart from "primevue/chart";
  import axios from 'axios';
  
  export default {
    components: {
      Chart,
    },
  
    data() {
      return {
        chartData: null,
        chartOptions: null,
        productLabels: [],
        productSalesData: [],
      };
    },
    async mounted() {
      await this.fetchAndSetProductData();
      this.chartOptions = this.setChartOptions();
    },
    methods: {
      setChartOptions() {
        // Оставьте этот метод без изменений
      },
      async fetchAndSetProductData() {
        try {
          const token = localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await axios.get("http://localhost:8080/products/hot", { headers });
          const products = response.data.content;
  
          this.productLabels = products.map(product => product.title);
          this.productSalesData = products.map(product => product.countSales); // Предполагаем, что countSales хранит количество продаж
  
          this.chartData = this.generateChartData();
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        }
      },
      generateChartData() {
        const randomColor = () => `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`;
  
        return {
          labels: this.productLabels,
          datasets: [
            {
              label: "Продано",
              data: this.productSalesData,
              backgroundColor: this.productLabels.map(randomColor),
              borderColor: this.productLabels.map(randomColor).map(color => color.replace('0.2)', '1)')),
              borderWidth: 1,
            },
          ],
        };
      },
    },
  };
  </script>