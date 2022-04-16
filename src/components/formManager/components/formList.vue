<template>
  <div>
    <vxe-grid
      border
      resizable
      ref="formTable"
      height="530"
      :toolbar-config="toolBarConfig"
      :row-config="{isCurrent: true}"
      :columns="tableColumn"
      :data="tableData">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="请输入数据表名称" clearable></vxe-input>
        <vxe-button status="primary" @click="search">搜索</vxe-button>
        <vxe-button status="success" @click="renameEvent">重命名</vxe-button>
        <vxe-button status="success" @click="goToEdit">修改表单</vxe-button>
        <vxe-button @click="$refs.formTable.exportData()">导出</vxe-button>
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
    <el-dialog
      title="请输入表单新名称"
      :visible.sync="dialogVisible"
      :before-close="closeEvent"
    >
      <el-input v-model="form_name" placeholder="请输入表单名称，支持中英文"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'

export default {
  name: 'formList',
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      form_name: '',
      dialogVisible: false,
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'tb_name', title: '数据表'},
        {field: 'form_name', title: '表单名称'}
      ],
      tableData: []
    }
  },
  created () {
    this.query('')
  },
  methods: {
    async query (val) {
      try {
        const res = await this.$http.get('/api/form/list', {params: {tb_name: val}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          console.log(res.data.data)
          this.tableData = res.data.data.reverse()
        }
      } catch (e) {
        error(e)
      }
    },
    search () {
      this.query(this.searchName)
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
    },
    renameEvent () {
      const selectRecords = this.$refs.formTable.getCurrentRecord()
      console.log(selectRecords)
      if (!selectRecords) {
        return error('请先选择需要重命名的表单')
      }
      this.dialogVisible = true
    },
    closeEvent () {
      this.dialogVisible = false
      this.form_name = ''
    },
    async save () {
      if (this.new_name === '') {
        return error('请输入表单名称')
      }
      try {
        const selectRecords = this.$refs.formTable.getCurrentRecord()
        const res = await axios.post('/api/form/rename', {
          old_name: selectRecords.form_name,
          new_name: this.form_name,
          form_id: selectRecords.form_id
        })
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.tableData = res.data.data.reverse()
          this.closeEvent()
        }
      } catch (e) {
        error(e.message)
      }
    },
    goToEdit () {
      const selectRecords = this.$refs.formTable.getCurrentRecord()
      console.log(selectRecords)
      const routeData = this.$router.resolve({path: '/form/edit', query: {form_id: selectRecords.form_id}})
      window.open(routeData.href, '_blank')
    }
  }
}
</script>

<style scoped>
</style>
