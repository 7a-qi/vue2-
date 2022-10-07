<template>
  <div class="header">
    <div class="left">
      <el-button
        platn
        icon="el-icon-menu"
        size="mini"
        @click="collapse"
      ></el-button>
      <el-breadcrumb class="tabs" style="color: #fff" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="color: #fff"
          v-for="(item, index) in tabs"
          :key="index"
          :to="{ path: item.path }"
          >{{ item.labael }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown>
        <span>
          <img class="user" :src="userimg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from "vuex";
export default {
  name: "TabHeader",
  data() {
    return {
      userimg: require("@/assets/img/user.jpg"),
    };
  },
  computed: {
    ...mapState({
      tabs: (state) => state.tabList,
    }),
  },
  methods: {
    collapse() {
      this.$store.commit("collapse");
    },
    logOut(){
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: flex;
  align-items: center;
  color: #fff !important;
   /deep/.tabs{
    margin-left: 15px;
    color: #fff;
  }
}
.right {
  display: flex;
  .user {
    height: 40px;
    border-radius: 50%;
  }
}
</style>