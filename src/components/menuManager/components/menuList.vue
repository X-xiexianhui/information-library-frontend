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
        <vxe-input v-model="searchName" placeholder="请输入菜单名称" clearable></vxe-input>
        <vxe-button status="primary" @click="search">搜索</vxe-button>
        <vxe-button status="success" @click="addEvent">新增</vxe-button>
        <vxe-button status="success" @click="editEvent">修改菜单</vxe-button>
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
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="closeEvent"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称" prop="menu_name">
          <el-input v-model="form.menu_name" placeholder="请输入菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别" prop="menu_level">
          <el-select v-model="form.menu_level" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
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
      form: {
        menu_name: '',
        menu_level: '',
        father_menu: Number,
        context_form: Number
      },
      options: [
        {label: '一级菜单', value: '一级菜单'},
        {label: '二级菜单', value: '二级菜单'}
      ],
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
        const selectRecords = this.$refs.menuTable.getCurrentRecord()
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
      const selectRecords = this.$refs.menuTable.getCurrentRecord()
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
