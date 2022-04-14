<template>
  <div>

    <vxe-grid
      border
      resizable
      height="530"
      :row-config="{isCurrent: true}"
      :seq-config="{startIndex: (tablePage.currentPage - 1) * tablePage.pageSize}"
      :columns="tableColumn"
      :data="tableData">
      <template #pager>
        <vxe-pager
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          :current-page.sync="tablePage.currentPage"
          :page-size.sync="tablePage.pageSize"
          :total="tablePage.total"
          @page-change="handlePageChange">
        </vxe-pager>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  name: 'formList',
  data () {
    return {
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        { field: 'db_name', title: '所属数据库' },
        { field: 'tb_name', title: '数据表' },
        { field: 'form_name', title: '表单名称' }
      ],
      tableData: []
    }
  },
  methods: {
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
    }
  }
}
</script>

<style scoped>

</style>
