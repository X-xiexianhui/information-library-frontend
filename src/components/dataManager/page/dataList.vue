<template>
<div>
  <vxe-grid
    border
    resizable
    ref="dataTable"
    :toolbar-config="toolBarConfig"
    :row-config="{isCurrent: true}"
    :columns="tableColumn"
    :data="currentData"
    class="dataList">
      <template #toolbar_buttons >
        <div style="text-align: left">
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
</div>
</template>

<script>
import bus from '../../../common/bus'
import {error} from '../../../api/error'
import axios from 'axios'
import {interceptor} from '../../../api/interctor'

export default {
  name: 'dataList',
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [],
      tableData: [],
      currentData: []
    }
  },
  created () {
    this.getTableColumn(this.$route.query.form_id)
    bus.$on('refreshData', (value) => {
      this.tableData = value
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
    // eslint-disable-next-line camelcase
    async getTableColumn (form_id) {
      // eslint-disable-next-line camelcase
      if (form_id === -1 || form_id === undefined) return
      try {
        const res = await this.$http.get('api/data/column', {params: {form_id: form_id}})
        console.log(res.data.data)
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableColumn = res.data.data.reverse()
          this.tableColumn.push({filed: 'filed', title: '附件', value: ''})
          await this.getTableData(form_id)
        }
      } catch (e) {
        error(e.message)
      }
    },
    // eslint-disable-next-line camelcase
    async getTableData (form_id) {
      try {
        const res = await this.$http.get('api/data/get', {params: {form_id: form_id}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableData = res.data.data.reverse()
          this.page()
        }
      } catch (e) {
        error(e.message)
      }
    },
    addEvent () {
      const value = {
        role_id: -1,
        role_name: '',
        role_description: ''
      }
      bus.$emit('showEditForm', value)
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
          const res = await axios.post('/api/data/delete', {
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
      const selectRecords = this.$refs.dataTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
      bus.$emit('showEditForm', selectRecords)
    },
    page () {
      const pageSize = this.tablePage.pageSize
      this.currentData = this.tableData.slice(0, pageSize)
    }
  }
}
</script>

<style scoped>
.dataList{
  width: 80%;
  margin: auto;
}
</style>
