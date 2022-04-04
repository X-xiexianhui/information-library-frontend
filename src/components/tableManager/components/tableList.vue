<template>
  <div class="tableBody">
    <el-form :inline="true" v-model="queryForm" style="text-align: right">
      <el-form-item>
        <el-input v-model="queryForm.query" :clearable="true" placeholder="请输入表名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onQuery">查询</el-button>
      </el-form-item>
    </el-form>
    <vxe-toolbar perfect print export>
      <template #buttons>
        <div style="text-align: left">
          <vxe-button icon="el-icon-plus" status="perfect" content="新增表" @click="goToAdd"></vxe-button>
          <vxe-button icon="el-icon-delete" status="perfect" content="删除表" @click="deleteTable()"></vxe-button>
          <vxe-button icon="el-icon-edit" status="perfect" content="重命名" @click="renameTable"></vxe-button>
          <vxe-button icon="el-icon-edit" status="perfect" content="修改表结构" @click="goToEdit"></vxe-button>
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
      :row-config="{isCurrent: true}"
      :data="tableData"
      @current-change="rowChangeEvent"
      >
      <vxe-column field="db_name" title="所属数据库"></vxe-column>
      <vxe-column field="tb_name" title="表名"></vxe-column>
    </vxe-table>
    <el-dialog
      @close="dispatch"
      :close-on-click-modal = "false"
      :visible.sync="isVisible">
      <el-form :model="inputForm" :rules="rules" ref="ruleForm">
        <el-form-item label="表名称" prop="new_name">
          <el-input v-model="inputForm.new_name" placeholder="表名称仅支持英文、下划线和数字"></el-input>
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
import {error} from '../../../api/error'

export default {
  name: 'tableList',
  data () {
    return {
      rules: {
        new_name: [
          {required: true, message: '请输入表名称', trigger: 'blur'},
          {pattern: /^[0-9a-zA-Z_]+$/, message: '只支持英文、数字和下划线', trigger: 'blur'}]
      },
      isVisible: false,
      inputForm: {
        new_name: ''
      },
      allAlign: null,
      tableData: [],
      row: {},
      queryForm: {
        query: ''
      }
    }
  },
  created () {
    this.getTables('')
  },
  methods: {
    goToAdd () {
      window.open('/table/add', '_blank')
    },
    goToEdit () {
      const routeData = this.$router.resolve({path: '/table/edit', query: {tb_id: this.row.tb_id.toString()}})
      window.open(routeData.href, '_blank')
    },
    // 查询数据表
    async getTables (param) {
      try {
        const res = await this.$http.get('/api/tb/search', {params: {query_name: param}})
        console.log(res.data.data)
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.tableData = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    },
    // 删除数据表
    async deleteTable () {
      if (this.row.length === 0) {
        return error('请先选择一行数据')
      }
      try {
        const res = await this.$http.delete('/api/tb/delete', {
          params: {
            db_name: this.row.db_name,
            tb_name: this.row.tb_name
          }
        })
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          await this.getTables()
        }
      } catch (e) {
        error(e.message)
      }
    },
    onQuery () {
      this.getTables(this.queryForm.query)
    },
    renameTable () {
      if (this.row.length === 0) {
        return error('请先选择一行数据')
      }
      this.isVisible = true
    },
    async onSubmit () {
      try {
        const res = await this.$http.post('api/tb/rename', {
          db_name: this.row.db_name,
          tb_name: this.row.tb_name,
          new_name: this.inputForm.new_name
        })
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.$message.success(res.data.msg)
          this.isVisible = false
          await this.getTables('')
        }
      } catch (e) {
        error(e.message)
      }
    },
    rowChangeEvent () {
      this.row = this.$refs.xTable.getCurrentRecord()
    },
    clearRadioRowEvent () {
      this.row = null
      this.$refs.xTable.clearRadioRow()
    },
    dispatch () {
      this.$refs.ruleForm.resetFields()
      this.isVisible = false
    }
  }
}
</script>

<style scoped>
.tableBody {
  width: 100%;
  margin-left: auto;
}
</style>
