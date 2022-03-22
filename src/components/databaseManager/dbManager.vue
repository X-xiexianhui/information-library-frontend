<template>
  <div class="tableBody">
    <vxe-toolbar perfect>
      <template #buttons>
        <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent()">新增</vxe-button>
        <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent()">移除</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      ref="xTable"
      show-header-overflow
      show-overflow
      :align="allAlign"
      :row-config="{isHover: true}"
      :radio-config="{highlight: true}"
      :data="tableData"
      @radio-change="radioChangeEvent">
    >
      <vxe-column type="radio" width="60">
        <template #header>
          <vxe-button type="text" @click="clearRadioRowEvent" :disabled="!row">取消</vxe-button>
        </template>
      </vxe-column>
      <vxe-column type="seq" title="序号" width="60"></vxe-column>
      <vxe-column field="dbName" title="数据库名称"></vxe-column>
      <vxe-column field="tables" title="表数量"></vxe-column>
    </vxe-table>
    <el-dialog :visible.sync="isShow">
      <el-form :model="inputForm" :rules="rules" ref="ruleForm">
          <el-form-item label="数据库名称" prop="Name">
            <el-input v-model="inputForm.Name" placement="数据库名称仅支持英文、下划线和数字"></el-input>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="dispatch">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {error} from '../../api/error'

export default {
  name: 'dbManager',
  data () {
    return {
      allAlign: null,
      tableData: [],
      inputForm: {
        Name: ''
      },
      isShow: false,
      row: [],
      rules: {
        Name: [{required: true, message: '仅支持英文、数字和下划线', trigger: 'blur'}]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      try {
        const res = await this.$http.get('/api/db/all')
        if (res.data.code !== 200) {
          error(res.data.message)
        } else {
          this.tableData = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    },
    insertEvent () {
      this.isShow = true
    },
    async removeEvent (url, config) {
      try {
        const res = await this.$http.delete('/api/db/delete', {params: {dbName: this.row.dbName}})
        if (res.data.code !== 200) {
          error(res.data.message)
        } else {
          this.$message.success('移除成功')
          await this.init()
        }
      } catch (e) {
        error(e.message)
      }
    },
    async onSubmit () {
      try {
        const res = await this.$http.post('/api/db/add', null, {params: {dbName: this.inputForm.Name}})
        this.isShow = false
        if (res.data.code !== 200) {
          error(res.data.message)
        } else {
          this.$message.success('新增成功')
          await this.init()
        }
      } catch (e) {
        error(e.message)
      }
    },
    dispatch () {
      this.isShow = false
    },
    radioChangeEvent () {
      this.row = this.$refs.xTable.getRadioRecord()
    },
    clearRadioRowEvent () {
      this.row = null
      this.$refs.xTable.clearRadioRow()
    }
  }
}
</script>

<style scoped>
  .tableBody{
    width: 60%;
    margin-left: 20%;
  }
</style>
