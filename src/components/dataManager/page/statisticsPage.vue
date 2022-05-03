<template>
  <div style="width: 100%;height: 100%">
    <el-form :model="form" ref="pictureForm" label-width="80" :inline="true">
      <el-form-item label="数据源" b prop="form_id">
        <el-select v-model="form.form_id" placeholder="请选择数据源">
          <el-option
            v-for="item in formList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="统计字段" prop="field">
        <el-select v-model="form.field" placeholder="请选择统计字段">
          <el-option
            v-for="item in fieldList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分组字段" prop="group_field">
        <el-select v-model="form.group_field" placeholder="请选择分组字段">
          <el-option
            v-for="item in group_fieldList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据范围" prop="onlyUser">
        <el-select v-model="form.onlyUser" placeholder="请选择数据范围字段">
          <el-option
            v-for="item in onlyUserSelect"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="统计方式" prop="onlyUser">
        <el-select v-model="form.option" placeholder="请选择统计方式">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="统计图类型" prop="pictureType">
        <el-select v-model="form.pictureType" placeholder="请选择统计图类型">
          <el-option
            v-for="item in pictureTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
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
      formList: [],
      fieldList: [],
      group_fieldList: [],
      onlyUserSelect: [
        {label: '统计个人数据', value: true},
        {label: '统计全部数据', value: false}
      ],
      options: [
        {label: '计数', value: 'count'},
        {label: '求和', value: 'sum'},
        {label: '求均值', value: 'avg'}
      ],
      pictureTypeList: [
        {label: '折线图', value: 'line'},
        {label: '柱状图', value: 'bar'},
        {label: '散点图', value: 'scatter'}
      ],
      option: {
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
        series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'line', name: '销量'}] // 配置项
      },
      form: {
        form_id: '',
        field: '',
        group_field: '',
        option: '',
        pictureType: 'bar',
        onlyUser: true
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
      // let option = {
      //   title: {
      //     text: 'ECharts 入门示例',
      //     left: 'center'
      //   },
      //   tooltip: {},
      //   legend: {
      //     orient: 'vertical',
      //     left: 'left',
      //     data: ['销量']
      //   },
      //   xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }, // X轴
      //   yAxis: { type: 'value' }, // Y轴
      //   // eslint-disable-next-line standard/object-curly-even-spacing
      //   series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: this.form.pictureType, name: '销量'}] // 配置项
      // }
      let option = this.option
      // 4.传入数据
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.el-form{
  width: 80%;
  margin-top: 1%;
}
</style>
