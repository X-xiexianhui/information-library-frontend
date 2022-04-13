<template>
    <div>
        <vxe-toolbar perfect print export>
            <template #buttons>
              <div style="text-align: left">
                <vxe-button icon="fa fa-plus" status="perfect" @click="insertEvent($refs.editFkTable, newLine)">新增</vxe-button>
                <vxe-button icon="fa fa-trash-o" status="perfect" @click="removeEvent($refs.editFkTable)">移除</vxe-button>
                <vxe-button icon="fa fa-save" status="perfect" @click="saveEvent()">保存</vxe-button>
              </div>
            </template>
        </vxe-toolbar>
        <vxe-table
            ref="editFkTable"
            border
            resizable
            keep-source
            show-overflow
            :print-config="{}"
            :export-config="{}"
            :edit-rules="validRules"
            :data="tableData"
            :row-config="{isCurrent: true}"
            :edit-config="{trigger: 'click', mode: 'cell',showStatus: true}"
            size="mini"
        >
            <vxe-column field="fk_column" title="建立外键字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.fk_column }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.fk_column" transfer>
                        <vxe-option v-for="(item, index) in columnList" :key="index" :value="item" :label="item"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="ref_table" title="被参照表" :edit-render="{}">
                <template #default="{ row }">
                    <span>{{ row.ref_table }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.ref_table" transfer>
                        <vxe-option v-for="(item,index) in refTableList" :key="index" :value="item" :label="item"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
            <vxe-column field="ref_column" title="被参照字段" :edit-render="{autofocus: '.vxe-input--inner'}">
                <template #default="{ row }">
                    <span>{{ row.ref_column }}</span>
                </template>
                <template #edit="{ row }">
                    <vxe-select v-model="row.ref_column" transfer>
                        <vxe-option v-for="(item, index) in refColumnList[row.ref_table]" :key="index" :value="item" :label="item"></vxe-option>
                    </vxe-select>
                </template>
            </vxe-column>
        </vxe-table>
    </div>
</template>

<script>

import {checkData, fullValidEvent, insertEvent, removeEvent} from '../../../api/tableManager/tableManager'
import {error} from '../../../api/error'
import axios from 'axios'
import {Message} from 'element-ui'
import bus from '../../../common/bus'

export default {
  name: 'EditFk',
  props: {
    tableForm: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      Save: true,
      newLine: {
        fk_name: '', fk_column: '', ref_table: '', ref_column: ''
      },
      refTableList: [],
      columnList: [],
      refColumnList: {},
      tableData: [],
      validRules: {
        fk: [{required: true, message: '外键字段必填'}],
        table: [{required: true, message: '参照表必填'}],
        field: [{required: true, message: '参照字段必填'}]
      }
    }
  },
  created () {
    bus.$on('getFkColumnEvent', () => {
      this.getFkColumn()
    })
    this.getFkColumn()
    this.getRefInfo()
    this.getFk()
  },
  methods: {
    insertEvent,
    removeEvent,
    async saveEvent () {
      const ref = this.$refs.editFkTable
      const {insertRecords, removeRecords, updateRecords} = ref.getRecordset()
      const Saved = insertRecords.length === 0 && removeRecords.length === 0 && updateRecords.length === 0
      if (Saved) {
        return error('请输入数据')
      }
      if (await fullValidEvent(ref)) {
        return
      }
      let data = {
        db_name: this.tableForm.db_name,
        tb_name: this.tableForm.tb_name,
        insert: insertRecords,
        remove: removeRecords,
        update: updateRecords
      }
      try {
        const res = await axios.post('/api/fk/alter', data)
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          Message.success(res.data.msg)
          ref.reloadData(res.data.data.reverse())
        }
      } catch (e) {
        error(e)
      }
    },
    checkSave () {
      checkData(this.$refs.editFkTable)
    },
    async getFkColumn () {
      if (this.tableForm !== {}) {
        try {
          const res = await axios.get('/api/fk/column', {
            params: {
              db_name: this.tableForm.db_name,
              tb_name: this.tableForm.tb_name
            }
          })
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.columnList = res.data.data.reverse()
          }
        } catch (e) {
          error(e.message)
        }
      }
    },
    async getRefInfo () {
      try {
        const res = await this.$http.get('/api/fk/ref', {params: {
          db_name: this.tableForm.db_name,
          tb_name: this.tableForm.tb_name
        }})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.refTableList = res.data.data.ref_table
          this.refColumnList = res.data.data.ref_column
        }
      } catch (e) {
        error(e.message)
      }
    },
    async getFk () {
      if (this.tableForm !== {}) {
        try {
          const res = await axios.get('/api/fk/get', {
            params: {
              db_name: this.tableForm.db_name,
              tb_name: this.tableForm.tb_name
            }
          })
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            console.log(res.data)
            this.tableData = res.data.data.reverse()
          }
        } catch (e) {
          error(e.message)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
