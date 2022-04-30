<template>
  <div>
    <page-head class="nav"></page-head>
    <el-container>
      <el-main>
        <el-tabs
          v-model="activeName"
          tab-position="left"
          style="margin-top: 20px"
          :before-leave="checkSave"
        >
          <el-tab-pane label="字段设置" name="field">
            <el-card>
              <div v-if="showTbForm">
                <el-form :model="tableForm" ref="tableForm" :rules="rules" :inline="true"
                         style="text-align: left">
                  <el-form-item label="所属数据库" prop="db_name">
                    <el-select v-model="tableForm.db_name" placeholder="请选择所属数据库">
                      <el-option
                        v-for="item in dbSelect"
                        :key="item.db_name"
                        :label="item.db_name"
                        :value="item.db_name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="表名" prop="tb_name">
                    <el-input v-model="tableForm.tb_name" placeholder="仅支持英文、数字和下划线"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-else>
                <el-descriptions title="数据表信息">
                  <el-descriptions-item label="所属数据库">{{ tableForm.db_name }}</el-descriptions-item>
                  <el-descriptions-item label="表名称">{{ tableForm.tb_name }}</el-descriptions-item>
                </el-descriptions>
              </div>
              <edit-field
                ref="field"
                :table-form="tableForm"
                class="field"
              ></edit-field>
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="外键设置" name="FK">
            <edit-fk
              ref="FK"
              :table-form="tableForm"
              :db-list="dbSelect"
              class="field"
            ></edit-fk>
          </el-tab-pane>
          <el-tab-pane label="索引设置" name="index">
            <edit-index
              ref="index"
              :table-form="tableForm"
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
import PageHead from '../../common/head/pageHead'
import {error} from '../../../api/error'

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
        db_name: '',
        tb_name: ''
      },
      rules: {
        db_name: [{required: true, message: '请输入数据库名称', trigger: 'blur'}],
        tb_name: [
          {pattern: /^[0-9a-zA-Z_]+$/, message: '只支持英文、数字和下划线', trigger: 'blur'},
          {required: true, message: '请输入表名', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    bus.$on('checkDataEvent', (value) => {
      this.isSave = value
    })
    bus.$on('setShowTbFormEvent', (value) => {
      this.showTbForm = value
    })
    this.getDbList()
  },
  methods: {
    async getDbList () {
      try {
        const res = await this.$http.get('/api/db/search', {params: {query_name: ''}})
        if (res.data.code !== 200) {
          error(res.data.msg)
        } else {
          this.dbSelect = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    },
    checkSave (activeName, oldActiveName) {
      this.$refs[oldActiveName].checkSave()
      if (!this.isSave) {
        this.$alert('请先保存', {})
      }
      return this.isSave
    }
  }
}
</script>
<style scoped>
.field {
  margin-left: 0;;
  width: 80%;
}

.el-card {
  margin: auto;
}
</style>
