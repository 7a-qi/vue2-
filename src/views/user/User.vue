<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <public-form
        :form-label="opertateFormLabel"
        :form="operateForm"
        :inline="true"
      ></public-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <public-form
        :form-label="formLabel"
        :form="searchFrom"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchFrom.keyword)"
          >搜索</el-button
        >
      </public-form>
    </div>
    <public-table
      :table-label="tableLabel"
      :table-data="tableData"
      :total="config"
      @change="getList()"
      @edit="edit"
      @delete="del"
    ></public-table>
  </div>
</template>
<script>
import PublicForm from "@/components/common/publicform/PublicForm";
import PublicTable from "@/components/common/table/PublicTable";
import { getUser } from "@/network/data";
export default {
  name: "User",
  components: {
    PublicForm,
    PublicTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchFrom: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "add") {
        this.$axios.post("/user/add", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$axios.post("/user/edit", this.operateForm).then((res) => {
          this.isShow = false;
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      // let params = {
      //   name,
      //   page:this.config.page
      // }
      // this.$axios.get('/user/getUser',{params}).then(res=>{
      //   console.log(res)
      //   this.tableData = res.data.list.filter(t => {
      //     t.sexLabel = t.sex === 0 ? '女' : '男'
      //     return t
      //   })
      //   this.config.total = res.data.count;
      //   this.config.loading = false;
      // })
      getUser({name, page:this.config.page}).then((res) => {
        console.log(res);
        this.tableData = res.list.filter((t) => {
          t.sexLabel = t.sex === 0 ? "女" : "男";
          return t;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
    edit(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = row;
    },
    del(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const id = row.id
          this.$axios.get('/user/del',{params:{id}})
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>