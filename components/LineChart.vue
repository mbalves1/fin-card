<template>
  <Line :data="chartData" :options="chartOptions" class="doughnut" />  
</template>
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'App',
  components: {
    Line
},
  props: {
    chartData: {
      type: Object
    },
    chartOptions: {
      type: Object
    },
  },
}
</script>
<style>
.doughnut {
  height: 140px;
}
</style>