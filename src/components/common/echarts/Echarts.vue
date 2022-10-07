<template>
  <div ref="echarts"></div>
</template>

<script type="text/ecmascript-6">
import * as echarts from "echarts";

export default {
  props: {
    judge: {
      type: Boolean,
      default: true,
    },
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      axisOption: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
        ],
        series: [],
      },
      normalOption: {
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      echart: null,
    };
  },
  computed: {
    options() {
      return this.judge ? this.axisOption : this.normalOption;
    },
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echarts);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.judge) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        console.log(this.chartData.series);
        this.normalOption.series[0].data = this.chartData.series;
      }
    },
  },
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
};
</script>

<style lang="less" scoped>
</style>