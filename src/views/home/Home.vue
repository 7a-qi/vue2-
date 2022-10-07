<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="user">
            <img :src="userimg" alt="" />
            <div class="userinfo">
              <h2 class="name">Admin</h2>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <hr />
          <div class="logn-info">
            <p>上次登入时间:<span>2022年9月26日12:26:01</span></p>
            <p>上次登入地点:<span>河北</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 10px">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="order">
          <el-card v-for="(item, index) in countData" :key="index">
            <div class="content">
              <i class="icon" :class="'el-icon-' + item.icon"></i>
              <div class="detail">
                <p class="num">¥{{ item.value }}</p>
                <p class="txt">{{ item.name }}</p>
              </div>
            </div>
          </el-card>
        </div>
        <el-card style="height: 260px">
          <echarts
            :chartData="echartData.order"
            style="height: 260px"></echarts>
        </el-card>
        <div class="graph">
          <el-card style="height: 200px">
            <echarts
              :chartData="echartData.user"
              style="height: 190px"
            ></echarts>
          </el-card>
          <el-card style="height: 200px">
            <echarts
              :chartData="echartData.video"
              style="height: 190px"
              :judge="false"
            ></echarts>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Echarts from "@/components/common/echarts/Echarts";

import { getData } from "@/network/data";
export default {
  name: "Home",
  data() {
    return {
      userimg: require("@/assets/img/user.jpg"),
      tableData: [
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "华为",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: "1234",
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: "210",
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: "1234",
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xDate: [],
          series: [],
        },
        user: {
          xDate: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  components: {
    Echarts,
  },
  created() {
    getData().then((res) => {
      console.log(res.data.videoData);
      const order = res.data.orderData;
      const xDate = order.date;
      const keyArray = Object.keys(order.data[0]);
      // console.log(keyArray);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: order.data.map((item) => item[key]),
          type: "line",
        });
      });
      this.echartData.order.xDate = xDate;
      this.echartData.order.series = series;

      this.echartData.user.xDate = res.data.userData.map((item) => item.date)
      this.echartData.user.series = [
          {
            name: "新增用户",
            data: res.data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
            data: res.data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
      this.echartData.video.series = res.data.videoData
    });
  
  },
};
</script>
<style lang="less" scoped>
.el-col {
  background-color: #fff;
}
.user {
  display: flex;
  align-items: center;
  img {
    height: 128px;
    border-radius: 50%;
    margin: 15px;
  }
  .userinfo {
    margin-left: 10px;
    .access {
      font-size: 12px;
    }
  }
}
.logn-info {
  margin: 15px 0px;
  font-size: 12px;
  line-height: 20px;
  span {
    margin-left: 20px;
  }
}
.order {
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  margin-left: -10px;
  margin-right: -10px;
  justify-content: space-between;

  .el-card {
    width: 259px;
    height: 75px;
    margin: 10px;
    display: flex;
    .content {
      width: 250px;
      height: 75px;
      display: flex;
      .icon {
        margin: 10px;
      }
      .detail {
        margin: -5px 5px;
        .num {
          font-size: 24px;
        }
        .txt {
          font-size: 12px;
        }
      }
    }
  }
}
.graph {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    flex: 1;
    margin: 5px;
  }
}
</style>