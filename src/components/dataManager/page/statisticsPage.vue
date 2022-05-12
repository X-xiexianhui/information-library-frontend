<template>
  <div style="width: 100%;height: 100%">
    <el-row>
      <el-form :model="form" :rules="rules" ref="pictureForm" label-width="150" :inline="true" size="small">
        <el-col :span="8">
          <el-form-item label="数据源" prop="form_id">
            <el-select v-model="form.form_id" placeholder="请选择数据源">
              <el-option
                v-for="item in formList"
                :key="item.form_id"
                :label="item.form_name"
                :value="item.form_id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统计字段" prop="field">
            <el-select v-model="form.field" placeholder="请选择统计字段">
              <el-option
                v-for="item in fieldList"
                :key="item.col_name"
                :label="item.label_name"
                :value="item.col_name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分组字段" prop="group_field">
            <el-select v-model="form.group_field" placeholder="请选择分组字段">
              <el-option
                v-for="item in group_fieldList"
                :key="item.col_name"
                :label="item.label_name"
                :value="item.col_name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
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
        </el-col>
        <el-col :span="8">
          <el-form-item label="统计方式" prop="option">
            <el-select v-model="form.option" placeholder="请选择统计方式">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
           <span style="margin-right: 0">
              <el-button size="mini" @click="closeEvent">清空条件</el-button>
              <el-button size="mini" type="primary" @click="yes">进行统计</el-button>
          </span>
        </el-col>
      </el-form>
    </el-row>
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import * as Echarts from 'echarts'
import {error} from '../../../api/error'
import {interceptor} from '../../../api/interctor'

export default {
  name: 'statisticsPage',
  data () {
    return {
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
      form: {
        form_id: '',
        field: '',
        group_field: '',
        option: '',
        onlyUser: true
      },
      rules: {
        form_id: [{required: true, message: '请选择数据源', trigger: 'blur'}],
        field: [{required: true, message: '请选择统计字段', trigger: 'blur'}],
        group_field: [{required: true, message: '请选择分组字段', trigger: 'blur'}],
        option: [{required: true, message: '请选择统计方式', trigger: 'blur'}],
        onlyUser: [{required: true, message: '请选择统计范围', trigger: 'blur'}]
      },
      chart: null
    }
  },
  created () {
    this.getForm()
  },
  mounted () {
    this.chart = Echarts.init(this.$refs.chart)
    window.addEventListener('resize', () => {
      this.chart.resize()
    })
  },
  watch: {
    'form.form_id' (newValue) {
      this.getField(newValue)
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    getLabel (list, col_name) {
      for (const listElement of list) {
        // eslint-disable-next-line camelcase
        if (listElement['col_name'] === col_name) {
          return listElement.form_name
        }
      }
    },
    closeEvent () {
      this.$refs.pictureForm.resetFields()
    },
    yes () {
      this.$refs.pictureForm.validate(async valid => {
        if (!valid) return
        try {
          const res = await this.$http.post('api/data/statistics', this.form)
          if (res.data.code !== 200) {
            interceptor(res.data)
          } else {
            this.chart.clear()
            this.chart.setOption({
              title: {
                text: '数据统计结果图',
                left: 'center'
              },
              toolbox: {// 添加一个toolbox配置
                show: true,
                feature: {
                  magicType: {// 配置可以动态切换的类型：
                    type: ['line', 'bar', 'scatter']
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              tooltip: {},
              legend: {
                orient: 'vertical',
                left: 'left',
                data: ['统计结果']
              },
              xAxis: {type: 'category', name: 'x', data: res.data.data.col_name},
              yAxis: {type: 'value', name: 'y'},
              series: [{data: res.data.data.result, type: 'bar', name: '统计结果'}]
            }, true)
          }
        } catch (e) {
          error(e.message)
        }
      })
    },
    async getForm () {
      try {
        const res = await this.$http.get('api/form/list', {params: {tb_name: ''}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.formList = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    },
    // eslint-disable-next-line camelcase
    async getField (form_id) {
      try {
        const res = await this.$http.get('api/form/struct', {params: {form_id: form_id}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.group_fieldList = res.data.data
          this.fieldList = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    }
  }
}
</script>

<style scoped>
.el-form {
  width: 80%;
  margin-top: 2%;
  margin-left: auto;
  margin-right: auto;
}

.chart {
  width: 60%;
  height: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}
</style>
