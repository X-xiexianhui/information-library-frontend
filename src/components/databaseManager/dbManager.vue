<template>
  <div>
    <vxe-toolbar perfect>
      <template #buttons>
        <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editIndexTable)">新增</vxe-button>
        <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editIndexTable)">移除</vxe-button>
        <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent($refs.editIndexTable)">保存</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      show-header-overflow
      show-overflow
      :align="allAlign"
      :row-config="{isHover: true}"
      :data="tableData">
      <vxe-column type="seq" title="序号" width="60"></vxe-column>
      <vxe-column field="dbName" title="数据库名称"></vxe-column>
      <vxe-column field="tables" title="表数量"></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'dbManager',
  data () {
    return {
      allAlign: null,
      tableData: []
    }
  }
}
</script>

<style scoped>

</style>
