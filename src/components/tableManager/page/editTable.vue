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
                        <edit-field
                            ref="field"
                            :current-table="Name"
                        ></edit-field>
                    </el-tab-pane>
                    <el-tab-pane label="外键设置" name="FK">
                        <edit-fk
                            ref="FK"
                            :table-name="Name"
                        ></edit-fk>
                    </el-tab-pane>
                    <el-tab-pane label="索引设置" name="index">
                        <edit-index
                            ref="index"
                            :table-name="Name"
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
      Name: ''
    }
  },
  created () {
    bus.$on('checkDataEvent', (value) => {
      this.isSave = value
    })
  },
  methods: {
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
