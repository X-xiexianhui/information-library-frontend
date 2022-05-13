<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="form" :model="form" :rules="menuRule" label-width="80px" style="width: 50%;margin: auto">
      <el-form-item label="菜单名称" prop="menu_name">
        <el-input v-model="form.menu_name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单级别" prop="menu_level">
        <el-select v-model="form.menu_level" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="父菜单" prop="father_menu">
        <el-select v-model="form.father_menu" placeholder="请选择" :disabled="form.menu_level === '一级菜单'" clearable>
          <el-option
            v-for="item in menuList"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联表单" prop="context_form">
        <el-select v-model="form.context_form" placeholder="请选择" :disabled="form.menu_level === '一级菜单'" clearable>
          <el-option
            v-for="item in formList"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span style="margin: auto">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import {error} from '../../../api/error'
import bus from '../../../common/bus'
import {interceptor} from '../../../api/interctor'
import {getUpdate} from '../../../common/getUpdate'

export default {
  name: 'editMenuForm',
  created () {
    this.getFormSelect()
    this.getMenuSelect()
    bus.$on('showEditMenuForm', (value) => {
      this.form = JSON.parse(JSON.stringify(value))
      this.old = JSON.parse(JSON.stringify(value))
      this.dialogVisible = true
    })
  },
  data () {
    const fatherValid = (rule, value, callback) => {
      if (value !== '' && this.form.menu_level === '一级菜单') {
        return callback(new Error('一级菜单没有父菜单'))
      } else if (value === '' && this.form.menu_level === '二级菜单') {
        return callback(new Error('请选择父菜单'))
      }
      callback()
    }
    const contextValid = (rule, value, callback) => {
      if (value !== '' && this.form.menu_level === '一级菜单') {
        return callback(new Error('一级菜单没有关联表单'))
      } else if (value === '' && this.form.menu_level === '二级菜单') {
        return callback(new Error('请选择关联表单'))
      }
      callback()
    }
    return {
      old: {},
      form: {
        menu_id: -1,
        menu_name: '',
        menu_level: '',
        father_menu: '',
        context_form: ''
      },
      dialogVisible: false,
      options: [
        {label: '一级菜单', value: '一级菜单'},
        {label: '二级菜单', value: '二级菜单'}
      ],
      menuList: [],
      formList: [],
      menuRule: {
        menu_name: [{required: true, message: '请输入菜单名称', trigger: 'blur'}],
        menu_level: [{required: true, message: '请选择菜单级别', trigger: 'blur'}],
        father_menu: [{validator: fatherValid, trigger: 'blur'}],
        context_form: [{validator: contextValid, trigger: 'blur'}]
      }
    }
  },
  methods: {
    async getMenuSelect () {
      try {
        const res = await this.$http.get('/api/menu/select')
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.menuList = res.data.data.reverse()
        }
      } catch (e) {
        error(e)
      }
    },
    async getFormSelect () {
      try {
        const res = await this.$http.get('/api/menu/form')
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.formList = res.data.data.reverse()
        }
      } catch (e) {
        error(e)
      }
    },
    closeEvent () {
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    async save () {
      await this.$refs.form.validate(async valid => {
        if (!valid) return
        try {
          const update = getUpdate(this.old, this.form)
          for (const updateElement of update) {
            if (updateElement.col_name === 'father_menu' && updateElement.value === '') {
              updateElement.value = 0
            }
            if (updateElement.col_name === 'context_form' && updateElement.value === '') {
              updateElement.value = 0
            }
          }
          console.log(update)
          const res = await axios.post('/api/menu/edit', {menu_id: this.form.menu_id, update: update})
          if (res.data.code !== 200) {
            interceptor(res.data)
          } else {
            this.closeEvent()
            bus.$emit('refreshMenu')
            this.$message.success('修改表单成功')
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
