<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="auto">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <tab-header></tab-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "@/components/common/sidebar/Sidebar";
import TabHeader from "@/components/common/header/TabHeader";
export default {
  name: "Home",
  components: {
    Sidebar,
    TabHeader,
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #333;
  color: #fff;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>