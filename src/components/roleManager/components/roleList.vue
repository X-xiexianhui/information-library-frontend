<template>
  <div>
    <vxe-grid
      border
      resizable
      ref="menuTable"
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
        <vxe-button @click="$refs.menuTable.exportData()">导出</vxe-button>
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
  name: 'roleList',
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      form_name: '',
      dialogVisible: false,
      form_id: -1,
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'menu_name', title: '菜单名称'},
        {field: 'menu_level', title: '菜单级别'},
        {field: 'father_menu', title: '父菜单'},
        {field: 'context_form', title: '关联表单'}
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
        const res = await this.$http.get('/api/role/query', {params: {role_name: val}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.tableData = res.data.data.reverse()
        }
      } catch (e) {
        error(e)
      }
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
    },
    removeEvent () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const selectRecords = this.$refs.menuTable.getCurrentRecord()
          const res = await axios.post('/api/role/delete', {
            menu_id: selectRecords.menu_id
          })
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.tableData = res.data.data.reverse()
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
      const selectRecords = this.$refs.menuTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
      this.form_id = selectRecords.form_id
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>

</style>
