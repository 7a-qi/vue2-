<template>
  <div class="sidebar">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      text-color="#fff"
    >
      <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
      <el-menu-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :key="item.path"
        :index="item.path"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <el-submenu
        v-for="(item, index) in hasChildren"
        :key="index"
        :index="index"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group style="background-color:#545c64"
          v-for="(subitem, subindex) in item.children"
          :key="subindex.path"
        >
          <el-menu-item :index="subitem.path" @click="clickMenu(subitem)">{{
            subitem.label
          }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Sideber",
  data() {
    return {
      menu: [],
    };
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    asyncMenu() {
      return this.$store.state.menu
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      });
      this.$store.commit('selectMenu',item);
    },
  },
};
</script>

<style lang="less" scoped>
.sidebar {
  height: 100%;
}
.el-menu-vertical-demo {
  background-color: #545c64;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 721px;
}
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>