<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="10"
      :pager-count="11"
      :current-page.sync="total.page"
      :total="total.total"
      @current-change="changeClick"
    >
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    tableLabel: {
      type: Array,
      default() {
        return [];
      },
    },
    total: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("delete",row);
    },
    changeClick(row) {
      this.$emit("change", row);
    },
  },
};
</script>

<style lang="less" scoped>
</style>