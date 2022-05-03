<template>
  <div>
    <el-form></el-form>
    <div style="width: 100%; height: 100%;" ref="chart"></div>
  </div>
</template>

<script>
import * as Echarts from 'echarts'

export default {
  name: 'statisticsPage',
  data () {
    return {
      form: {
        form_id: Number,
        field: '',
        group_field: '',
        option: '',
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
        xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, // X轴
        yAxis: { type: 'value' }, // Y轴
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'bar' }] // 配置项
      }
      // 4.传入数据
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
