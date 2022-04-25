<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="form" :model="form" :rules="formRule" label-width="80px">
      <el-form-item label="角色名称" prop="role_name">
        <el-input v-model="form.role_name" placeholder="请输入角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="role_description">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入角色描述"
          v-model="form.role_description">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import {error} from '../../../api/error'
import axios from 'axios'
import bus from '../../../common/bus'
import {getUpdate} from '../../../common/getUpdate'

export default {
  name: 'roleEditForm',
  props: {
    role_data: {
      type: Object,
      default: () => ({
        role_id: -1,
        role_name: '',
        role_description: ''
      })
    }
  },
  created () {
    bus.$on('showEditForm', () => {
      this.dialogVisible = true
    })
    console.log(this.role_data)
  },
  data () {
    return {
      form: JSON.parse(JSON.stringify(this.role_data)),
      dialogVisible: false,
      formRule: {
        role_name: [{required: true, message: '请输入角色名称', trigger: 'blur'}]
      }
    }
  },
  methods: {
    closeEvent () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    async save () {
      await this.$refs.form.validate(async valid => {
        if (!valid) return
        try {
          let res
          if (this.role_data.role_id === -1) {
            res = await axios.post('/api/role/add', this.form)
          } else {
            const data = getUpdate(this.role_data, this.form)
            console.log(data)
            res = await axios.post('/api/role/edit', data)
          }
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            bus.$emit('refreshData', res.data.data.reverse())
            this.closeEvent()
          }
        } catch (e) {
          error(e.message)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
