<template>
  <div class="list-body">
    <el-form :model="queryForm" :inline="true" ref="queryForm"  style="width: 75%;text-align: center">
      <el-form-item v-for="(item,index) in tableColumn.slice(0,len)"
                    :prop="item.field"
                    :label="item.title"
                    :key="index">
        <el-input v-model="queryForm[item.field]" clearable></el-input>
      </el-form-item>
    </el-form>
    <vxe-grid
      border
      resizable
      ref="dataTable"
      :toolbar-config="toolBarConfig"
      :row-config="{isCurrent: true}"
      :columns="tableColumn"
      :data="currentData"
      class="dataList">
      <template #toolbar_buttons>
        <div style="text-align: right">
          <span style="margin-right: 20px">
            <vxe-button status="primary" @click="getTableData($route.query.form_id)">查询</vxe-button>
            <vxe-button @click="resetForm">重置</vxe-button>
            <el-button v-if="!showMore" type="text" @click="showMoreFunc"><i class="el-icon-arrow-down"></i>展开</el-button>
            <el-button v-else type="text" @click="showMoreFunc"><i class="el-icon-arrow-up"></i>收起</el-button>
          </span>
          <vxe-button status="success" @click="addEvent">新增</vxe-button>
          <vxe-button status="success" @click="editEvent">修改</vxe-button>
          <vxe-button status="success" @click="removeEvent">删除</vxe-button>
          <vxe-button @click="$refs.dataTable.exportData()">导出</vxe-button>
        </div>
      </template>
      <template #pager>
        <vxe-pager
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          :current-page.sync="tablePage.currentPage"
          :page-size.sync="tablePage.pageSize"
          :total="tableData.length"
          @page-change="handlePageChange">
        </vxe-pager>
      </template>
    </vxe-grid>
    <data-form
      :is_add="is_add"
      :form_id="Number($route.query.form_id)"
    ></data-form>
  </div>
</template>

<script>
import bus from '../../../common/bus'
import {error} from '../../../api/error'
import axios from 'axios'
import {interceptor} from '../../../api/interctor'
import DataForm from '../components/dataForm'

export default {
  name: 'dataList',
  components: {DataForm},
  data () {
    return {
      len: 3,
      showMore: false,
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      is_add: true,
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [],
      tableData: [],
      currentData: [],
      queryForm: {}
    }
  },
  created () {
    this.getTableColumn(this.$route.query.form_id)
    bus.$on('refreshTable', () => {
      this.getTableData(this.$route.query.form_id)
    })
  },
  watch: {
    '$route.query.form_id': {
      handler (newValue) {
        this.getTableColumn(newValue)
      }
    }
  },
  methods: {
    showMoreFunc () {
      this.showMore = !this.showMore
      if (this.showMore) {
        this.len = this.tableColumn.length
      } else {
        this.len = 3
      }
    },
    // eslint-disable-next-line camelcase
    async getTableColumn (form_id) {
      // eslint-disable-next-line camelcase
      if (form_id === -1 || form_id === undefined) return
      try {
        const res = await this.$http.get('api/data/column', {params: {form_id: form_id}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableColumn = res.data.data.reverse()
          this.tableColumn.push({field: 'file', title: '附件', value: '无附件'})
          await this.getTableData(form_id)
        }
      } catch (e) {
        error(e.message)
      }
    },
    // eslint-disable-next-line camelcase
    async getTableData (form_id) {
      try {
        const res = await this.$http.post('api/data/query', {form_id: form_id, columns: this.getQueryList()})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableData = res.data.data
          this.page()
        }
      } catch (e) {
        error(e.message)
      }
    },
    addEvent () {
      this.is_add = true
      let res = []
      for (const column of this.tableColumn) {
        res.push(JSON.parse(JSON.stringify(column)))
      }
      bus.$emit('showDataForm', res, -1)
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    },
    removeEvent () {
      const selectRecords = this.$refs.dataTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要删除的数据')
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const selectRecords = this.$refs.dataTable.getCurrentRecord()
          const res = await axios.post('api/data/delete', {
            record_id: selectRecords.record_id,
            form_id: this.$route.query.form_id
          })
          if (res.data.code !== 200) {
            interceptor(res.data.msg)
          } else {
            await this.getTableData(this.$route.query.form_id)
            this.page()
          }
        } catch (e) {
          error(e.message)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editEvent () {
      const selectRecords = this.$refs.dataTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
      this.is_add = false
      bus.$emit('showDataForm', this.getEditData(selectRecords), selectRecords.record_id)
    },
    page () {
      const pageSize = this.tablePage.pageSize
      this.currentData = this.tableData.slice(0, pageSize)
    },
    getEditData (selectData) {
      let res = []
      for (const column of this.tableColumn) {
        res.push(JSON.parse(JSON.stringify(column)))
      }
      const keys = Object.keys(selectData)
      for (let i = 0; i < res.length; i++) {
        for (const key of keys) {
          if (res[i].field === key) {
            res[i].value = selectData[key]
          }
        }
      }
      return res
    },
    getQueryList () {
      let res = []
      const keys = Object.keys(this.queryForm)
      for (const key of keys) {
        if (this.queryForm[key] !== '' && this.queryForm[key] !== null && this.queryForm[key] !== undefined) {
          res.push({col_name: key, value: this.queryForm[key]})
        }
      }
      return res
    },
    resetForm () {
      this.$refs.queryForm.resetFields()
      this.$message.success('查询表单已重置')
    }
  }
}
</script>

<style scoped>
.dataList {
  width: 80%;
  margin: auto;
}
.list-body{
  margin-top: 2%;
}
</style>
