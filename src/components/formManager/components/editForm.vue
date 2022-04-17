<template>
  <vxe-grid
    border
    resizable
    keep-source
    ref="formStruct"
    :toolbar-config="toolBarConfig"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}"
    :row-config="{isCurrent: true}"
    :columns="tableColumn"
    :data="currentData">
    <template #colName_edit="{ row }">
      <p>{{ row.col_name }}</p>
    </template>
    <template #formLabel_edit="{ row }">
      <vxe-input v-model="row.label_name" type="text"></vxe-input>
    </template>
    <template #toolbar_buttons>
      <vxe-input v-model="searchName" placeholder="请输入字段名称"></vxe-input>
      <vxe-button status="primary" @click="query">搜索</vxe-button>
      <vxe-button status="success" @click="save">保存</vxe-button>
      <vxe-button @click="$refs.formStruct.exportData()">导出</vxe-button>
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
import axios from 'axios'
import {error} from '../../../api/error'

export default {
  name: 'editForm',
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
        {field: 'col_name', title: '数据表字段', editRender: {}, slots: {edit: 'colName_edit'}},
        {field: 'label_name', title: '字段标签', editRender: {}, slots: {edit: 'formLabel_edit'}}
      ],
      currentData: [],
      tableData: [],
      update: [],
      validRules: {
        label_name: [
          {required: true, message: '字段标签必填'}
        ]
      }
    }
  },
  created () {
    this.query(this.$route.query.form_id)
  },
  methods: {
    handlePageChange ({currentPage, pageSize}) {
      const ref = this.$refs.formStruct
      const {insertRecords, removeRecords, updateRecords} = ref.getRecordset()
      insertRecords.reverse()
      removeRecords.reverse()
      if (updateRecords.length > 0) {
        this.update.push(...updateRecords)
      }
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    },
    async query (val) {
      try {
        const res = await axios.get('/api/form/struct', {params: {form_id: val}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.tableData = res.data.data.reverse()
          const currentPage = this.tablePage.currentPage
          const pageSize = this.tablePage.pageSize
          this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
        }
      } catch (e) {
        error(e.message)
      }
    },
    async save () {
      const ref = this.$refs.formStruct
      const {insertRecords, removeRecords, updateRecords} = ref.getRecordset()
      insertRecords.reverse()
      removeRecords.reverse()
      if (updateRecords.length > 0) {
        this.update.push(...updateRecords)
      }
      if (this.update.length === 0) {
        return error('请先修改，再保存')
      }
      try {
        const res = await axios.post('/api/form/edit', {update: this.update, form_id: this.$route.query.form_id})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.$message.success('修改成功')
          this.update = []
          this.tableData = res.data.data.reverse()
          const currentPage = this.tablePage.currentPage
          const pageSize = this.tablePage.pageSize
          this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
        }
      } catch (e) {
        error(e)
      }
    }
  }
}
</script>

<style scoped>

</style>
