<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :before-close="closeEvent"
  >
    <el-form ref="form" :model="form" :rules="formRule" label-width="80px">
      <el-form-item label="角色名称" prop="role_name">
       <template>
         <span>{{form.role_name}}</span>
       </template>
      </el-form-item>
      <el-form-item label="表单名称" prop="form_name">
        <template>
          <span>{{form.form_name}}</span>
        </template>
      </el-form-item>
      <el-form-item label="新增权限" prop="add">
        <el-select v-model="form.addAuth" placeholder="请选择新增权限">
          <el-option
            v-for="item in addList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="删除权限" prop="del">
        <el-select v-model="form.del" placeholder="请选择删除权限">
          <el-option
            v-for="item in delList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="查询权限" prop="search">
        <el-select v-model="form.search" placeholder="请选择查询权限">
          <el-option
            v-for="item in searchList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修改权限" prop="edit">
        <el-select v-model="form.editAuth" placeholder="请选择修改权限">
          <el-option
            v-for="item in editList"
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
import {error} from '../../../api/error'
import axios from 'axios'
import {getUpdate} from '../../../common/getUpdate'
import bus from '../../../common/bus'

export default {
  name: 'authEditForm',
  props: {
    form_data: {
      type: Object,
      default: () => ({
        role_name: '',
        form_name: '',
        addAuth: '',
        del: '',
        search: '',
        editAuth: ''
      })
    }
  },
  data () {
    return {
      form: JSON.parse(JSON.stringify(this.form_data)),
      dialogVisible: false,
      formRule: {
        addAuth: [{required: true, message: '请选择新增权限', trigger: 'blur'}],
        del: [{required: true, message: '请选择删除权限', trigger: 'blur'}],
        search: [{required: true, message: '请选择查询权限', trigger: 'blur'}],
        editAuth: [{required: true, message: '请选择修改权限', trigger: 'blur'}]
      },
      addList: [
        {label: '不允许新增', value: 'w0'},
        {label: '允许新增', value: 'w1'}
      ],
      delList: [
        {label: '不允许删除', value: 'd0'},
        {label: '仅允许删除所填数据', value: 'd1'},
        {label: '允许删除全部数据', value: 'd2'}
      ],
      searchList: [
        {label: '不允许查询', value: 's0'},
        {label: '仅允许查询所填数据', value: 's1'},
        {label: '允许查询全部数据', value: 's2'}
      ],
      editList: [
        {label: '不允许修改', value: 'u0'},
        {label: '仅允许修改所填数据', value: 'u1'},
        {label: '允许修改全部数据', value: 'u2'}
      ]
    }
  },
  watch: {
    form_data (newValue) {
      this.form = JSON.parse(JSON.stringify(newValue))
    }
  },
  created () {
    bus.$on('showAuthEditForm', () => {
      this.dialogVisible = true
    })
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
          const data = getUpdate(this.form_data, this.form)
          let res = await axios.post('/api/auth/edit', data)
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
