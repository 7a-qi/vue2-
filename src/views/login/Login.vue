<template>
  <div class="login">
    <el-form :model="form" class="form" :rules="rules" label-width="100px" label-position="left">
      <h3>系统登录</h3><br>
      <el-form-item prop="username" label="用户名" label-width="80px">
        <el-input
          type="input"
          v-model="form.username"
          autocomplete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" label-width="80px">
        <el-input
          type="password"
          v-model="form.password"
          autocomplete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 15px;">
        <el-button type="primary" @click="login">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { getMenu } from '@/network/data'
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods:{
    login(){
      getMenu(this.form).then(res => {
        console.log(res);
        if(res.code === 20000){
          console.log(res.data);
          console.log(this.$router)
          this.$store.commit('clearMenu');
          this.$store.commit('setMenu',res.data.menu);
          this.$store.commit('setToken',res.data.token);
          this.$store.commit('getMenu',this.$router);
          this.$router.push({name:'Home'})
        } else {
          this.$message.warning(res.data.message)
        }
      })
      // const token = Mock.random.guid();
      // this.$store.commit('setToken', token);
      // this.$router.push({name:'homed'})
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: #fff;
  transform: translate(-50%, -50%);
  width: 350px;
  border: 1px solid #eaeaea;
  border-radius: 25px;
  box-shadow: 0 0 25px #cac6c6;
  .form {
    width: 300px;
    margin:15px auto;
    h3 {
      text-align: center;
    }
  }
}
</style>