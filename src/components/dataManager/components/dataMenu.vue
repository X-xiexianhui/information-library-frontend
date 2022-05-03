<template>
  <div class="menu">
    <el-menu
      background-color="#545c64"
      text-color="#409EFF"
      active-text-color="#ffd04b"
    >
      <el-submenu v-for="(parent,index) in menuList" :index="parent.name" :key="index">
        <template slot="title">
          <span class="submenu">{{ parent.name }}</span>
        </template>
        <el-menu-item v-for="child in parent.child" :key="child.menu_id" :index="'/home/data?form_id='+child.form_id">
          <a class="menuLink" @click="changeRouter(child.form_id)">
            {{ child.child_name }}
          </a>
        </el-menu-item>
      </el-submenu>
      <el-menu-item  index='/home/data/statistics'>
        <a style="text-align: left;display: block" @click="$router.push('/home/statistics')">数据统计</a>
      </el-menu-item>
      <el-menu-item  index='/db'>
        <a style="text-align: left;display: block" @click="$router.push('/db')">管理后台</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import {error} from '../../../api/error'
import {interceptor} from '../../../api/interctor'

export default {
  name: 'dataMenu',
  created () {
    this.initMenu()
  },
  data () {
    return {
      menuList: [],
      form_id: 0,
      is_admin: false
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    changeRouter (form_id) {
      this.$router.push({path: '/home/data', query: {form_id: form_id}})
    },
    async initMenu () {
      try {
        const cookies = this.$cookies.get('login_cookie').split('_')
        this.is_admin = cookies[1] === '系统管理员'
        const res = await this.$http.get('api/menu/init')
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.menuList = res.data.data
        }
      } catch (e) {
        error(e.message)
      }
    }
  }
}
</script>

<style scoped>
.menuLink {
  display: block;
  align-items: center;
  text-decoration: none;
  text-align: center;
}
.submenu {
  display: block;
  text-align: left;
  overflow-y: auto;
}
.menu{
  height: 100%;
}
.el-menu {
  width: 200px;
  height: 100%;
}
</style>
