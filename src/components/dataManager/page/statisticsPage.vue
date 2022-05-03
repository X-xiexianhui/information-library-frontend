<template>
  <div style="width: 100%;height: 100%">
    <div style="width: 60%; height: 60%;margin: auto" ref="chart"></div>
  </div>
</template>

<script>
import * as Echarts from 'echarts'

export default {
  name: 'statisticsPage',
  data () {
    return {
      chart: null,
      form: {
        form_id: Number,
        field: '',
        group_field: '',
        option: '',
        pictureType: 'bar',
        onlyUser: Boolean
      }
    }
  },
  mounted () {
    this.init()
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
  },
  methods: {
    init () {
      // 2.初始化
      this.chart = Echarts.init(this.$refs.chart)
      // 3.配置数据
      let option = {
        title: {
          text: 'ECharts 入门示例',
          left: 'center'
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['销量']
        },
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, // X轴
        yAxis: { type: 'value' }, // Y轴
        // eslint-disable-next-line standard/object-curly-even-spacing
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: this.form.pictureType, name: '销量'}] // 配置项
      }
      // 4.传入数据
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
