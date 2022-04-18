<template>
  <div>
    <vxe-grid
      border
      resizable
      ref="formTable"
      :toolbar-config="toolBarConfig"
      :row-config="{isCurrent: true}"
      :columns="tableColumn"
      :data="tableData">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="请输入菜单名称" clearable></vxe-input>
        <vxe-button status="primary" @click="search">搜索</vxe-button>
        <vxe-button status="success" @click="addEvent">新增</vxe-button>
        <vxe-button status="success" @click="editEvent">修改菜单</vxe-button>
        <vxe-button status="success" @click="removeEvent">删除</vxe-button>
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
  name: 'menuList',
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
        const res = await this.$http.get('/api/form/list', {params: {tb_name: val}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
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
    removeEvent () {
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
    editEvent () {
      const selectRecords = this.$refs.formTable.getCurrentRecord()
      console.log(selectRecords)
      const routeData = this.$router.resolve({path: '/form/edit', query: {form_id: selectRecords.form_id}})
      window.open(routeData.href, '_blank')
    },
    addEvent () {
    }
  }
}
</script>

<style scoped>

</style>
