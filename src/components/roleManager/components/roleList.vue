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
        <vxe-button status="success" @click="addEvent">新增</vxe-button>
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
    <role-edit-form></role-edit-form>
  </div>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'
import RoleEditForm from './roleEditForm'
import bus from '../../../common/bus'
import {interceptor} from '../../../api/interctor'

export default {
  name: 'roleList',
  components: {RoleEditForm},
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'role_name', title: '角色名称'},
        {field: 'role_description', title: '角色描述'}
      ],
      tableData: []
    }
  },
  created () {
    this.query('')
    bus.$on('refreshData', (value) => {
      this.tableData = value
    })
  },
  methods: {
    addEvent () {
      const value = {
        role_id: -1,
        role_name: '',
        role_description: ''
      }
      bus.$emit('showEditForm', value)
    },
    async query (val) {
      try {
        const res = await this.$http.get('/api/role/query', {params: {role_name: val}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableData = res.data.data
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
      const selectRecords = this.$refs.roleTable.getCurrentRecord()
      if (selectRecords.role_name === '系统管理员') {
        return error('系统管理员不可删除')
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const res = await axios.post('/api/role/delete', {
            role_id: selectRecords.role_id
          })
          if (res.data.code !== 200) {
            interceptor(res.data)
          } else {
            this.tableData = res.data.data
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
      if (selectRecords.role_name === '系统管理员') {
        return error('系统管理员不可修改')
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

</style>
