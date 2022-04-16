<template>
  <div>
    <vxe-grid
      border
      resizable
      ref="formTable"
      height="530"
      :row-config="{isCurrent: true}"
      :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
      :columns="tableColumn"
      :data="tableData">
      <template #toolbar_buttons>
        <vxe-input v-model="searchName" placeholder="请输入数据表名称"></vxe-input>
        <vxe-button status="primary" @click="query">搜索</vxe-button>
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
  </div>
</template>

<script>
import {error} from '../../../api/error'

export default {
  name: 'formList',
  data () {
    return {
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'db_name', title: '所属数据库'},
        {field: 'tb_name', title: '数据表'},
        {field: 'form_name', title: '表单名称'}
      ],
      tableData: []
    }
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
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
    }
  }
}
</script>

<style scoped>

</style>
