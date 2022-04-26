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
        <vxe-button status="success" @click="editEvent">修改</vxe-button>
        <vxe-button @click="$refs.roleTable.exportData()">导出</vxe-button>
      </template>
      <template #add_default="{row}">
        <span>{{formatAuth(row.addAuth)}}</span>
      </template>
      <template #del_default="{row}">
        <span>{{formatAuth(row.del)}}</span>
      </template>
      <template #search_default="{row}">
        <span>{{formatAuth(row.search)}}</span>
      </template>
      <template #update_default="{row}">
        <span>{{formatAuth(row.editAuth)}}</span>
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
    <auth-edit-form
      :form_data="form_data"
    ></auth-edit-form>
  </div>
</template>

<script>
import {error} from '../../../api/error'
import AuthEditForm from './authEditForm'
import bus from '../../../common/bus'

export default {
  name: 'authList',
  components: {AuthEditForm},
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
        {field: 'form_name', title: '表单名称'},
        {field: 'addAuth', title: '新增权限', slots: {default: 'add_default'}},
        {field: 'del', title: '删除权限', slots: {default: 'del_default'}},
        {field: 'search', title: '查询权限', slots: {default: 'search_default'}},
        {field: 'editAuth', title: '修改权限', slots: {default: 'update_default'}}
      ],
      authList: {
        'w0': '不允许新增',
        'w1': '允许新增',
        'd0': '不允许删除',
        'd1': '仅允许删除所填数据',
        'd2': '允许删除全部数据',
        's0': '不允许查询',
        's1': '仅允许查询所填数据',
        's2': '允许查询全部数据',
        'u0': '不允许修改',
        'u1': '仅允许修改所填数据',
        'u2': '允许修改全部数据'
      },
      tableData: [],
      form_data: {
        role_name: '',
        form_name: '',
        addAuth: '',
        del: '',
        search: '',
        editAuth: ''
      }
    }
  },
  created () {
    this.query('')
    bus.$on('refreshAuthList', (value) => {
      this.tableData = value
    })
  },
  methods: {
    async query (val) {
      try {
        const res = await this.$http.get('api/auth/query', {params: {role_name: val}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.tableData = res.data.data
          this.page()
        }
      } catch (e) {
        error(e)
      }
    },
    formatAuth (value) {
      return this.authList[value]
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    },
    editEvent () {
      const selectRecords = this.$refs.roleTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
      this.form_data = selectRecords
      bus.$emit('showAuthEditForm')
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
