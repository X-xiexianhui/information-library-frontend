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
        <vxe-input v-model="searchName" placeholder="请输入数据表名称" clearable></vxe-input>
        <vxe-button status="primary" @click="getDumpList(searchName)">搜索</vxe-button>
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
import {interceptor} from '../../../api/interctor'
import {MessageBox} from 'element-ui'

export default {
  name: 'dumpData',
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
        {filed: 'file_name', title: '文件名', width: '100'},
        {field: 'dump_time', title: '备份时间', width: '100'}
      ],
      tableData: [],
      currentData: []
    }
  },
  created () {
    this.getDumpList('')
  },
  methods: {
    async getDumpList (value) {
      try {
        const res = await this.$http.get('api/dump/get', {params: {dump_time: value}})
        if ((await res).data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableData = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    },
    async dump () {
      try {
        const res = await this.$http.post('api/data/dump')
        this.MessageBox.alert(res.data, '备份结果', {
          confirmButtonText: '确定',
          callback: () => {
          }
        }).then(() => {})
      } catch (e) {
        error(e.message)
      }
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
