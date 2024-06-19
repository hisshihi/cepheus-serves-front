<template>
  <div class="card">
    <Chart
      v-if="chartData"
      type="bar"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script>
import Chart from "primevue/chart";
import axios from "axios";

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
      return {
        responsive: true,
        scales: {
          x: {
            ticks: {
              display: false, // Отключает подписи на оси X
            },
          },
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      };
    },
    async fetchAndSetProductData() {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(
          "https://cepheus-serves-spring-production.up.railway.app/products/hot",
          {
            headers,
          }
        );
        const products = response.data.content;
        console.log(products);

        this.productLabels = products.map((product) => product.title);
        this.productSalesData = products.map((product) => product.countSales);

        this.chartData = this.generateChartData();
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        this.chartData = null;
      }
    },
    generateChartData() {
      const randomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.2)`;
      };

      const colors = this.productLabels.map(randomColor);
      const borderColors = colors.map((color) => color.replace("0.2)", "1)"));

      return {
        labels: this.productLabels,
        datasets: [
          {
            label: "Продано",
            data: this.productSalesData,
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>
