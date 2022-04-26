<template>
  <div>
    <vxe-grid
      border
      resizable
      ref="userTable"
      :toolbar-config="toolBarConfig"
      :row-config="{isCurrent: true}"
      :columns="tableColumn"
      :data="currentData">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="请输入角色名称" clearable></vxe-input>
        <vxe-button status="primary" @click="query(searchName)">搜索</vxe-button>
        <vxe-button status="success" @click="addEvent">新增</vxe-button>
        <vxe-button status="success" @click="editEvent">修改</vxe-button>
        <vxe-button status="success" @click="removeEvent">删除</vxe-button>
        <vxe-button @click="$refs.userTable.exportData()">导出</vxe-button>
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
    <user-add-form
    ></user-add-form>
    <user-edit-form
      :user_data="user_data"
    ></user-edit-form>
  </div>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'
import UserEditForm from './userEditForm'
import UserAddForm from './userAddForm'
import bus from '../../../common/bus'

export default {
  name: 'userList',
  components: {UserAddForm, UserEditForm},
  data () {
    return {
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      dialogVisible: false,
      editVisible: false,
      user_data: {},
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'user_id', title: '用户账号'},
        {field: 'user_name', title: '用户名称'},
        {field: 'user_email', title: '用户邮箱'},
        {field: 'user_role', title: '用户角色'}
      ],
      tableData: [],
      currentData: []
    }
  },
  created () {
    this.query('')
    bus.$on('refreshUser', () => {
      this.query('')
    })
  },
  methods: {
    addEvent () {
      bus.$emit('showAddUserForm')
    },
    async query (val) {
      try {
        const res = await this.$http.get('/api/user/get', {params: {user_name: val}})
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
          const selectRecords = this.$refs.userTable.getCurrentRecord()
          const res = await axios.post('/api/user/delete', {
            user_id: selectRecords.user_id
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
      const selectRecords = this.$refs.userTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
      this.user_data = selectRecords
      bus.$emit('showEditUserForm')
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
