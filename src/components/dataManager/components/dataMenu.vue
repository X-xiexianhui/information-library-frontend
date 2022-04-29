<template>
<el-menu
  text-color="#000000"
  active-text-color="#ffd04b"
>
  <el-submenu v-for="(parent,index) in menuList" :index="parent.name" :key="index">
    <template slot="title">
      <span>{{parent.name}}</span>
    </template>
    <el-menu-item v-for="child in parent.child" :key="child.menu_id" :index="'/#/home/data?form_id='+child.form_id">
      <a :class="$style.menuLink" @click="changeRouter(child.form_id)">
        {{child.child_name}}
      </a>
    </el-menu-item>
  </el-submenu>
</el-menu>
</template>

<script>
import {error} from '../../../api/error'
import {interceptor} from '../../../api/interctor'
import bus from '../../../common/bus'
export default {
  name: 'dataMenu',
  created () {
    this.initMenu()
  },
  data () {
    return {
      menuList: [],
      form_id: 0
    }
  },
  methods: {
    // eslint-disable-next-line camelcase
    changeRouter (form_id) {
      bus.$emit('changeRouterEvent', form_id)
      this.$router.push({path: '/home/data', query: {form_id: form_id}})
    },
    async initMenu () {
      try {
        const res = await this.$http.get('api/menu/init')
        console.log(res.data)
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

<style module>
.menuLink {
  display: flex;
  align-items: center;
  text-decoration: none;
}
</style>
