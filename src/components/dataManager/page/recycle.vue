<template>
  <div>
    <el-row>
      <el-form :model="queryForm" ref="queryForm" label-width="80px" size="small">
        <el-col :span="8" v-for="(item,index) in tableColumn.slice(0,len)" :key="index">
          <el-form-item
            :prop="item.field"
            :label="item.title">
            <el-input v-model="queryForm[item.field]" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <vxe-grid
      border
      resizable
      ref="recycleTable"
      :toolbar-config="toolBarConfig"
      :row-config="{isCurrent: true}"
      :columns="tableColumn"
      :data="currentData"
      class="dataList">
      <template #toolbar_buttons>
        <div style="text-align: right">
          <vxe-select v-model="form_id" clearable transfer>
            <vxe-option v-for="item in formList"
                        :key="item.value"
                        :value="item.value"
                        :label="item.label">
            </vxe-option>
          </vxe-select>
          <span style="margin-right: 20px">
            <vxe-button status="primary" @click="queryRecycleData(form_id)">查询</vxe-button>
            <vxe-button @click="resetForm">重置</vxe-button>
            <el-button v-if="!showMore" type="text" @click="showMoreFunc"><i
              class="el-icon-arrow-down"></i>展开</el-button>
            <el-button v-else type="text" @click="showMoreFunc"><i class="el-icon-arrow-up"></i>收起</el-button>
          </span>
          <vxe-button status="success" @click="clear">彻底删除</vxe-button>
          <vxe-button status="success" @click="clearAll">全部清空</vxe-button>
          <vxe-button status="success" @click="recover">恢复数据</vxe-button>
          <vxe-button status="success" @click="recoverAll">全部恢复</vxe-button>
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
  </div>
</template>

<script>
import {interceptor} from '../../../api/interctor'
import {error} from '../../../api/error'

export default {
  name: 'recycle',
  data () {
    return {
      form_id: '',
      len: 3,
      showMore: false,
      formList: [],
      toolBarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      is_add: true,
      tablePage: {
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [],
      tableData: [],
      copyData: [],
      currentData: [],
      queryForm: {}
    }
  },
  created () {
    this.getFormList()
  },
  watch: {
    form_id (newValue) {
      this.getTableColumn(newValue)
    }
  },
  methods: {
    async getFormList () {
      try {
        const res = await this.$http.get('/api/menu/form')
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.formList = res.data.data
        }
      } catch (e) {
        error(e)
      }
    },
    showMoreFunc () {
      this.showMore = !this.showMore
      if (this.showMore) {
        this.len = this.tableColumn.length
      } else {
        this.len = 3
      }
    },
    // eslint-disable-next-line camelcase
    async getTableColumn (form_id) {
      // eslint-disable-next-line camelcase
      if (form_id === -1 || form_id === undefined) return
      try {
        const res = await this.$http.get('api/data/column', {params: {form_id: form_id}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableColumn = res.data.data
          this.tableColumn.push({field: 'file', title: '附件', value: ''})
          await this.queryRecycleData(form_id)
        }
      } catch (e) {
        error(e.message)
      }
    },
    // eslint-disable-next-line camelcase
    async queryRecycleData (form_id) {
      try {
        const res = await this.$http.post('api/recycle/query', {form_id: form_id, columns: this.getQueryList()})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.tableData = res.data.data
          this.page()
        }
      } catch (e) {
        error(e.message)
      }
    },
    handlePageChange ({currentPage, pageSize}) {
      this.tablePage.currentPage = currentPage
      this.tablePage.pageSize = pageSize
      this.currentData = this.tableData.slice((currentPage - 1) * pageSize, pageSize * currentPage)
    },
    page () {
      const pageSize = this.tablePage.pageSize
      this.currentData = this.tableData.slice(0, pageSize)
    },
    getQueryList () {
      let res = []
      const keys = Object.keys(this.queryForm)
      for (const key of keys) {
        if (this.queryForm[key] !== '' && this.queryForm[key] !== null && this.queryForm[key] !== undefined) {
          res.push({col_name: key, value: this.queryForm[key]})
        }
      }
      return res
    },
    resetForm () {
      this.$refs.queryForm.resetFields()
      this.$message.success('查询表单已重置')
    },
    async clear () {
      try {
        const select = this.$refs.recycleTable.getCurrentRecord()
        const res = await this.$http.post('api/recycle/delete', {}, {params: {id: select.id}})
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          await this.queryRecycleData(this.form_id)
        }
      } catch (e) {
        error(e.message)
      }
    },
    async clearAll () {
      try {
        const res = await this.$http.post('api/recycle/clear')
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          await this.queryRecycleData(this.form_id)
        }
      } catch (e) {
        error(e.message)
      }
    },
    formatData (tableData) {
      for (let tableDatum of tableData) {
        const data = JSON.parse(JSON.stringify(tableDatum['data']))
        delete tableDatum.data()
        tableDatum = Object.assign(tableData, data)
      }
    }
  }
}
</script>

<style scoped>

</style>
