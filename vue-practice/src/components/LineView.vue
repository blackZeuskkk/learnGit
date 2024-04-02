<script lang="ts">
import * as echarts from 'echarts'

export default {
  name: 'EChartsComponent',
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chartContainer: HTMLElement = this.$refs.echartsContainer as HTMLElement
      const myChart = echarts.init(chartContainer)

      const hexToRgb = (
        hex: string
      ): {
        r: number
        g: number
        b: number
      } | null => {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : null
      }

      let xData = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00']
      const yData = [
        {
          name: '年计划水量',
          data: [10, 5, 3, 18, 12, 14]
        },
        {
          name: '年累计水量',
          data: [6, 12, 17, 8, 17, 19]
        },
        {
          name: '剩余分解水量',
          date: [12, 21, 8, 15, 9, 25]
        }
      ]

      const xAxisFn = (xData: string[]) => {
        return [
          {
            type: 'category',
            boundaryGap: false,
            data: xData,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
              color: '#B8D3F1',
              fontSize: 16
            }
          }
        ]
      }

      const colorList = ['#107FFF', '#49FFA8', '#00ddff']

      const series = yData.map((item, index) => {
        const rgb = hexToRgb(colorList[index])
        const end = rgb && `rgba(${rgb.r},${rgb.g},${rgb.b})`
        return {
          name: item.name,
          data: item.data,
          type: 'line',
          smooth: true,
          showSymbol: false,
          symbolSize: 10,
          emphasis: { focus: 'series' },
          animationDuration: 2500,
          animationEasing: 'cubicInOut',
          lineStyle: {
            width: 2,
            color: colorList[index]
          },
          areaStyle: {
            width: 4,
            opacity: 0.25,
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0.3, color: colorList[index] },
                { offset: 0.6, color: colorList[index] },
                { offset: 1, color: end }
              ],
              global: false
            }
          }
        }
      })

      myChart.setOption({
        series,
        color: ['#107FFF', '#49FFA8', '#00ddff'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          },
          textStyle: {
            color: '#fafafa'
          },
          borderColor: 'transparent',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          extraCssText: 'backdrop-filter: blur(6px);'
        },
        grid: {
          top: '20%',
          left: '2%',
          right: '2.5%',
          bottom: '0%',
          containLabel: true
        },
        legend: {
          show: true,
          right: 0,
          icon: 'roundRect',
          itemHeight: 10,
          itemWidth: 20,
          itemGap: 20,
          textStyle: {
            fontSize: 16
          },
          itemStyle: {
            borderColor: 'transparent',
            borderWidth: 6
          }
        },
        xAxis: xAxisFn(xData),
        yAxis: [
          {
            name: '水量(m³)',
            nameTextStyle: {
              color: '#B8D3F1',
              fontSize: 16
            },
            type: 'value',
            axisLabel: {
              color: '#ffffff',
              fontSize: 16
            },
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: 'rgba(250, 250, 250, 0.2)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
<template>
  <div ref="echartsContainer" style="width: 600px; height: 400px"></div>
</template>
