<template>
    <div>
        <page-head class="nav"></page-head>
        <el-container>
            <el-main >
                <el-tabs
                    v-model="activeName"
                    tab-position="left"
                    style="margin-top: 20px"
                    :before-leave="checkSave"
                >
                    <el-tab-pane label="字段设置" name="field">
                      <el-card >
                        <div v-if="showTbForm">
                          <el-form v-model="tableForm" ref="tableForm" :rules="rules" :inline="true" style="text-align: left">
                            <el-form-item label="所属数据库" prop="dbName">
                              <el-select v-model="tableForm.dbName" placeholder="请选择所属数据库">
                                <el-option
                                  v-for="item in dbSelect"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <el-form-item label="表名" prop="tbName">
                              <el-input v-model="tableForm.tbName" placeholder="仅支持英文、数字和下划线"></el-input>
                            </el-form-item>
                          </el-form>
                        </div>
                        <div v-else>
                          <el-descriptions title="数据表信息">
                            <el-descriptions-item label="所属数据库">{{tableForm.dbName}}</el-descriptions-item>
                            <el-descriptions-item label="表名称">{{tableForm.tbName}}</el-descriptions-item>
                          </el-descriptions>
                        </div>
                        <edit-field
                            ref="field"
                            :table-form="tableForm"
                            :save-event="saveAdd"
                            class="field"
                        ></edit-field>
                      </el-card>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <edit-fk
                            ref="FK"
                            :table-form="tableForm"
                            :save-event="saveAdd"
                            class="field"
                        ></edit-fk>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <edit-index
                            ref="index"
                            :table-form="tableForm"
                            :save-event="saveAdd"
                            class="field"
                        ></edit-index>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import EditIndex from '../components/editIndex'
import EditField from '../components/editField'
import EditFk from '../components/editFK'
import bus from '../../../common/bus'
import {saveAdd} from '../../../api/tableManager/tableManager'
import PageHead from '../../common/head/pageHead'
export default {
  name: 'AddTable',
  components: {
    PageHead,
    EditIndex,
    EditFk,
    EditField
  },
  data () {
    return {
      isSave: true,
      activeName: 'field',
      dbSelect: [],
      showTbForm: true,
      tableForm: {
        dbName: '',
        tbName: ''
      },
      rules: {
        dbName: [{required: true, message: '请输入数据库名称', trigger: 'blur'}],
        tbName: [
          {required: true, message: '请输入表名', trigger: 'blur'},
          {validator: this.checkName, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    bus.$on('checkDataEvent', (value) => {
      this.isSave = value
    })
  },
  methods: {
    saveAdd,
    checkSave (activeName, oldActiveName) {
      this.$refs[oldActiveName].checkSave()
      if (!this.isSave) {
        this.$alert('请先保存', {})
      }
      return this.isSave
    },
    checkName (rule, value, callback) {
      let res = /^[0-9a-zA-Z_]+$/
      if (value === '' || value === undefined || value === null) {
        callback(new Error('请输入表名称'))
      }
      if (!res.test(value)) {
        callback(new Error('只支持英文、数字和下划线'))
      }
    }
  }
}
</script>
<style scoped>
.field{
  margin: auto;
}
.el-card{
  margin: auto;
}
</style>
