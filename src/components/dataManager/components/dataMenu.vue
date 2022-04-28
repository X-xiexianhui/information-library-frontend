<template>
<el-menu
  text-color="#000000"
  active-text-color="#ffd04b"
>
  <el-submenu v-for="(index,parent) in menuList" :index="index" :key="index">
    <template slot="title">
      <span>{{parent.name}}</span>
    </template>
    <el-menu-item v-for="child in parent.child" :key="child.menu_id">
      <a :class="$style.menuLink" :href="'/#/home/data?form_id='+child.form_id" target="_blank">
        {{child.child_name}}
      </a>
    </el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
import {error} from '../../../api/error'
import {interceptor} from '../../../api/interctor'
export default {
  name: 'dataMenu',
  created () {
    this.form_id = this.$route.params.form_id
    console.log(this.form_id)
    this.initMenu()
  },
  data () {
    return {
      menuList: [],
      form_id: 0
    }
  },
  methods: {
    async initMenu () {
      try {
        const res = await this.$http.get('api/menu/init')
        if (res.data.code !== 200) {
          interceptor(res.data)
        } else {
          this.menuList = res.data.data.reverse()
        }
      } catch (e) {
        error(e.message)
      }
    }
  }
}
</script>

<style module>
.menuLink {
  display: flex;
  align-items: center;
  text-decoration: none;
}
</style>
