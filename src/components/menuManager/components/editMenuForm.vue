<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="form" :model="form" label-width="80px">
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
        <el-select v-model="form.menu_level" placeholder="请选择">
          <el-option
            v-for="item in menuList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联表单" prop="context_form">
        <el-select v-model="form.menu_level" placeholder="请选择">
          <el-option
            v-for="item in formList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="closeEvent">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import {error} from '../../../api/error'
import bus from '../../../common/bus'

export default {
  name: 'editMenuForm',
  created () {
    this.getFormSelect()
    this.getMenuSelect()
    this.getMenu()
    bus.$on('showEditMenuForm', (value) => {
      this.form = value
      this.old = JSON.parse(JSON.stringify(value))
      this.dialogVisible = true
    })
  },
  data () {
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
      formList: []
    }
  },
  methods: {
    async getMenu () {
      try {
        if (this.menu_id !== -1) {
          const res = await this.$http.get('/api/menu/id', {params: {menu_id: this.menu_id}})
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.form = res.data.data[0]
          }
        }
      } catch (e) {
        error(e)
      }
    },
    async getMenuSelect () {
      try {
        const res = await this.$http.get('/api/menu/select')
        if (res.data.code !== 200) {
          error(res.data.msg)
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
          error(res.data.msg)
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
          const res = await axios.post('/api/menu/edit', this.form)
          if (res.data.code !== 200) {
            error(res.data.msg)
          } else {
            this.tableData = res.data.data.reverse()
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
