<template>
    <div>
<!--        <editor-header class="nav"></editor-header>-->
        <el-container>
            <el-aside>
                <tree-list
                    :data="data"
                    class="tree-list"
                >
                </tree-list>
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
                            :save-event="saveEdit"
                        ></edit-field>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <edit-fk
                            ref="FK"
                            :table-name="Name"
                            :save-event="saveEdit"
                        ></edit-fk>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <edit-index
                            ref="index"
                            :table-name="Name"
                            :save-event="saveEdit"
                        ></edit-index>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import bus from '../../../common/bus'
import EditIndex from '../components/editIndex'
import EditField from '../components/editField'
import EditFk from '../components/editFK'
import TreeList from '../components/treeList'
import {saveEdit} from '../../../api/tableManager/tableManager'

export default {
  name: 'AddTable',
  components: {
    EditIndex,
    EditFk,
    EditField,
    TreeList
  },
  data () {
    return {
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
  },
  methods: {
    saveEdit,
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
