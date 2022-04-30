<template>
  <div class="tableBody">
      <el-form :inline="true" v-model="queryForm" style="text-align: right">
        <el-form-item>
          <el-input v-model="queryForm.query" :clearable="true" placeholder="请输入数据库名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onQuery">查询</el-button>
        </el-form-item>
      </el-form>
    <vxe-toolbar perfect>
        <template #buttons>
          <div style="text-align: left">
            <vxe-button size="mini" icon="el-icon-plus" status="success" content="新增" @click="insertEvent()"></vxe-button>
            <vxe-button size="mini" icon="el-icon-delete" status="success" content="删除" @click="removeEvent()"></vxe-button>
            <vxe-button size="mini" content="导出" @click="$refs.xTable.exportData()"></vxe-button>
          </div>
        </template>
    </vxe-toolbar>
    <vxe-table
      border
      ref="xTable"
      :print-config="{}"
      :export-config="{}"
      show-header-overflow
      show-overflow
      :align="allAlign"
      :row-config="{isCurrent: true,isHover: true}"
      :radio-config="{highlight: true}"
      :data="tableData">
      <vxe-column field="db_name" title="数据库名称"></vxe-column>
      <vxe-column field="tables" title="表数量"></vxe-column>
    </vxe-table>
    <el-dialog
      @close="dispatch"
      :close-on-click-modal = "false"
      :visible.sync="isShow">
      <el-form :model="inputForm" :rules="rules" ref="ruleForm">
          <el-form-item label="数据库名称" prop="Name">
            <el-input v-model="inputForm.Name" placeholder="数据库名称仅支持英文、下划线和数字"></el-input>
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
import {interceptor} from '../../api/interctor'

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
        Name: [
          {required: true, message: '请输入数据库名称', trigger: 'blur'},
          {pattern: /^[0-9a-zA-Z_]+$/, message: '只支持英文、数字和下划线', trigger: 'blur'}
        ]
      },
      queryForm: {
        query: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      try {
        const res = await this.$http.get('/api/db/search', {params: {query_name: ''}})
        if (res.data.code !== 200) {
          error(res.data.msg)
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
    async removeEvent () {
      try {
        const selectRecord = this.$refs.xTable.getCurrentRecord()
        const res = await this.$http.delete('/api/db/delete', {params: {db_name: selectRecord.db_name}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.$message.success(res.data.msg)
          await this.init()
        }
      } catch (e) {
        error(e.message)
      }
    },
    async onSubmit () {
      try {
        const res = await this.$http.post('/api/db/add', null, {params: {db_name: this.inputForm.Name}})
        this.isShow = false
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.$message.success(res.data.msg)
          await this.init()
          this.inputForm.Name = ''
        }
      } catch (e) {
        error(e.message)
      }
    },
    async onQuery () {
      try {
        const res = await this.$http.get('/api/db/get', {params: {db_name: this.queryForm.query}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.$message.success(res.data.msg)
          this.tableData = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    },
    dispatch () {
      this.$refs.ruleForm.resetFields()
      this.isShow = false
    }
  }
}
</script>

<style scoped>
  .tableBody{
    width: 100%;
    margin-left: auto;
  }
</style>
