<template>
  <view class="wrap">
    <!-- 车辆信息 -->
    <u-cell-group class="wrap_allCell">
      <u-cell-item
        :arrow="false"
        :border-bottom="false"
        icon="calendar"
        title="车牌号"
      ></u-cell-item>
      <u-cell-item
        :arrow="false"
        :border-bottom="false"
        icon="car"
        title="汽车品牌"
        value="新版本"
      ></u-cell-item>
      <view class="cell_btn">
        <u-button class="wrap_del" type="">修改</u-button>
        <u-button class="wrap_del" type="">删除</u-button>
      </view>
    </u-cell-group>
    <!-- 添加 -->
    <!-- <view class="wrap_add">
      <u-button type="success" @click="add">添加</u-button>
    </view> -->
    <!-- 填写车辆信息 -->
    <!-- 弹出层 -->
    <view>
      <u-popup v-model="show" mode="center">
        <view class="wrap_popup">
          <u-field v-model="carInput.mobile" label="车牌号" placeholder="请填写车牌号">
          </u-field>
          <u-field v-model="carInput.code" label="车辆品牌" placeholder="请填车辆品牌">
          </u-field>
          <view class="wrap_popup_btn">
            <u-button @click="confirm" type="success">确认</u-button>
            <u-button type="">取消</u-button>
          </view>
        </view>
      </u-popup>
      <!-- <u-button >打开</u-button> -->
    </view>
    <!-- 悬浮添加 -->
    <view>
      <uni-fab
        :pattern="pattern"
        :horizontal="horizontal"
        :vertical="vertical"
        :direction="direction"
        @fabClick="fabClick"
        :popMenu='false'
      ></uni-fab>
    </view>
  </view>
</template>

<script>
import uniFab from "@/components/uni-fab/uni-fab.vue";
export default {
  components: {
    uniFab,
  },
  data() {
    return {
      carList: [
        // {title: ''}
      ],
      carInput:{
mobile: '',
code: ''
      },
      show: false,
      mobile: "",
      code: "",
      // 悬浮
      title: "uni-fab",
      directionStr: "垂直",
      horizontal: "right",
      vertical: "bottom",
      direction: "horizontal",
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#55aaff",
        buttonColor: "#55aaff",
      },
    };
  },
  methods: {
    fabClick() {
      this.show = true
      console.log("添加");
    },
    confirm(){
      console.log(this.carInput)
      this.show = false
    }
  },
  onShow() {
    console.log(uniFab);
    this.$u.auth(this.$route.fullPath);
  },
  onBackPress() {
    this.$u.auth(this.$route.fullPath);
  },
};
</script>

<style lang="scss">
.wrap {
  .wrap_allCell {
    .cell_btn {
      display: flex;
      padding: 20rpx;
      button {
        width: 220rpx;
        height: 60rpx;
      }
    }
  }
  // padding: 20rpx;
  .wrap_del {
    width: 90%;
  }
  .wrap_add {
    width: 20%;
    margin-top: 100rpx;
  }
  .wrap_popup {
    width: 600rpx;
    height: 300rpx;
    padding: 20rpx;
    .wrap_popup_btn {
      display: flex;
      margin-top: 20rpx;
      button {
        height: 60rpx;
      }
    }
  }
}
</style>
