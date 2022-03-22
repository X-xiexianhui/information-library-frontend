<template>
    <div>
<!--        <editor-header class="nav"></editor-header>-->
        <el-container>
            <el-aside>
            </el-aside>
            <el-main >
                <el-tabs
                    v-model="activeName"
                    tab-position="left"
                    style="margin-top: 20px"
                    :before-leave="checkSave"
                >
                    <el-tab-pane label="字段设置" name="field">
                        <edit-field
                            ref="field"
                            :current-table="Name"
                            :save-event="saveAdd"
                        ></edit-field>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <edit-fk
                            ref="FK"
                            :table-name="Name"
                            :save-event="saveAdd"
                        ></edit-fk>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <edit-index
                            ref="index"
                            :table-name="Name"
                            :save-event="saveAdd"
                        ></edit-index>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
        <el-dialog
            title="请输入表名"
            :visible.sync="dialogVisible"
            width="30%"
        >
            <el-input v-model="Name" placeholder="请输入英文、下划线"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import EditIndex from '../components/editIndex'
import EditField from '../components/editField'
import EditFk from '../components/editFK'
import bus from '../../../common/bus'
import {saveAdd} from '../../../api/tableManager/tableManager'
export default {
  name: 'AddTable',
  components: {
    EditIndex,
    EditFk,
    EditField
  },
  data () {
    return {
      dialogVisible: false,
      isSave: true,
      activeName: 'field',
      Name: '',
      data: [{
        id: '2',
        label: '一级'
      },
      {
        id: '3',
        label: '二级'
      },
      {
        id: '4',
        label: '三级'
      }]
    }
  },
  created () {
    bus.$on('checkDataEvent', (value) => {
      this.isSave = value
    })
    bus.$on('setTableNameEvent', (value) => {
      this.Name = value
    })
    bus.$on('showDialogEvent', (value) => {
      this.dialogVisible = value
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
    }
  }
}
</script>
<style scoped>
</style>
