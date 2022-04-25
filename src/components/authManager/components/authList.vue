<template>
  <div>
    <vxe-grid
      border
      resizable
      ref="roleTable"
      :toolbar-config="toolBarConfig"
      :row-config="{isCurrent: true}"
      :columns="tableColumn"
      :data="tableData">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="请输入角色名称" clearable></vxe-input>
        <vxe-button status="primary" @click="query(searchName)">搜索</vxe-button>
        <vxe-button status="success" @click="dialogVisible = true">新增</vxe-button>
        <vxe-button status="success" @click="editEvent">修改</vxe-button>
        <vxe-button status="success" @click="removeEvent">删除</vxe-button>
        <vxe-button @click="$refs.roleTable.exportData()">导出</vxe-button>
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
  </div>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'

export default {
  name: 'authList',
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      dialogVisible: false,
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'role_name', title: '角色名称'},
        {field: 'form_name', title: '表单名称'},
        {field: 'add', title: '新增权限'},
        {field: 'del', title: '删除权限'},
        {field: 'search', title: '查询权限'},
        {field: 'edit', title: '修改权限'}
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
        const res = await this.$http.get('/api/auth/query', {params: {role_name: val}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.tableData = res.data.data.reverse()
          this.page()
        }
      } catch (e) {
        error(e)
      }
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    },
    removeEvent () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const selectRecords = this.$refs.roleTable.getCurrentRecord()
          const res = await axios.post('/api/auth/delete', {
            role_id: selectRecords.role_id
          })
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.tableData = res.data.data.reverse()
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
      const selectRecords = this.$refs.roleTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
      this.dialogVisible = true
    },
    page () {
      const currentPage = this.tablePage.currentPage
      const pageSize = this.tablePage.pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    }
  }
}
</script>

<style scoped>

</style>
