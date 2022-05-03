<template>
  <vxe-grid
    border
    resizable
    ref="dumpTable"
    :toolbar-config="toolBarConfig"
    :row-config="{isCurrent: true}"
    :columns="tableColumn"
    :data="currentData"
    class="dataList">
    <template #toolbar_buttons>
      <div style="text-align: right">
        <vxe-button status="success" @click="dump">备份数据</vxe-button>
        <vxe-button status="success" @click="rollBack">还原数据</vxe-button>
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
</template>

<script>
import {error} from '../../../api/error'

export default {
  name: 'dumpData',
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
      tableColumn: [
        {filed: 'file_name', title: '文件名', width: '100'},
        {field: 'dump_time', title: '备份时间', width: '100'}
      ],
      tableData: [],
      currentData: []
    }
  },
  created () {
    this.getDumpList()
  },
  methods: {
    getDumpList () {
    },
    dump () {
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    },
    rollBack () {
      const selectRecords = this.$refs.dumpTable.getCurrentRecord()
      if (!selectRecords) {
        return error('请先选择需要修改的数据')
      }
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
