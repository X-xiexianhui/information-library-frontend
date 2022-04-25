<template>
    <el-menu
      mode="horizontal"
      text-color="#000000"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <a :class="$style.menuLink" href="/db" target="_blank">
          <i class="el-icon-folder" :class="$style.menuIcon"></i>数据库管理
        </a>
      </el-menu-item>
      <el-menu-item index="2">
        <a :class="$style.menuLink" href="/table" target="_blank">
          <i class="el-icon-s-data" :class="$style.menuIcon"></i>数据表管理
        </a>
      </el-menu-item>
      <el-menu-item index="3">
        <a :class="$style.menuLink" href="/form" target="_blank">
          <i class="el-icon-s-data" :class="$style.menuIcon"></i>表单管理
        </a>
      </el-menu-item>
      <el-menu-item index="4">
        <a :class="$style.menuLink" href="/menu" target="_blank">
          <i class="el-icon-s-data" :class="$style.menuIcon"></i>菜单管理
        </a>
      </el-menu-item>
      <el-menu-item index="5">
        <a :class="$style.menuLink" href="/role" target="_blank">
          <i class="el-icon-s-data" :class="$style.menuIcon"></i>角色管理
        </a>
      </el-menu-item>
      <el-menu-item index="6">
        <a :class="$style.menuLink" href="/user" target="_blank">
          <i class="el-icon-s-data" :class="$style.menuIcon"></i>用户管理
        </a>
      </el-menu-item>
      <el-menu-item index="3">
        <a :class="$style.menuLink" href="/auth" target="_blank">
          <i class="el-icon-s-data" :class="$style.menuIcon"></i>权限管理
        </a>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'Menu'
}
</script>

<style module>
.menuLink {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.menuIcon {
  position: absolute;
  left: -8px;
  font-size: 14px;
  margin-right: 0;
  color: #000;
  }
</style>
