<template>
  <vxe-grid
    border
    resizable
    ref="formStruct"
    height="530"
    :edit-rules="validRules"
    :edit-config="{trigger: 'click', mode: 'cell',showStatus: true}"
    :row-config="{isCurrent: true}"
    :columns="tableColumn"
    :data="tableData">
    <template #form_lable_edit="{ row }">
      {{row.col_name}}
    </template>
    <template #form_lable_edit="{ row }">
      <vxe-input v-model="row.form_label" type="text"></vxe-input>
    </template>
    <template #toolbar_buttons>
      <vxe-input v-model="searchName" placeholder="请输入数据表名称"></vxe-input>
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
export default {
  name: 'editForm',
  data () {
    return {
      searchName: '',
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {field: 'col_name', title: '数据表字段', editRender: {}, slots: { edit: 'col_name_edit' }},
        {field: 'form_label', title: '字段标签', editRender: {}, slots: { edit: 'form_label_edit' }}
      ],
      tableData: [],
      validRules: {
        form_label: [
          {required: true, message: '字段标签必填'}
        ]
      }
    }
  },
  methods: {
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
    },
    async query (val) {
      console.log(val)
    },
    async save () {
      const ref = this.$refs.formStruct
      const { insertRecords, removeRecords, updateRecords } = ref.getRecordset()
      insertRecords.reverse()
      removeRecords.reverse()
      console.log(updateRecords)
    }
  }
}
</script>

<style scoped>

</style>
